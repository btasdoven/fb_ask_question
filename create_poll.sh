#!/bin/bash

function json_load_str {
	python -c "import json, sys; sys.stdout.write(unicode(json.loads(sys.argv[1])))" "$1"
}

UNAME="$1" #read -p "Facebook username: " UNAME
PASS="$2" #read -s -p "${UNAME}'s password: " PASS
GROUP_NAME="Deneme"
MESSAGE=$(date -dmonday +"%U. hafta için katılım durumunuzu belirtiniz.  —pollbot")

DoW=$(date +%u)
TODAY=$(date +%Y%m%d)
OPT1=$(date -d "$TODAY + $((8 - DoW)) days" +"%d %B %Y, %A 12:00")
#OPT11=$(date -d "$TODAY + $((8 - DoW)) days" +"%d %B %Y, %A 19:00")
OPT2=$(date -d "$TODAY + $((9 - DoW)) days" +"%d %B %Y, %A 12:00")
#OPT21=$(date -d "$TODAY + $((9 - DoW)) days" +"%d %B %Y, %A 19:00")
OPT3=$(date -d "$TODAY + $((10 - DoW)) days" +"%d %B %Y, %A 12:00")
#OPT31=$(date -d "$TODAY + $((10 - DoW)) days" +"%d %B %Y, %A 19:00")
OPT4=$(date -d "$TODAY + $((11 - DoW)) days" +"%d %B %Y, %A 12:00")
#OPT41=$(date -d "$TODAY + $((11 - DoW)) days" +"%d %B %Y, %A 19:00")
OPT5=$(date -d "$TODAY + $((12 - DoW)) days" +"%d %B %Y, %A 12:00")
#OPT51=$(date -d "$TODAY + $((12 - DoW)) days" +"%d %B %Y, %A 19:00")
OPT6=$(date -d "$TODAY + $((13 - DoW)) days" +"%d %B %Y, %A 10:00")
OPT7=$(date -d "$TODAY + $((14 - DoW)) days" +"%d %B %Y, %A 10:00")

# NOTE: Cannot add more than 10 options in FB

# More options can be added as new arguments
JSON_POLL_ID=$(phantomjs --ssl-protocol=any js/create_poll.js "$UNAME" "$PASS" "$GROUP_NAME" "$MESSAGE" "$OPT1" "$OPT2" "$OPT3" "$OPT4" "$OPT5" "$OPT6" "$OPT7")

POLL_ID=$(json_load_str $JSON_POLL_ID)

echo $POLL_ID

