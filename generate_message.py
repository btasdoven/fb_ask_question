# -*- coding: utf-8 -*-
import sys, json
import datetime
import subprocess

def date2timestamp(date):
	cmd = 'LC_ALL=en_US.utf8 date --date="' + date.encode('utf-8') + '" +%s'
	output = subprocess.check_output(cmd, shell=True)
	return int(output)
	

def getTomorrowStart():
	cmd = ["LC_ALL=en_US.utf8", "date", "-d", '"+8 days 00:00"', "+%s"]
	output = subprocess.check_output(' '.join(cmd), shell=True)
	return int(output)	
	
def getTomorrowEnd():
	cmd = ["LC_ALL=en_US.utf8", "date", "-d", '"+9 days 00:00"', "+%s"]
	output = subprocess.check_output(' '.join(cmd), shell=True)
	return int(output)	
	

votes = json.loads(sys.argv[1])

it = votes.iteritems()
it = sorted(it, key=lambda x: (x[0], x[1]))

timestamps = []
for date, _ in it:
	timestamps.append( (date2timestamp(date), date) )
	
ts = getTomorrowStart()
te = getTomorrowEnd()

tom_games = []
for timestamp, date in timestamps:
	if timestamp >= ts and timestamp < te:
		tom_games.append( (date, votes[date]) )

message = ""
for date, vote in tom_games:
	if vote >= 5:
		if ( vote % 2 == 0 ):
			message += u"Yarın(%s) %d kişi oynayalım demiş. Oynayalım diyen herkes gelecek değil mi?\n\n" % (date, vote)
		else:
			message += u"Yarın(%s) %d kişi oynayalım demiş. 1 kişiye daha ihtiyacımız var. Gelebilecek olan var mı?\n\n" % (date, vote)

if ( len(message) > 0 ):
	message += u"Şu anlık bu haftanın oylama sonuçlari şöyle:\n\n"	
	for date, vote in it:
		message += u"%s, %s\n" % (date, vote)
	
	message += u"\n\n-pollbot"

print message
