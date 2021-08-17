### Introduction
    일정관리 IoT 
    하루의 일정을 음성 및 디바이스를 통해 일정 별로 등록 수정 완료 삭제와 같은 일정 관리가 가능하고
    음성을 통해 일정 알림을 받을 수 있고, 디바이스를 통해 하루의 일정을 확인 할 수 있습니다.
    환경센서를 기반으로 공부할때의 환경 변수(noise, temp, humid, light)를 실시간으로 측정해 일정동안의 환경을
    확인 할 수 있고 OpenCV를 이용하여 방해물품 감지를 통해 집중하여 일정을 진행할 수 있게 도와주는 일정관리 IoT입니다.

### Object
    일정을 진행하는데 집중력이 좋지 않거나 핸드폰 같은 유혹에 쉽게 빠지는 사람들이 휴대폰 없이 일정을 진행할 수 있도록 
    도와주는 일정 관리 IoT
### Install
    cd frontend_rpi
    npm install

### npm error시
    package-lock.json 삭제
    npm install

### Start in window - 윈도우에서 이용시 실행 방법
    npm start
    Browser로 이용하고 싶을 시 localhost:3000 접속
### Start in Raspberry pi - 라즈베리파이에서 이용시 실행 방법, 터미널 두개 이용하여야 함
    npm run react-start
    다른 터미널에서 npm run electron
    chromium으로 열린 창은 꺼주시면 됩니다.








