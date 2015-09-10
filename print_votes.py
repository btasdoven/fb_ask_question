import sys, json
import datetime

votes = json.loads(sys.argv[1])
uname = sys.argv[2]
passwd = sys.argv[3]

it = votes.iteritems()
it = sorted(it, key=lambda x: (x[0], x[1]))

weekday = datetime.datetime.today().weekday()
tomorrow_name, tomorrow_vote_count = it[weekday+1]

if tomorrow_vote_count >= 6:
	message = u"Yarin(%s) %d kisi oynayalim demis. Oynayalim diyen herkes gelecek degil mi?" % (tomorrow_name, tomorrow_vote_count)
else:
	message = u"Yarin(%s) %d kisi oynayalim dedigi icin yeterli sayiya ulasamadik." % (tomorrow_name, tomorrow_vote_count)

message += u"\n\n Su anlik bu haftanin oylama sonuclari soyle:\n\n"	

for date, vote in it:
	message += u"%s, %s\n" % (date, vote)
	
message += u"\n\n-pollbot"

cmd = ["./send_post.sh", uname, passwd, message]
process = Popen(cmd, stdout=PIPE)
output, err = process.communicate()


