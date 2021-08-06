### install
    cd backend_rpi
    npm install

### start
    npm start

### Sensor
    POST 127.0.0.1:4500/test/sensor
    body = {"temp" : "27", "humid" : "50", "noise" : "132", "light" : "22"}

    GET 127.0.0.1:4500/test/sensor
    body = {"temp" : "27", "humid" : "50", "noise" : "132", "light" : "22"}

### 일정 추가
    POST 127.0.0.1:4500/test/schedule

### 일정 완료 및 변경
    PUT 127.0.0.1:4500/test/:id

### 일정 삭제
    DELETE 127.0.0.1:4500/test/schedule/:id

### 일정 가져오기
    GET 127.0.0.1:4500/test/:id

### 하루일정 갖져오기
    GET 127.0.0.1:4500/test/getdaily/:date

### TODO
    음성 값, 모듈값 통신

