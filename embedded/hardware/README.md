# Description

# Environment
```
Linux 5.10.17-v7l+ #1414 SMP Fri Apr 30 13:20:47 BST 2021 armv7l GNU/Linux
Python 3.7.3
pip 18.1
```

# Installation
```
pip3 install Adafruit_DHT
```

# Functions
* `Server.py`
    * `.get_data()` : 온습도, 조도, 소음 데이터 딕셔너리 형태로 리턴

* `Sensor.py`
    * `.post(data)` : 딕셔너리 형태 데이터 받아 로컬 서버로 POST

# TODO
* 배포를 위한 가상환경 제작 or install 스크립트 제작
* 크론 스케줄러를 위한 환경변수 설정
* 부팅시 시작 스크립트 작성
