"""
--cmd--
 -1: 맨 초기 명령어(등록, 브리핑, 수정, 삭제; CRUD)
 0: 등록
 1: 브리핑
 2: 수정
 3: 삭제
 4: 완료
 5: 현재 일정
 ------
ADD 필수 데이터
{
    "date":"20210805",
    "started_at":"20210805 1300",
    "finished_at":"20210805 1500",
    "deadline_at":"20210806 2000",
    "title": "일정 제목",
    "context": "일정 내용"  // 내용은 필수
}
PUT 필수 데이터
{
    "started_at":"20210811 1500",
    "finished_at":"20210811 1700",
    "deadline_at":"20210811 2200"
}
"""
import os
from datetime import datetime
from server import *
from makeSSML import *
from TTS import *

CUR_DIR = os.path.dirname(os.path.realpath(__file__))
server = Server()

post_data = None
origin_data = None
changed_data = None
cmd_functions = None

def reset_data():
    global post_data, origin_data, changed_data
    post_data = {}
    origin_data = []
    changed_data = {}

def init():
    global cmd_functions
    reset_data()
    cmd_functions = [add_schedule, brief_schedule,
        edit_schedule, delete_schedule, clear_schedule, brief_cur_schedule]

def add_data(*names, value=0, content = None):
    global post_data
    if names[0] == 'date':
        post_data['date'] = server.get_timeline()
        return
    if content is None:
        hour = '{0:02d}'.format(value)
        timeline = f'{server.get_timeline()} {hour}00'
        for name in names:
            post_data[name] = timeline
    else:
        for name in names:
            post_data[name] = content


def pick_data(idx):
    global origin_data, changed_data
    try:
        changed_data = origin_data[idx]
        return True
    except Exception as e:
        print("pick data: ",e)
        return False

def fix_data(value):
    global changed_data
    print(value)
    cur_finish = changed_data['finished_at']
    cur_hour = int(cur_finish[-4:-2])
    new_hour = cur_hour + value
    if new_hour > 24:
        return False
    new_hour = '{0:02d}'.format(new_hour)
    changed_data['finished_at'] = cur_finish[:-4] + new_hour + cur_finish[-2:]
    return True


def add_schedule(seq=0):
    print("Add")
    if seq == 0:
        os.system(f'aplay {CUR_DIR}/tts_wav/add_schedule_start.wav')
        return True
    elif seq == 1:
        os.system(f'aplay {CUR_DIR}/tts_wav/add_schedule_name.wav')
        return True
    elif seq == 2:
        os.system(f'aplay {CUR_DIR}/tts_wav/add_schedule_detail.wav')
        return True
    elif seq == 3 or seq == 4:
        # DB에 저장하는 API 호출
        success = server.post(post_data, BASE_SCHEDULE)
        reset_data()
        if success:
            os.system(f'aplay {CUR_DIR}/tts_wav/add_schedule_finish.wav')
        else:
            os.system(f'aplay {CUR_DIR}/tts_wav/problem_occurred.wav')
        return False

def brief_schedule(seq=0):
    print("briefing")
    data = server.get(WHOLE_SCHEDULE, date=True)
    if len(data) == 0:
        os.system(f'aplay {CUR_DIR}/tts_wav/no_schedule.wav')
    else:
        brief_cur_schedule()
        synthesize_ssml(make_day_briefing(data))
    return False

def brief_cur_schedule(seq=0):
    print("cur schedule")
    data = server.get(CUR_SCHEDULE, date=True)
    if len(data) == 0:
        os.system(f'aplay {CUR_DIR}/tts_wav/no_cur_schedule.wav')
    else:
        synthesize_ssml(make_cur_schedule(data))
    return False

def edit_schedule(seq=0):
    global origin_data
    print("edit")
    if seq == 0:
        origin_data = server.get(WHOLE_SCHEDULE, date=True)
        if len(origin_data) == 0:
            os.system(f'aplay {CUR_DIR}/tts_wav/no_schedule.wav')
            return False
        else:
            synthesize_ssml(make_edit_schedule_list(origin_data))
            return True
    elif seq == 1:
        os.system(f'aplay {CUR_DIR}/tts_wav/edit_schedule_time.wav')
        return True
    elif seq == 2:
        # 몇시간 -> 파싱해서 db 수정 요청
        success = server.put(changed_data, SPECIFIC_SCHEDULE, changed_data['schedule_id'])
        reset_data()
        if success:
            os.system(f'aplay {CUR_DIR}/tts_wav/edit_schedule_finish.wav')
        else:
            os.system(f'aplay {CUR_DIR}/tts_wav/problem_occurred.wav')
        return False

def delete_schedule(seq=0):
    print("delete")
    if seq == 0:
        # 데이터 가져오는 api 호출 코드 추가
        origin_data = server.get(WHOLE_SCHEDULE, date=True)
        if len(origin_data) == 0:
            os.system(f'aplay {CUR_DIR}/tts_wav/no_schedule.wav')
            return False
        else:
            synthesize_ssml(make_edit_schedule_list(origin_data))
            return True
        return True
    elif seq == 1:
        # 삭제 api 호출
        # self, route, id=None
        success = server.delete(SPECIFIC_SCHEDULE, changed_data['schedule_id'])
        reset_data()
        if success:
            os.system(f'aplay {CUR_DIR}/tts_wav/delete_schedule_finish.wav')
        else:
            os.system(f'aplay {CUR_DIR}/tts_wav/problem_occurred.wav')
        return False

def clear_schedule(seq=0):
    # 현재 진행중인 일정 가져오기
    # 있으면 완료, 없으면 없다고 알리기
    data = server.get(CUR_SCHEDULE, date=True)
    if len(data) == 0:
        os.system(f'aplay {CUR_DIR}/tts_wav/no_cur_schedule.wav')
    else:
        # 완료 api 요청
        changed_value = {
            "started_at": data['started_at'],
            "finished_at": server.get_timeline(True),
            "deadline_at": data['deadline_at'],
            "is_finished": True
        }
        # 일단 임의로 첫번째 진행중인 일정 삭제
        success = server.put(changed_value, SPECIFIC_SCHEDULE, data[0]['schedule_id'])
        reset_data()
        if success:
            os.system(f'aplay {CUR_DIR}/tts_wav/clear_schedule_finish.wav')
        else:
            os.system(f'aplay {CUR_DIR}/tts_wav/problem_occurred.wav')
    return False


if __name__ == "function":
    init()
