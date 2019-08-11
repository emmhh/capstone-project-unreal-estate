import numpy as np
import tensorflow as tf
from random import randint
import os
from pathlib import Path
import pickle as pk
import glob
import sys
from urllib.request import urlopen
import zipfile 
from io import BytesIO


import implementation as imp

BATCH_SIZE = imp.BATCH_SIZE
MAX_WORDS_IN_REVIEW = imp.MAX_WORDS_IN_REVIEW  # Maximum length of a review to consider
EMBEDDING_SIZE = imp.EMBEDDING_SIZE  # Dimensions for each word vector

SAVE_FREQ = 5000
iterations = 100000
dir_path = os.path.dirname(os.path.realpath(__file__))
checkpoints_dir = dir_path + "/checkpoints"
glove_array_global = None
glove_dict_global = None 

def load_data(path=dir_path + '/data/train'):
    print("Loading Review Data...")
    data = []

    dir = os.path.dirname(__file__)
    file_list = glob.glob(os.path.join(dir, path + '/1/*')) 
    file_list.extend(glob.glob(os.path.join(dir, path + '/2/*')))
    file_list.extend(glob.glob(os.path.join(dir, path + '/3/*')))
    file_list.extend(glob.glob(os.path.join(dir, path + '/4/*')))
    file_list.extend(glob.glob(os.path.join(dir, path + '/5/*')))
    print("Parsing %s files" % len(file_list))
    for _, f in enumerate(file_list):
        with open(f, "r") as openf:
            s = openf.read()
            data.append(imp.preprocess(s))  # NOTE: Preprocessing code called here on all reviews
    return data


def load_glove_embeddings():
    emmbed_file = Path(dir_path + "/embeddings.pkl")
    if emmbed_file.is_file():
        # embeddings already serialized, just load them
        print("Local Embeddings pickle found, loading...")
        with open(dir_path + "/embeddings.pkl", 'rb') as f:
            return pk.load(f)
    else:
        # create the embeddings
        print("Building embeddings dictionary...")
        try: 
            with open(dir_path + "/glove.6B.50d.txt", 'r', encoding="utf-8") as f: 
                data = f.readlines() 
        except OSError as e: 
            print(e)
            r = urlopen("http://www.cse.unsw.edu.au/~cs9444/18s2/hw2/Assignment2.zip") 
            with zipfile.ZipFile(BytesIO(r.read())) as z: 
                with z.open("glove.6B.50d.txt") as f: 
                    data = f.readlines() 
        embeddings = [[0] * EMBEDDING_SIZE]
        word_index_dict = {'UNK': 0}  # first row is for unknown words
        index = 1
        for line in data:
            splitLine = line.split()
            word = tf.compat.as_str(splitLine[0])
            embedding = [float(val) for val in splitLine[1:]]
            embeddings.append(embedding)
            word_index_dict[word] = index
            index += 1

        # pickle them
        with open(dir_path + '/embeddings.pkl', 'wb') as f:
            print("Creating local embeddings pickle for faster loading...")
            # Pickle the 'data' dictionary using the highest protocol available.
            pk.dump((embeddings, word_index_dict), f, pk.HIGHEST_PROTOCOL)
    return embeddings, word_index_dict


def embedd_data(training_data_text, e_arr, e_dict): 
    num_samples = len(training_data_text)
    embedded = np.zeros([num_samples, MAX_WORDS_IN_REVIEW, EMBEDDING_SIZE])
    for i in range(num_samples):
        review_mat = np.zeros([MAX_WORDS_IN_REVIEW, EMBEDDING_SIZE])
        # Iterate to either the end of the sentence of the max num of words, whichever is less
        for w in range(min(len(training_data_text[i]), MAX_WORDS_IN_REVIEW)):
            # assign embedding of that word or to the UNK token if that word isn't in the dict
            review_mat[w] = e_arr[e_dict.get(training_data_text[i][w], 0)]
        embedded[i] = review_mat
    return embedded


def train():
    def getTrainBatch():
        labels = []
        arr = np.zeros([BATCH_SIZE, MAX_WORDS_IN_REVIEW, EMBEDDING_SIZE])
        for i in range(BATCH_SIZE):
            if (i % 5 == 0):
                num = randint(0, 35999)
                labels.append([1, 0, 0, 0, 0])
            elif (i % 5 == 1):
                num = randint(36000, 71999)
                labels.append([0, 1, 0, 0, 0])
            elif (i % 5 == 2):
                num = randint(72000, 107999)
                labels.append([0, 0, 1, 0, 0])
            elif (i % 5 == 3):
                num = randint(108000, 143999)
                labels.append([0, 0, 0, 1, 0])
            elif (i % 5 == 4):
                num = randint(144000, 179999)
                labels.append([0, 0, 0, 0, 1])
            arr[i] = training_data_embedded[num, :, :]
        return arr, labels

    # Call implementation
    glove_array, glove_dict = load_glove_embeddings()

    training_data_text = load_data()
    # pprint(training_data_text)

    # ========= FOR EVAL =========
    data_text = load_data(path=dir_path + "/data/validate")
    test_data = embedd_data(data_text, glove_array, glove_dict)
    num_samples = len(test_data)
    # ========= FOR EVAL =========

    training_data_embedded = embedd_data(training_data_text, glove_array, glove_dict)
    input_data, labels, dropout_keep_prob, optimizer, accuracy, loss = \
        imp.define_graph()

    # tensorboard
    tf.summary.scalar("training_accuracy", accuracy)
    tf.summary.scalar("loss", loss)
    summary_op = tf.summary.merge_all()

    # saver
    all_saver = tf.train.Saver()

    sess = tf.InteractiveSession()
    sess.run(tf.global_variables_initializer())


    for i in range(iterations):
        batch_data, batch_labels = getTrainBatch()
        sess.run(optimizer, {input_data: batch_data, labels: batch_labels, dropout_keep_prob: 0.6})
        if (i % 50 == 0):
            loss_value, accuracy_value, summary = sess.run(
                [loss, accuracy, summary_op],
                {input_data: batch_data,
                 labels: batch_labels})
            print("Iteration: ", i)
            print("loss", loss_value)
            print("acc", accuracy_value)

        if (i % SAVE_FREQ == 0 and i != 0):
            if not os.path.exists(checkpoints_dir):
                os.makedirs(checkpoints_dir)
            save_path = all_saver.save(sess, checkpoints_dir +
                                       "/trained_model.ckpt",
                                       global_step=i)
            print("Saved model to %s" % save_path)

            print("Running eval now")

            num_batches = num_samples // BATCH_SIZE
            label_list = [[1, 0, 0, 0, 0]] * (num_samples // 5)
            label_list.extend([[0, 1, 0, 0, 0]] * (num_samples // 5))
            label_list.extend([[0, 0, 1, 0, 0]] * (num_samples // 5))
            label_list.extend([[0, 0, 0, 1, 0]] * (num_samples // 5))
            label_list.extend([[0, 0, 0, 0, 1]] * (num_samples // 5))
            assert (len(label_list) == num_samples)
            total_acc = 0
            for i in range(num_batches):
                sample_index = i * BATCH_SIZE
                batch = test_data[sample_index:sample_index + BATCH_SIZE]
                batch_labels = label_list[sample_index:sample_index + BATCH_SIZE]
                lossV, accuracyV = sess.run([loss, accuracy], {input_data: batch,
                                                                             labels: batch_labels})
                total_acc += accuracyV
                print("Accuracy %s, Loss: %s" % (accuracyV, lossV))
            print('-' * 40)
            print("FINAL ACC:", total_acc / num_batches)
            #new_sess.close()
    sess.close()


def eval(data_path):
    glove_array, glove_dict = load_glove_embeddings()
    data_text = load_data(path=data_path)
    test_data = embedd_data(data_text, glove_array, glove_dict)

    num_samples = len(test_data)
    print("Loaded and preprocessed %s samples for evaluation" % num_samples)

    sess = tf.InteractiveSession()
    last_check = tf.train.latest_checkpoint(dir_path + '/checkpoints')
    saver = tf.train.import_meta_graph(last_check + ".meta")
    saver.restore(sess, last_check)
    graph = tf.get_default_graph()

    loss = graph.get_tensor_by_name('loss:0')
    accuracy = graph.get_tensor_by_name('accuracy:0')

    input_data = graph.get_tensor_by_name('input_data:0')
    labels = graph.get_tensor_by_name('labels:0')

    num_batches = num_samples // BATCH_SIZE
    label_list = [[1, 0, 0, 0, 0]] * (num_samples // 5)
    label_list.extend([[0, 1, 0, 0, 0]] * (num_samples // 5))
    label_list.extend([[0, 0, 1, 0, 0]] * (num_samples // 5))
    label_list.extend([[0, 0, 0, 1, 0]] * (num_samples // 5))
    label_list.extend([[0, 0, 0, 0, 1]] * (num_samples // 5))
    assert (len(label_list) == num_samples)
    total_acc = 0
    for i in range(num_batches):
        sample_index = i * BATCH_SIZE
        batch = test_data[sample_index:sample_index + BATCH_SIZE]
        batch_labels = label_list[sample_index:sample_index + BATCH_SIZE]
        lossV, accuracyV = sess.run([loss, accuracy], {input_data: batch,
                                                       labels: batch_labels})
        total_acc += accuracyV
        print("Accuracy %s, Loss: %s" % (accuracyV, lossV))
    print('-' * 40)
    print("FINAL ACC:", total_acc / num_batches)

def classify_batch(text_list, glove_array=None, glove_dict=None):
    original_length = len(text_list)
    while len(text_list) < BATCH_SIZE:
        text_list.append("")

    if glove_array == None or glove_dict == None:
        glove_array, glove_dict = load_glove_embeddings()
    data_text = [imp.preprocess(review) for review in text_list]
    test_data = embedd_data(data_text, glove_array, glove_dict)
    sess = tf.InteractiveSession()
    last_check = tf.train.latest_checkpoint(dir_path + '/checkpoints')
    saver = tf.train.import_meta_graph(last_check + ".meta")
    saver.restore(sess, last_check)
    graph = tf.get_default_graph()

    prediction = graph.get_tensor_by_name('prediction:0')

    input_data = graph.get_tensor_by_name('input_data:0')

    Y = sess.run([prediction], {input_data: test_data})
    maxValue = float('-inf')
    results = []
    for i in range(original_length):
        for j in range(5):
            if maxValue < Y[0][i][j]:
                maxValue = Y[0][i][j]
                index = j + 1
        results.append(index)
        maxValue = float('-inf')
        index = 0

    print(results)
    return results


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("mode", choices=["train", "eval", "test", "classify", "classify_batch"])

    args = parser.parse_args()

    if (args.mode == "train"):
        print("Training Run")
        train()
    elif (args.mode == "eval"):
        print("Evaluation run")
        eval("./data/validate")
    elif (args.mode == "test"):
        print("Test run")
        eval("./data/test")
    elif(args.mode == "classify"):
        print("Please enter the review to classify:")
        for line in sys.stdin:
            res = classify_batch([line])[0] 
            print("Classified as a " + str(res) + " star rating.")
            print()
            print("Please enter the review to classify:")
    elif(args.mode == "classify_batch"):
        print("Please enter the reviews to classify:")
        reviews = []
        for line in sys.stdin:  
            if len(reviews) != 100:
                if line == '':
                    print( "Classifying " + str(len(reviews)) + " total reviews in batch")
                    res = classify_batch(reviews)
                    for i in range(len(res)):
                        print("Review " + str(i+1) + " - " + reviews[i] + " has rating" + str(res[i]))
                print("Added to batch, " + str(len(reviews)) + " total reviews in batch")
                print()
                print("Please enter the review to classify:")

            else:
                print("All reviews in batch have been added")
                res = classify_batch(reviews)
                for i in range(len(res)):
                    print("Review " + str(i+1) + " - " + reviews[i] + " has rating" + str(res[i]))

        

