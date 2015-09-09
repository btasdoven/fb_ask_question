import sys, json

MIN_REQUIRED_PLAYERS = 6

print sys.argv[1]

votes = json.loads(sys.argv[1])


for date, vote in votes.iteritems():
	print unicode(date), vote,
	if vote >= MIN_REQUIRED_PLAYERS:
		print "found enough player for this day"
	else:
		print
		


