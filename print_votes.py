import sys, json

votes = json.loads(sys.argv[1])

for date, vote in votes.iteritems():
	print unicode(date), vote
	


