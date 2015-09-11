#!/bin/bash

UNAME="$1" 
PASS="$2" 
DoW=$(date +%u)
HoD=$(date +%k%M)
if [ "$DoW" -eq 7 -a "$HoD" -st 1200 ]; then
	./create_poll.sh $UNAME $PASS >> poll.ids
else
	VOTES=$(./read_poll.sh $UNAME $PASS $(cat poll.ids | tail -1))
	MESSAGE=$(python generate_message.py $VOTES)
	if [[ ! -z $MESSAGE ]]; then
		./send_post.sh $UNAME $PASS $MESSAGE
	fi
fi
