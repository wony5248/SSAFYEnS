### install
    cd backend_rpi
    npm install

### start
    npm start

### POST test (sensor -> Rpi -> AWS)
    post 127.0.0.1:3000/test/sensor
    body = {"temp" : "27", "humid" : "50", "noise" : "132", "light" : "22"}

### GET test (FE -> Rpi -> AWS)
    GET 127.0.0.1:3000/test/sensor
    body = {"temp" : "27", "humid" : "50", "noise" : "132", "light" : "22"}

### result
    req.body 출력

### TO DO
    db에 값 보내고 db에서 값 가져오는 API TEST
