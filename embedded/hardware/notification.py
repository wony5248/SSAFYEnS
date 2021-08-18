from TTS import *
from makeSSML import *

import base64
import argparse
import sys

class Notification():
    def __init__(self):
        self.title = None
        self.startAt = None
        self.finishAt = None
        self.option = None

    def parse(self):
        parser = argparse.ArgumentParser()
        parser.add_argument('--title', help='Title of schedule',
                            required=True)
        parser.add_argument('--diff', help='diffrentiate of finished-notification',
                            default=None)
        parser.add_argument('--finishAt', help='Finished time of schedule',
                            default=None)
        parser.add_argument('--option', help='Notification time',
                            default='')

        args = parser.parse_args()
        self.title = args.title
        self.diff = args.diff
        self.finishAt = args.finishAt
        self.option = args.option
        print(args)
        print(self.title, self.diff, self.finishAt, self.option)

    def notify(self):
        # Debug용 try~catch (Node server test)
        try:
            synthesize_ssml(make_notification({
                "title": self.title,
                "startAt": self.startAt,
                "finishAt": self.finishAt,
                "option": self.option
            }), True)
        except:
            print(make_notification({
                    "title": self.title,
                    "startAt": self.startAt,
                    "finishAt": self.finishAt,
                    "option": self.option
                }))

def main():
    noti = Notification()
    noti.parse()
    noti.notify()

if __name__ == '__main__':
    print("notification called")
    main()
