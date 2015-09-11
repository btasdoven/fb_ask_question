#!/bin/bash

UNAME="$1" #read -p "Facebook username: " UNAME
PASS="$2" #read -s -p "${UNAME}'s password: " PASS
GROUP_NAME="$3"
POLL_ID="$4"

VOTES=$(phantomjs --ssl-protocol=any js/read_poll.js "$UNAME" "$PASS" "$GROUP_NAME" "$POLL_ID")
#python print_votes.py "$JSON_VOTES" "$1" "$2"

echo $VOTES
