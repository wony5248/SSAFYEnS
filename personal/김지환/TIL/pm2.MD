
# PM2 
진행중인 FHTH 프로젝트 서버를 다중 코어 환경에 적합하게 실행해주는 모듈을 찾게되어 정리해봤습니다.
### 목적
원래 Node.js는 기본적으로 싱글쓰레드라서 코어가 여러개가 있더라도 활용하지 못합니다. PM2는 Cluster 모듈로 단일 프로세스를 멀티 프로세스로 늘릴 수 있게 해줍니다.

멀티 프로세싱을 구현하는건 굉장히 성가십니다. 이전에 팩맨게임을 구현한 적이 있는데, moveUser함수와 moverEnemy 함수에서 동시에 맵 데이터에 접근하는 바람에 데이터가 깨졌던 경험이 있습니다. 작업 규모가 작아서 간단히 임계영역(critical section)을 설정해 해결했지만, 규모가 컸다면 데이터 무결성을 유지하기위해 많은 시간이 필요했을 것 같습니다.

### 사용법
 pm2는 애플리케이션을 fork 모드와 cluster 모드로 실행할 수 있습니다. 
 pm2 [app name] -i [the number of core] 로 사용가능하지만
 ecosystem.config.js에 설정 파일을 작성하면 멀티프로세싱 뿐만 아니라 pull/build 자동화도 할 수 있습니다.

```js
//ecosystem.config.js
module.exports = {
  apps: [{
  name: 'app',
  script: './index.js',
  instances: 0,
  exec_mode: "cluster"
  }],
        deploy: {
                production: {
                        user: "bure5kzam",
                        host: ["127.0.01"],
                        ref: "origin/AWS",
                        repo: "https://github.com/SSAFY5-free/FHTH_free.git",
                        path: "/var/www/repository",
                        "post-deploy": "npm install; grunt dist"
                }
        }
}

```

```$ pm2 ecosystem.config.js``` 로 실행이 가능합니다.

| 자주 사용하는명령어                              | 설명                   |
| --------------------------------------- | -------------------- |
| **pm2 start [app.name]**                | 애플리케이션을 데몬화 할 수 있음.  |
| pm2  [app.name]                         | 애플리케이션을 데몬화 할 수 있음.  |
| pm2 list                                | 실행중인 모든 프로세스 나열      |
| pm2 stop [app.name]                     | 앱 중지                 |
| pm2 restart [app.name]                  | 재시작                  |
| pm2 show [app.name]                     | 앱 정보 확인              |
| **pm2 delete [app.name]**               | 실행중인 애플리케이션 삭제       |
| pm2 start app.js -i 0 --name [app.name] | 앱 클러스터 모드 (스크립트로 실행) |
| pm2 log -h [app.name]                   | 앱 로그 확인              |
| **pm2 pm2 start ecosystem.config.js**   | pm2 배포 설정            |
app name 대신 app number를 사용해도 됩니다.

### Reference
1. PM2 document
   1. https://pm2.keymetrics.io/docs/usage/quick-start/
2. pm2를 활용한 Node.js 무중단 서비스하기
   1. https://engineering.linecorp.com/ko/blog/pm2-nodejs/


# Jest
Node.js에서 가장 주목 받는 테스트 도구


# CS
non blocking과 blo