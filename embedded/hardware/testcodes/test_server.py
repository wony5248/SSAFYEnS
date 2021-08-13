import requests
import sys, os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from server import *

server = Server()

# dummy data
data = {
        'date': '20210811',
        'started_at': '20210811 0050' ,
        'finished_at': '20210811 0350' ,
        'deadline_at': '20210811 0350',
        'notification': '20210811 0340',
        'is_finished': False,
        'month': '08',
        'year': 2021,
        'week': "2",
        'point': 0,
        'user_id': "ssej0221",
        'title': 'hello',
        'context': 'hello server Test! 222 ',
      }

changed_data = {
        'started_at': '20210811 0220' ,
        'finished_at': '20210811 0350' ,
        'deadline_at': '20210811 0450',
}

BASE_SCHEDULE = 'schedule'
SPECIFIC_SCHEDULE = BASE_SCHEDULE+'/{id}'
TODAY_SCHEDULE = BASE_SCHEDULE+'/getdaily/{date}'
CUR_SCHEDULE = TODAY_SCHEDULE+'/current'
# 오늘 일정 수정
# API 라우트 주소는 변경될 예정
WHOLE_SCHEDULE = BASE_SCHEDULE+'/getdaily/secretary/{date}'

print("일정 추가")
server.post(data, BASE_SCHEDULE)
print("일정 확인")
return_data = server.get(WHOLE_SCHEDULE, date=True)
print("현재 일정 확인")
return_data = server.get(CUR_SCHEDULE, date=True)
print("일정 변경")
server.put(changed_data, SPECIFIC_SCHEDULE, return_data['id'])
print("변경된 현재 일정 확인")
return_data = server.get(CUR_SCHEDULE, date=True)
print("일정 삭제")
server.delete(SPECIFIC_SCHEDULE, 27)
print("일정 확인")
return_data = server.get(WHOLE_SCHEDULE, date=True)
print("현재 일정 확인")
return_data = server.get(CUR_SCHEDULE, date=True)

# 전부 잘 동작하는 것 확인!