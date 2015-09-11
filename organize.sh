#!/bin/bash

UNAME="$1" 
PASS="$2" 
GROUP_NAME="$3"
VOTES=$(./read_poll.sh $UNAME $PASS $GROUP_NAME $(cat poll.ids | tail -1))
MESSAGE=$(python generate_message.py $VOTES)
if [[ ! -z $MESSAGE ]]; then
	./send_post.sh $UNAME $PASS $GROUP_NAME $MESSAGE
else
	echo "No need to send a post. Aborting"
fi
