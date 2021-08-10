### install
    cd backend_rpi
    npm install

### start
    npm start

### Sensor
    POST 127.0.0.1:4500/sensor
    body = {"temp" : "27", "humid" : "50", "noise" : "132", "light" : "22"}

    GET 127.0.0.1:4500/sensor
    body = {"temp" : "27", "humid" : "50", "noise" : "132", "light" : "22"}

### 일정 추가
    POST 127.0.0.1:4500/schedule
    data : {
            date: 20210810 1640,
            finished_at: 20210810 1840 ,
            deadline_at: 20210810 2040,
            notification: 20210810 1830,
            is_finished: false,
            month: 08,
            year: 2021,
            week: "1",
            point: 0,
            user_id: "wony5248",
            title: title,
            context: context,
          }

### 일정 완료 및 변경
    PUT 127.0.0.1:4500/schedule/:id

### 일정 삭제
    DELETE 127.0.0.1:4500/schedule/:id

### 일정 가져오기
    GET 127.0.0.1:4500/schedule/:id

### 하루일정 갖져오기
    GET 127.0.0.1:4500/schedule/getdaily/:date
    date 형식 => 20210810
    return : [
    {
        "id": 42,
        "user_id": "wony5248",
        "month": "8",
        "year": "2021",
        "week": "32",
        "date": "0809-12-31T15:32:08.000Z",
        "title": "수면",
        "context": "수면 하기",
        "started_at": "2021-08-09T15:00:00.000Z",
        "finished_at": "2021-08-10T08:00:00.000Z",
        "deadline_at": "2021-08-09T23:30:00.000Z",
        "point": 0,
        "is_finished": false,
        "notification": "2021-08-10T00:56:00.000Z",
        "noti_extend": 0,
        "challenge_id": null,
        "createdAt": "2021-08-09T16:36:13.000Z",
        "updatedAt": "2021-08-10T00:56:14.000Z"
    }
    ]
    시간 순서대로 옴

### TODO
    음성 값, 모듈값 통신

