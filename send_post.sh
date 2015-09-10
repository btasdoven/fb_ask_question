#!/bin/bash

function json_load_str {
	python -c "import json, sys; sys.stdout.write(unicode(json.loads(sys.argv[1])))" "$1"
}

UNAME="$1" #read -p "Facebook username: " UNAME
PASS="$2" #read -s -p "${UNAME}'s password: " PASS
GROUP_NAME="Deneme"
MESSAGE="$3"

JSON_POST_ID=$(phantomjs --ssl-protocol=any js/send_post.js "$UNAME" "$PASS" "$GROUP_NAME" "$MESSAGE")

POST_ID=$(json_load_str $JSON_POST_ID)

echo $POST_ID
