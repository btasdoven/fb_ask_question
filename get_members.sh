#!/bin/bash

UNAME="$1" 
PASS="$2" 
GROUP_NAME="$3"

MEMBERS=$(phantomjs --ssl-protocol=any js/get_members.js "$UNAME" "$PASS" "$GROUP_NAME")
echo $MEMBERS
