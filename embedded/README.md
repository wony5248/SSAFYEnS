# Description
AI 음성 인식과 웹 연동을 통해 일정을 관리해 주는 스마트 일정 관리 비서

### 임베디드 웹
- 기기에 부착된 모니터를 통해 웹에서 할 수 있는 일정 관리 간편 대체
- 타이머/스톱워치 기능
- [매뉴얼](https://docs.google.com/presentation/d/1SAOFiWEG-idjADc3M9wHVXd34p8VvH103RLwdWuDk4A/edit?usp=sharing)

### 하드웨어
- 실시간 음성 인식(STT)과 실시간 음성 출력(TTS)을 이용한 편리한 일정 조회/등록/수정/완료/삭제 기능
- 카메라를 통한 집중 방해 물품 감지 및 스트리밍 기능
- [매뉴얼](./hardware/STT_MANUAL.md)

# Environment
### OS
```
Linux 5.10.17-v7l+ #1414 SMP Fri Apr 30 13:20:47 BST 2021 armv7l GNU/Linux
```
### Language/Framework
```
Python 3.7.3
pip 18.1
Node 14.17.3
npm 6.14.13
```

# Directory
```
├── README.md                       // README.md
├── backend_rpi/
│   ├──
│   ├──
│   └──
├── frontend_rpi/
│   ├──
│   ├──
│   ├──
│   └──
├── hardware/
│   ├── README.md                   // 하드웨어 회로도 및 specification
│   ├── STT_MANUAL.md               // STT Manual
│   ├── testcodes/                  // 테스트 스니펫; 모듈 테스트 및 동작 확인
│   ├── ics43432/                   // 사운드 드라이버 관련 디렉터리
│   ├── tts_wav/                    // Pre-defined TTS 음성 파일 디렉터리
│   │   └── TTS_list.md             // tts_wav에 정의된 음성 목록
│   ├── streaming/                  // 카메라 스트리밍 관련 디렉터리
│   │   └── camera_stream.py        // 스트리밍 서버    
│   ├── event_listener.py           // 메인 이벤트 루프 실행 파일
│   ├── sense_schedule.py           // 크론탭에서 실행되는 환경 변수 센싱 파일
│   └── *.py                        // 기타 소스 파일
├── embedded_installation.sh        // Installation 스크립트
└── device_start.sh                 // 실행 스크립트
```

# Get it start
## Configration Settings
```
sudo raspi-config
> Interface Options
    > Enable Camera
    > Enable SPI
> System Options
    > Audio
    > 1 Headphones
```
## Installation
```
$ git clone https://lab.ssafy.com/s05-webmobile3-sub3/S05P13A109.git
$ cd S05P13A109/embedded
$ . ./embedded_installation.sh
```
### Get Google Credential Key! (required)
[Check This Docs](./hardware/GET_GOOGLE_KEY.md)

## Activate
```
$ cd S05P13A109/embedded
$ . ./device_start.sh
$ cd frontend_rpi
$ npm run electron
```

# Technical Stack
## Backend
- Node.js

## Frontend
- React.js
- Electron

## Hardware
- Linux
- GCP(Google Cloud Platform)
- OpenCV
