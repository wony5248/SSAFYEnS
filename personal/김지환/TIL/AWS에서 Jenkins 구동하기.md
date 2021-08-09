# Docker(jenkins)

Application 개발협업을 해본 사람이라면 협업이 얼마나 어려운지 안다.

숱한 커밋 충돌과 브랜치 통합,, pull후 해일처럼 밀려오는 에러로그,,,



Jenkins는 CI/CD 파이프라인 제공하는 툴로, 애플리케이션 개발/통합 과정을 자동화해준다.

Jenkins는 공유저장소를 모니터링하다가 커밋이 수행되면 동작한다.

1. 커밋된 코드를 빌드해본다.
2. 커밋된 코드에서 오류발생 시 커밋을 취소하고 알린다.
3. 에러가 없으면 사용자가 작성한 script에 따라 단위 테스트를 실행한다.
4. 단위 테스트에 성공하면 커밋을 통과시킨다.



## Jenkins 설치하기

```bash
$ docker pull jenkins

$ docker volume create sfens-jenkins

$ docker run -d --name sfens-jenkins -p 8000:8080 -v sfens-jenkins:/var/jenkins_home jenkins/jenkins

$ docker logs sfens-jenkins

```

브라우저로 8080에 접속한 후 docker logs에서 발급된 키를 복사하면 jenkins를 구동할 수 있다.



이로서 jenkins 설치를 완료했다.

## Plugin 설치하기

jenkins에는 CI/CD에 필요한 정보를 제공하는 정보를 제공하는 플러그인들이 있다.

devops들의 Medium을 돌아다니며 유용한 플러그인들을 조사해보았다.

| 이름         | 내용                                       |
| ---------- | ---------------------------------------- |
| Blue Ocean | [Jenkins Document에서도 권창하는 확장 플러그인](https://www.jenkins.io/doc/book/blueocean/getting-started/)<br />Blue Ocean에 Git 자격요건만 증명하면 Git과 연동시킬 수 있다고 한다. |
| Jira       | commit message로 Jira issue를 제어하게 해주는 플러그인 |
| gitlab     | gitlab에 엑세스하도록 지원하는 플러그인                 |
| nodejs     | nodejs 코드 빌드를 지원하는 플러그인                  |
|            |                                          |





| 링크                                       | 설명                            |
| ---------------------------------------- | ----------------------------- |
| [Devops 2021: The best Jenkins Plugins to have in 2021](https://medium.com/devopscurry/devops-2021-the-best-jenkins-plugins-to-have-in-2021-b015189a19b5) | jenkins plugin의 동작과정, 플러그인 추천 |

