# SSAFY EnS Frontend
## Installation
```
git clone https://lab.ssafy.com/s05-webmobile3-sub3/S05P13A109.git
cd S05P13A109
npm install
```

## Start
```
cd frontend
npm start
```

## Repo structure
```
/
├─ public/
│
├─ src/
│  ├─ components/               # Components
│  │  ├─ average/               # 일정 통계
│  │  │  ├─ daily/              # 일별 일정 통계
│  │  │  ├─ monthly/            # 월별 일정 통계
│  │  │  └─ weekly/             # 주별 일정 통계
│  │  ├─ calendar/              # 일정
│  │  │  ├─ evaluation/         # 하루 일정 평가
│  │  │  ├─ month/              # 달력 형태의 일정 확인
│  │  │  ├─ plan/               # 일정 등록
│  │  │  ├─ planlist/           # 하루 일정 목록
│  │  │  └─ planmodify/         # 일정 수정
│  │  ├─ checkpw/               # 정보 수정시 비밀번호 확인
│  │  ├─ findUser/              # 회원 정보 찾기
│  │  ├─ footers/               # footer
│  │  ├─ group/                 # 
│  │  ├─ groupchange/           # 
│  │  ├─ groupcreate/           # 
│  │  ├─ groupinfo/             # 
│  │  ├─ groupjoin/             # 
│  │  ├─ groupmanage/           # 
│  │  ├─ headers/               # header
│  │  ├─ login/                 # 로그인
│  │  ├─ main/                  # main 화면
│  │  ├─ modifyMyinfo/          # 회원 정보 수정
│  │  ├─ resetpw/               # 비밀번호 찾기 시 비밀번호 재설정
│  │  ├─ signup/                # 회원가입
│  │  └─ userinfo/              # mypage
│  │
│  ├─ images/                   # page에서 사용하는 image
│  │
│  ├─ pages/                    # pages
│  │  ├─ average/               # 일정 통계
│  │  ├─ checkpasswd/           # 비밀번호 확인
│  │  ├─ dailyevaluate/         # 하루 일정 평가
│  │  ├─ find/                  # 아이디 비밀번호 찾기
│  │  ├─ group/                 # 
│  │  ├─ groupinfo/             # 
│  │  ├─ groupmanage/           # 
│  │  ├─ login/                 # 로그인
│  │  ├─ main/                  # 메인
│  │  ├─ modifyuserinfo/        # 회원 정보 수정
│  │  ├─ mypage/                # mypage
│  │  ├─ plan/                  # 일정 등록
│  │  ├─ planlist/              # 일정 목록
│  │  ├─ planmodify/            # 일정 수정
│  │  ├─ resetpasswd/           # 비밀번호 재설정
│  │  └─ signup                 # 회원가입
│  │
│  └─ utils/                    # axios file
│
│
├─ .gitignore        
├─ Dockefile         
├─ nginx.conf
├─ package-lock.json
├─ package.json      
├─ yarn.lock           
└─ README.md         
```
