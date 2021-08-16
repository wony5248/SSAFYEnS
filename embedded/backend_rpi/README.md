<<<<<<< HEAD
### install
    cd backend_rpi
    npm install

### start
    npm start

=======
## 논의한 내용

### GitLab Repo 디렉토리 구조

<<<<<<< HEAD
- main
  - README.md: 폴더 구조 설명, 프로젝트 설명, 
  - personal
    - 이름
      - README.md: 개인별 Sub-PJT II 진행상황 등 자유
      - 이하 팀원별 자유
  - 기획
    - 요구사항 명세서.pdf
    - 
  - 설계
    - 와이어프레임.pdf
    - 
  - frontend
    - README.md
  - backend
    - README.md
  - embedded
    - README.md
  - 테스트
  - 배포

### 브랜치

[참고](https://techblog.woowahan.com/2553/)

- master
- hotfixes
- develop
- release
- frontend-기능명
- backend-기능명
- embedded-기능명
- TIL

추가 브랜치 필요한 경우 문의!



### 커밋 메세지 컨벤션

![image-20210719180005937](README.assets/image-20210719180005937.png)

- docs/TIL/날짜: TIL README.md 할 때
- 
=======
>>>>>>> embedded-STT
### Sensor
    POST 127.0.0.1:4500/sensor
    body = {"temp" : "27", "humid" : "50", "noise" : "132", "light" : "22"}

    GET 127.0.0.1:4500/sensor
    body = {"temp" : "27", "humid" : "50", "noise" : "132", "light" : "22"}

### 일정 추가
    POST 127.0.0.1:4500/schedule
    data : {
<<<<<<< HEAD
            date: 20210810 1640,
            started_at: 20210810 1640,
            finished_at: 20210810 1840 ,
            deadline_at: 20210810 2040,
            notification: 20210810 1830,
            is_finished: false,
            month: 08,
            year: 2021,
            week: "1",
            point: 0,
=======
            date: 20210810,
            started_at: 20210810 1640,
            finished_at: 20210810 1840 ,
            deadline_at: 20210810 2040,
            notification: null,
            notificationtime: 20210810 1810,
            is_finished: false,
>>>>>>> embedded-STT
            user_id: "wony5248",
            title: title,
            context: context,
          }

### 일정 완료 및 변경
    PUT 127.0.0.1:4500/schedule/:id

### 일정 삭제
    DELETE 127.0.0.1:4500/schedule/:id

### 특정 일정 가져오기
    GET 127.0.0.1:4500/schedule/:id


### 현재 일정 가져오기
    GET 127.0.0.1:4500/schedule/getdaily/:date/current
    date 형식 => 20210810
    return : {
    "id": 47,
    "user_id": "wony5248",
    "month": "8",
    "year": "2021",
    "week": "32",
    "date": "0809-12-31T15:32:08.000Z",
    "title": "공부",
    "context": "공부 하기",
    "started_at": "2021-08-09T15:00:00.000Z",
    "finished_at": "2021-08-10T08:00:00.000Z",
    "deadline_at": "2021-08-10T09:00:00.000Z",
    "point": 0,
    "is_finished": false,
    "notification": "2021-08-10T07:30:00.000Z",
    "noti_extend": 0,
    "challenge_id": null,
    "createdAt": "2021-08-10T04:21:45.000Z",
    "updatedAt": "2021-08-10T04:21:45.000Z"
    }

### 하루 일정 가져오기 음성비서용
    GET 127.0.0.1:4500/schedule/getdaily/secretary/:date

### 하루일정 가져오기
    GET 127.0.0.1:4500/schedule/getdaily/:date
    date 형식 => 20210810
    return : [
    {
        "id": 47,
        "user_id": "wony5248",
        "month": "8",
        "year": "2021",
        "week": "32",
        "date": "0809-12-31T15:32:08.000Z",
        "title": "공부",
        "context": "공부 하기",
        "started_at": "2021-08-09T15:00:00.000Z",
        "finished_at": "2021-08-10T08:00:00.000Z",
        "deadline_at": "2021-08-10T09:00:00.000Z",
        "point": 0,
        "is_finished": false,
        "notification": "2021-08-10T07:30:00.000Z",
        "noti_extend": 0,
        "challenge_id": null,
        "createdAt": "2021-08-10T04:21:45.000Z",
        "updatedAt": "2021-08-10T04:21:45.000Z"
    },
    {
        "id": 46,
        "user_id": "wony5248",
        "month": "8",
        "year": "2021",
        "week": "32",
        "date": "0809-12-31T15:32:08.000Z",
        "title": "공부",
        "context": "공부 하기",
        "started_at": "2021-08-10T08:00:00.000Z",
        "finished_at": "2021-08-10T10:00:00.000Z",
        "deadline_at": "2021-08-10T11:30:00.000Z",
        "point": 0,
        "is_finished": false,
        "notification": "2021-08-10T09:30:00.000Z",
        "noti_extend": 0,
        "challenge_id": null,
        "createdAt": "2021-08-10T04:19:54.000Z",
        "updatedAt": "2021-08-10T04:19:54.000Z"
    },
    {
        "id": 44,
        "user_id": "wony5248",
        "month": "8",
        "year": "2021",
        "week": "32",
        "date": "0809-12-31T15:32:08.000Z",
        "title": "수면",
        "context": "수면 하기",
        "started_at": "2021-08-10T10:00:00.000Z",
        "finished_at": "2021-08-10T12:00:00.000Z",
        "deadline_at": "2021-08-10T13:00:00.000Z",
        "point": 0,
        "is_finished": false,
        "notification": "2021-08-10T11:30:00.000Z",
        "noti_extend": 0,
        "challenge_id": null,
        "createdAt": "2021-08-10T04:18:54.000Z",
        "updatedAt": "2021-08-10T04:18:54.000Z"
    },
    {
        "id": 45,
        "user_id": "wony5248",
        "month": "8",
        "year": "2021",
        "week": "32",
        "date": "0809-12-31T15:32:08.000Z",
        "title": "운동",
        "context": "운동 하기",
        "started_at": "2021-08-10T12:00:00.000Z",
        "finished_at": "2021-08-10T14:30:00.000Z",
        "deadline_at": "2021-08-10T14:30:00.000Z",
        "point": 0,
        "is_finished": false,
        "notification": "2021-08-10T14:00:00.000Z",
        "noti_extend": 0,
        "challenge_id": null,
        "createdAt": "2021-08-10T04:19:13.000Z",
        "updatedAt": "2021-08-10T04:19:13.000Z"
    }
    ]
    시간 순서대로 옴

### TODO
    음성 값, 모듈값 통신

<<<<<<< HEAD
=======
>>>>>>> embedded-contextAPI
>>>>>>> embedded-STT
