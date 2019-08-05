import os 

MARKETPLACE = 0
CUSTOMER_ID = 1
REVIEW_ID = 2
PRODUCT_ID = 3
PRODUCT_PARENT = 4
PRODUCT_TITLE = 5
PRODUCT_CATEGORY = 6
STAR_RATING = 7
HELPFUL_VOTES = 8
TOTAL_VOTES = 9
VINE = 10
VERIFIED_PURCHASE = 11
REVIEW_HEADLINE = 12
REVIEW_BODY = 13
REVIEW_DATE = 14

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

filepath = 'amazon_reviews_us_Home_v1_00.tsv'
folders = ['train/', 'train/1/', 'train/2/', 'train/3/', 'train/4/', 'train/5/', 'validate/', 'validate/1/', 'validate/2/', 'validate/3/', 'validate/4/', 'validate/5/']

with open(filepath) as fp:
	line = fp.readline() #get rid of header
	line = fp.readline()
	rating = {}
	for i in range(1,6):
		rating[i] = 0

	for folder in folders:
		if not os.path.exists(folder):
			os.makedirs(folder)
	
	while line:
		
		done = True
		for i in range(1,6):
			if rating[i] != 40000:
				done = False
		if done:
			break

		data = line.split('\t')
		if data[VERIFIED_PURCHASE] == 'N':
			line = fp.readline()
			continue

		value = int(data[STAR_RATING])

		if rating[value] == 40000:
			line = fp.readline()
			continue

		if rating[value]%10 > 7:
			with open('validate/' + str(value) + '/' + str(rating[value]) + '.txt', 'w') as w:
				w.write(data[REVIEW_HEADLINE] + "\n" + data[REVIEW_BODY])
		else:
			with open('train/' + str(value) + '/' + str(rating[value]) + '.txt', 'w') as w:
				w.write(data[REVIEW_HEADLINE] + "\n" + data[REVIEW_BODY])
		rating[value] += 1
		line = fp.readline()