# from TTS import *
# from makeSSML import *

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
        # 추가적인 기능 확장을 위해 startAt, finishAt 파라미터 삽입
        # 현재는 startAt, finishAt 요소 사용 안 함
        f=open('a.txt', 'w', encoding="utf-8")
        f.write(sys.argv[1])
        f.close
        f=open('a.txt', 'r', encoding='utf-8')
        line = f.readline()
        f.close()

        self.title = line
        self.startAt = sys.argv[2]
        self.finishAt = sys.argv[3]
        self.option = sys.argv[4]
        print(self.title, self.startAt, self.finishAt, self.option)

    def notify(self):
        # Debug용 try~catch (Node server test)
        try:
            synthesize_ssml(make_notification({
                "title": self.title,
                "startAt": self.startAt,
                "finishAt": self.finishAt,
                "option": self.option
            }))
        except:
            print(make_notification({
                    "title": self.title,
                    "startAt": self.startAt,
                    "finishAt": self.finishAt,
                    "option": self.option
                }))

# server test function
def node_test():
    print("Hello JBJ can you read me?")
    # print(base64.b64encode(str(sys.argv).encode("utf-8")))
    
    # print(args)


def main():
    noti = Notification()
    noti.parse()
    # noti.notify()

if __name__ == '__main__':
    print("notification called")
    node_test()
    main()
