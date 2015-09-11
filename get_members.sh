#!/bin/bash

UNAME="$1" 
PASS="$2" 
GROUP_NAME="Deneme"

MEMBERS=$(phantomjs --ssl-protocol=any js/get_members.js "$UNAME" "$PASS" "$GROUP_NAME")
echo $MEMBERS
