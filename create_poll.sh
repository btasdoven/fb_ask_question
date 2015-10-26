#!/bin/bash

function json_load_str {
	python -c "import json, sys; sys.stdout.write(unicode(json.loads(sys.argv[1])))" "$1"
}

UNAME="$1" #read -p "Facebook username: " UNAME
PASS="$2" #read -s -p "${UNAME}'s password: " PASS
GROUP_NAME="$3"


MESSAGE=$(cat <<EOF
$(date -dmonday +%U). hafta
  
Donem boyunca cumartesi 10:30-13:30 arasinda voleybol antremani olacagi icin cumartesi gunku secenegi saat 14'e cektik.
  
Yeni bir seçenek eklemek isterseniz varolan seçeneklere benzer bir şekilde ekleyebilirsiniz.
EOF
)

DoW=$(date +%u)	#day of week
TODAY=$(date +%Y%m%d)
OPT1=$(LC_ALL=en_US.utf8 date -d "$TODAY + $(( 8 - DoW)) days + 12 hours" +"%d %B %Y %A %H:%M")
OPT2=$(LC_ALL=en_US.utf8 date -d "$TODAY + $(( 9 - DoW)) days + 12 hours" +"%d %B %Y %A %H:%M")
OPT3=$(LC_ALL=en_US.utf8 date -d "$TODAY + $((10 - DoW)) days + 12 hours" +"%d %B %Y %A %H:%M")
OPT4=$(LC_ALL=en_US.utf8 date -d "$TODAY + $((11 - DoW)) days + 12 hours" +"%d %B %Y %A %H:%M")
OPT5=$(LC_ALL=en_US.utf8 date -d "$TODAY + $((12 - DoW)) days + 12 hours" +"%d %B %Y %A %H:%M")
OPT6=$(LC_ALL=en_US.utf8 date -d "$TODAY + $((13 - DoW)) days + 14 hours" +"%d %B %Y %A %H:%M")
OPT7=$(LC_ALL=en_US.utf8 date -d "$TODAY + $((14 - DoW)) days + 10 hours" +"%d %B %Y %A %H:%M")

# NOTE: Cannot add more than 10 options in FB

# More options can be added as new arguments
JSON_POLL_ID=$(phantomjs --ssl-protocol=any js/create_poll.js "$UNAME" "$PASS" "$GROUP_NAME" "$MESSAGE" "$OPT1" "$OPT2" "$OPT3" "$OPT4" "$OPT5" "$OPT6" "$OPT7")

#echo $JSON_POLL_ID

POLL_ID=$(json_load_str $JSON_POLL_ID)

echo $POLL_ID

