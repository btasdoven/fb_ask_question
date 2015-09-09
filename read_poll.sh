#!/bin/bash

read -p "Facebook username: " UNAME
read -s -p "${UNAME}'s password: " PASS
GROUP_NAME="Deneme"
POLL_ID="$1"

JSON_VOTES=$(phantomjs --ssl-protocol=any read_poll.js "$UNAME" "$PASS" "$GROUP_NAME" "$POLL_ID")
python check_votes.py "$JSON_VOTES"

