import os, sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../unreal_estate/')))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings")
import django
django.setup()
from runner import load_glove_embeddings, embedd_data
import implementation as imp
import tensorflow as tf
from advertising.models import Property, Rating

def classifyAll():
    allRatings = Rating.objects.all()

    allRatingsToClassify = [r for r in allRatings if int(r.value) == 0]
    allTextsToClassify = [r.notes for r in allRatingsToClassify]

    while len(allTextsToClassify)%100 != 0:
        allTextsToClassify.append("")

    while len(allRatingsToClassify)%100 != 0:
        allRatingsToClassify.append(None)

    print(len(allTextsToClassify))

    texts_length = len(allTextsToClassify)
    numBatches = texts_length//100

    data_text = [imp.preprocess(review) for review in allTextsToClassify]

    glove_array, glove_dict = load_glove_embeddings()
    test_data = embedd_data(data_text, glove_array, glove_dict)

    sess = tf.InteractiveSession()

    last_check = tf.train.latest_checkpoint('./checkpoints')
    saver = tf.train.import_meta_graph(last_check + ".meta")
    saver.restore(sess, last_check)
    graph = tf.get_default_graph()

    prediction = graph.get_tensor_by_name('prediction:0')
    input_data = graph.get_tensor_by_name('input_data:0')

    for i in range(numBatches):
        startIndex = i*100
        endIndex = (i+1)*100

        ratingsBatch = allRatingsToClassify[startIndex:endIndex]
        inputBatch = test_data[startIndex:endIndex]

        Y = sess.run([prediction], {input_data: inputBatch})
        
        maxValue = float('-inf')
        results = []

        for i in range(100):
            for j in range(5):
                if maxValue < Y[0][i][j]:
                    maxValue = Y[0][i][j]
                    index = j + 1
            results.append(index)
            maxValue = float('-inf')
            index = 0  
        predicts = results
        print(predicts)

        for i in range(100):
            rating = ratingsBatch[i]
            if rating == None:
                continue
            classification = predicts[i]
            rating.value = classification
            rating.save()

def updateAvgRatings():
    properties = Property.objects.all()
    for prop in properties:
        ratings = Rating.objects.filter(property_id=prop.property_id)
        if len(ratings) == 0:
            continue

        n = len(ratings)
        k = 0.10
        numTrimmed = int(n*k)
        values = []
        for r in ratings:
            values.append(float(r.value))
        values = sorted(values)
        values = values[numTrimmed:n-numTrimmed]
        avg = sum(values)/len(values)

        avg = round(avg,1)
        
        prop.avg_rating = avg
        prop.save()

if __name__ == '__main__':
    updateAvgRatings()