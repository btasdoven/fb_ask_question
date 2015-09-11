#!/bin/bash

UNAME="$1" #read -p "Facebook username: " UNAME
PASS="$2" #read -s -p "${UNAME}'s password: " PASS
GROUP_NAME="Deneme"
MESSAGE="$3"

phantomjs --ssl-protocol=any js/send_post.js "$UNAME" "$PASS" "$GROUP_NAME" "$MESSAGE"
