# fb_ask_question
Facebook Ask Question Bot

# How to use?

To create a question poll, run the following command:
```
$ ./create_poll.sh > poll.id
```

Script echos the id of the created poll for the later use.

To retrieve the votes of the previously created poll, run the following command:
```
$ ./read_poll.sh $(cat poll.id)
```

This script reads the poll whose id is given as argument and prints (Poll Option Name, Vote Count) dictionary.

In order to modify poll message, poll options and the group on which the poll is craeted, change the constants in the both files.

# Dependencies

- [phantomjs](http://phantomjs.org/)
- [python](https://www.python.org/)




