# AWS 서버 세팅과정

### 환경설정
 **apt**는 ubuntu software package management system입니다.

 앞으로 프로젝트를 위해 설치해야할 툴이 많습니다. 먼저 apt로 가까운데서 받아올 수 있게 설정을 바꿔줍시다.

sudo /etc/apt/sources.list 에서 카카오로 주소를 변경해해 줍시다.

##### 1. 시간 설정
설치에 앞서 기본적인 OS 세팅을 해줍시다.
시간을 설정하기 위해서는 리눅스에서 시간을 받아오는 /etc/localtime을 수정해줘야합니다.
```bash
sudo ln -sf /usr/share/zoneinfo/Asia/Seoul
date
```

두 커맨드로 시간을 수정하고 확인해줍시다

##### 2. 유저 추가
서버에 접근할 수 있도록 유저들을 추가해줍시다.
```bash
//유저 추가
$ sudo adduser kjh
$ sudo adduser yty
$ sudo adduser har
$ sudo adduser jbj

//유저가 잘 추가되었는지 확인
$ vi /etc/passwd
$ cat /etc/passwd | grep bash


//그룹 추가
$ sudo addgroup backend
$ sudo addgroup frontend

//그룹들을 유저에 그룹에 추가한다
$ gpasswd -a kjh backend
$ gpasswd -a yty backend
$ gpasswd -a har frontend
$ gpasswd -a jbj frontend

//다른 방법
$ gpasswd -M kjh yty backend
$ gpasswd -M har jbj frontend

//그룹에 잘 들어갔는지 확인
$ su kjh
$ groups
$ exit

```

 유저들이 추가되었지만 아직은 sudo 명령어를 사용할 수 없습니다.
sudo 권한이 있는 사람들은 `/etc/sudoers/`에 명시되어 있습니다.

```bash
# User privilege specification
root    ALL=(ALL:ALL) ALL

//여기 추가해준다.
%backend ALL=(ALL) ALL
%frontend ALL=(ALL) ALL

# Members of the admin group may gain root privileges
%admin  ALL=(ALL) ALL

# Allow members of group sudo to execute any command
%sudo   ALL=(ALL:ALL) ALL
```

```bash
나중에 유저들이 직접 패스워드를 바꿀 수 있도록 해줍시다
$ passwd
```

##### 3. 설치
우분투 소프트웨어 관리 툴인 apt를 업데이트 해주고 vim과 npm을 받아줍시다.

```bash
sudo get-apt update && apt install vim npm

#docker 설치
#https://docs.docker.com/engine/install/ubuntu/

#git도 깔아줍시다
sudo apt-get intstall -y git
```

##### 4. 방화벽 열기
```bash
#ssh
sudo ufw allow 22
##nodejs
sudo ufw allow 8080
```
### 개발폴더 생성
```bash
#home으로 이동
cd ~

#디렉토리 생성
mkdir -p pjt1/backend/
```

##### node.js 의존성 구축
```bash
//bash
#npm으로 의존성 관리하겠다고 선언
$ npm init 

#npm으로 로컬 범위에 설치
$ npm i express axios morgan dotenv jsonwebtoken mysql 

#몇가지는 커맨드에서 실행하기 편하게 global 영역에 설치합니다.
$ sudo npm i -g sequelize sequelize-cli nodemon pm2

#예제코드 생성
$ vi hello.js

```
##### js 파일 생성
```js
//hello.js
const express = require("express")
const app = express()
app.get("/hi", (req, res) => {
    console.log("hi")
    res.send("hello")
})
app.listen(8080, () => {
        console.log("welecome to nodejs server");
})
```

```bash
//bash

#실행 되는것을 확인
$ nodemon hello.js
```