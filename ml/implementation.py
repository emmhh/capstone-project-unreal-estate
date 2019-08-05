import tensorflow as tf
import re
from stopwords import stopwords as sw


BATCH_SIZE = 100
MAX_WORDS_IN_REVIEW = 100  # Maximum length of a review to consider
EMBEDDING_SIZE = 50  # Dimensions for each word vector
NUM_CLASS = 5

def preprocess(review):
    # turn all text to lower case
    text = review.lower()

    # Clean the text
    text = re.sub(r"<[\w\s]+/>", " ", text)
    text = re.sub(r"<[s]+>", " ", text)
    text = re.sub(r"[^a-z]", " ", text)
    text = re.sub(r"\s+", " ", text)

    # Convert words to lower case and split them
    text = text.split()

    # Optionally, remove stop words
    text = [w for w in text if not w in sw]

    # Take last 100 words since there is usually more relevant data at the end
    text = text[-100:]

    return(text)



def define_graph():
    dropout = tf.placeholder_with_default(1.0, shape=(), name="dropout_keep_prob")

    X = tf.placeholder(dtype=tf.float32, shape=[BATCH_SIZE, MAX_WORDS_IN_REVIEW, EMBEDDING_SIZE], name="input_data")
    Y = tf.placeholder(dtype=tf.float32, shape=[BATCH_SIZE, NUM_CLASS], name="labels")
    
    cell_sizes = [50, 100]

    # create 2 LSTMCells
    lstm_fw = [tf.contrib.rnn.DropoutWrapper(
            cell=tf.contrib.rnn.BasicLSTMCell(size),
            input_keep_prob=dropout,
            output_keep_prob=dropout,
            state_keep_prob=dropout
        ) for size in cell_sizes
    ]

    lstm_bw = [tf.contrib.rnn.DropoutWrapper(
            cell=tf.contrib.rnn.BasicLSTMCell(size),
            input_keep_prob=dropout,
            output_keep_prob=dropout,
            state_keep_prob=dropout
        ) for size in cell_sizes
    ]

    multi_lstm_layer1 = tf.nn.rnn_cell.MultiRNNCell(lstm_fw)

    multi_lstm_layer2 = tf.nn.rnn_cell.MultiRNNCell(lstm_bw)


    (output_fw, output_bw), _ = tf.nn.bidirectional_dynamic_rnn(
        multi_lstm_layer1,
        multi_lstm_layer2,
        inputs=X,
        dtype=tf.float32
    )

    merged_outputs = tf.concat([output_fw, output_bw], axis=2)

    # weight, bias, reshape
    weight = tf.Variable(tf.truncated_normal([2 * 100, NUM_CLASS]))
    bias = tf.Variable(tf.constant(0.1, shape=[NUM_CLASS]))

    finalLayer = tf.gather(tf.transpose(merged_outputs, [1, 0, 2]),int(merged_outputs.get_shape()[0]) - 1)

    # made prediction vs correct
    prediction = tf.matmul(finalLayer, weight)
    prediction = tf.nn.bias_add(prediction, bias, name="prediction")

    acc = tf.equal(tf.argmax(prediction, 1), tf.argmax(Y, 1))

    acc = tf.reduce_mean(tf.cast(acc, tf.float32), name="accuracy")
    
    loss = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits_v2(logits=prediction, labels=Y), name="loss") 

    optimizer = tf.train.AdamOptimizer(learning_rate=0.005).minimize(loss)
    return X, Y, dropout, optimizer, acc, loss
