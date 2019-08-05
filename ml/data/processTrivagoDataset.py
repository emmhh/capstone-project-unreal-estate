import os
import json
from langdetect import detect

TRAIN = 0
TRAIN_1 = 1
TRAIN_2 = 2
TRAIN_3 = 3
TRAIN_4 = 4
TRAIN_5 = 5
VALIDATE = 6
VALIDATE_1 = 7
VALIDATE_2 = 8
VALIDATE_3 = 9
VALIDATE_4 = 10
VALIDATE_5 = 11

filepath = 'review.txt'
folders = ['train/', 'train/1/', 'train/2/', 'train/3/', 'train/4/', 'train/5/', 'validate/', 'validate/1/', 'validate/2/', 'validate/3/', 'validate/4/', 'validate/5/']

with open(filepath) as fp:
	line = fp.readline()
	rating = {}
	for i in range(1,6):
		rating[i] = 0

	for folder in folders:
		if not os.path.exists(folder):
			os.makedirs(folder)
	
	while line:
		obj = json.loads(line)
		
		done = True
		for i in range(1,6):
			if rating[i] != 50000:
				done = False
		if done:
			break

		value = int(obj['ratings']['overall'])
		if value == 0:
			line = fp.readline()
			continue

		if rating[value] == 50000:
			line = fp.readline()
			continue

		review_text = obj['text'] + "\n" + obj['title']

		if(detect(review_text) != "en"):
			line = fp.readline()
			continue

		if rating[value]%10 > 7:
			with open('validate/' + str(value) + '/' + str(rating[value]) + '.txt', 'w') as w:
				w.write(review_text)
		else:
			with open('train/' + str(value) + '/' + str(rating[value]) + '.txt', 'w') as w:
				w.write(review_text)
		rating[value] += 1
		line = fp.readline()

	for i in rating.keys():
		print("num reviews with score " + str(i) + " = " + str(rating[i]))