import sys, json

votes = json.loads(sys.argv[1])

for date, vote in votes.iteritems():
	print date.encode('utf-8'), vote
	


