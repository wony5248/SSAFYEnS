from datetime import datetime

def make_text_ssml(text):
    print_test = "<speak>"+text+"</speak>"
    print(print_test)
    return print_test

def make_12_timeline(time):
    # time format: '20210811 0050'
    hour = int(time[-4:-2])
    min = int(time[-2:])
    antepost = "오전"
    if hour >= 12:
        antepost = "오후"
        hour = hour - 12
    hour = '{0:02d}'.format(hour)
    min = '{0:02d}'.format(min)

    final_time = f"{hour}:{min}"
    return (final_time, antepost)


def make_day_briefing(data):
    default_ssml = """
    <say-as interpret-as="ordinal">{index}</say-as> 일정은
    {antepost1} <say-as interpret-as="time" format="hms12">{startAt}</say-as> 부터
    {antepost2} <say-as interpret-as="time" format="hms12">{finishAt}</say-as> 까지
    {todo_name}이고 <break time="500ms"/>
    """
    made_ssml = ""
    complete_schedule = 0
    index = 0
    curHour = datetime.now().hour
    curMin = datetime.now().minute
    for schedule in data:
        try:
            start = schedule['started_at']
            finish = schedule['deadline_at']
            todo_name = schedule['title']
            complete = schedule['is_finished']
            startHour = int(start[-4:-2])
            startMin = int(start[-2:])
            if complete:
                complete_schedule += 1
                continue
            if curHour < startHour or (curHour == startHour and curMin <= startMin):
                index += 1
                startAt, antepost1 = make_12_timeline(start)
                finishAt, antepost2 = make_12_timeline(finish)
                made_ssml += default_ssml.format(index=index,
                                    antepost1=antepost1, startAt=startAt,
                                    antepost2=antepost2, finishAt=finishAt,
                                    todo_name=todo_name)
        except:
            continue
    # if len(data) == 0:
    #     made_ssml = """
    #     오늘 일정은 없습니다.
    #     <break time="500ms"/>
    #     새로운 일정을 추가해보시는 건 어떨까요?
    #     """
    # else:
    made_ssml += f"""
            남은 일정의 수는 {index}개, 오늘 완료한 일정의 수는 {complete_schedule}개입니다.
            <break time="800ms"/> 즐거운 하루 되세요. """
    return make_text_ssml(made_ssml)

def make_edit_schedule_list(data, dele=False):
    default_ssml = """
    <say-as interpret-as="ordinal">{index}</say-as> 일정 <break time="300ms"/>
    {todo_name} <break time="800ms"/>
    """
    made_ssml = '어떤 일정을 바꿀까요? <break time="500ms"/>'
    if dele:
        made_ssml = '어떤 일정을 삭제할까요? <break time="500ms"/>'
    index = 0

    for schedule in data:
        print(schedule)
        try:
            start = schedule['started_at']
            finish = schedule['finished_at']
            todo_name = schedule['title']
            complete = schedule['is_finished']
            if not complete:
                index += 1
                made_ssml += default_ssml.format(index=index, todo_name=todo_name)
        except:
            continue
    made_ssml += "일정 번호를 말씀해주세요."
    return make_text_ssml(made_ssml)

def make_cur_schedule(data):
    default_ssml = """
    {antepost1} <say-as interpret-as="time" format="hms12">{startAt}</say-as> 부터
    {antepost2} <say-as interpret-as="time" format="hms12">{finishAt}</say-as> 까지
    {todo_name} 진행중입니다. <break time="500ms"/>
    """
    seq_ssml = '<say-as interpret-as="ordinal">{index}</say-as> <break time="300ms"/>'
    made_ssml = f'현재 진행중인 일정 {len(data)}개 있습니다. <break time="500ms"/>'
    if data is None or len(data) == 0:
        made_ssml = ""
    else:
        for index, schedule in enumerate(data):
            start = schedule['started_at']
            finish = schedule['finished_at']
            todo_name = schedule['title']

            startAt, antepost1 = make_12_timeline(start)
            finishAt, antepost2 = make_12_timeline(finish)
            made_ssml += seq_ssml.format(index=index+1)
            made_ssml += default_ssml.format(
                                antepost1=antepost1, startAt=startAt,
                                antepost2=antepost2, finishAt=finishAt,
                                todo_name=todo_name)

    return make_text_ssml(made_ssml)
