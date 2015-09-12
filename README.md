# fb_ask_question
Facebook Asking Question and Vote Retrival Bot

- Generates a question poll in a Facebook group. Poll options and poll message are configurable.
- Reads a question poll in a Facebook group and retrieves vote count for each option.

# How to use?

To create a question poll, run the following command:
```
$ ./create_poll.sh <FB username> <FB password> <FB Group Name>
```

Script echos the id of the created poll for the later usage.

To retrieve the votes of the previously created poll, run the following command:
```
$ ./read_poll.sh <FB username> <FB password> <FB Group Name> <Poll ID>
```
This script reads the poll whose id is given as argument and prints a `<Poll Option Name, Array of Voters>` dictionary.

# Configurations

For a question poll;
- Poll Message
- Poll Option Names
- Facebook Group 

are configurable. These configurations can be modified by changing the first few lines of the scripts.

# Example Usage

```
$ touch poll.ids
$ ./create_poll.sh $FB_USERNAME $FB_PASSWORD $FB_GROUP_NAME >> poll.ids
$ cat poll.ids
666322010171478
$ ./read_poll.sh $FB_USERNAME $FB_PASSWORD $FB_GROUP_NAME $(cat poll.ids | tail -1)
...
```

# Dependencies

- [phantomjs](http://phantomjs.org/)
- [python 2.x](https://www.python.org/)

# TODOs

- ~~Retrieve list of voter names for each option instead of just a number.~~
- ~~Create a post message on a facebook group~~ (and add tagging people feature).



