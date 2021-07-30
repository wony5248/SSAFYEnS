# 도커와 쿠버네티스
도커와 쿠버네티스는 둘 다 도구이지만, 도커는 기술적이 개념도 포함한다.
이미지를 컨테이너에 넣고 실행하는 기술이 도커, 도커를 기반으로 컨테이너를 관리하는게 쿠버네티스이다.
![image](./쿠버네티스.png)



<!-- # 마이크로 서비스
> https://www.redhat.com/ko/topics/microservices/what-are-microservices

모놀리식서비스 :  -->

# 컨테이너와 이미지
> https://hoon93.tistory.com/48
### 이미지
서비스 운영에 필요한 서버 프로그램, 소스코드, 라이브러리, 컴파일된 실행 파일을 묶는 형태.
특정 프로세스를 실행하기 위한 모든 파일과 설정값(환경)을 지닌 것으로 더 이상 의존성 파일을 컴파일하거나 설치할 필요가 없는 상태를 의미한다.
 OS를 실행할때 이미지를 램에 로드하면 그 자체로 실행할 수 있는것과 유사하다.

### 컨테이너
이미지를 실행한 상태. 캡슐화된 이미지를 격리된 공간에서 실행하는 상태와 기술을 의미.


# 가상머신과의 차이점
> https://m.post.naver.com/viewer/postView.nhn?volumeNo=21385900&memberNo=2521903
>
> 가상머신은 Server 위의 Hypervisor가 각각의 OS 이미지를 구동시킨다. 
> 운영체제를 통채로 실행해야하기 때문에 고려사항이 많다.
1. 운영체제 이미지 (최소 4GB)
2. 운영체제를 실행할 커널 (부팅 시간)
3. 운영체제에서 H/W에 접근할 수단 (가상화 필요)
   1. cpu 권한을 얻은 프로세스만이 하드웨어 접근이 가능함 (운영체제가 여럿이라면?)
4. 운영체제 자체적인 스케쥴링과 그로인한 부하

각각의 하드웨어는 OS 수에 비례해 가상화되어 상호 간섭없이 사용할 수 있게된다.
![1image](하이퍼바이저.png)

반면 도커의경우, HyperVisor 대신 (Linux Container)에서 파생된 세가지 기능으로 가상화를 수행한다.
1. chroot : 특정 디렉토리가 최상위 계정으로 인식되도록 하는 기능
    ![image](chroot.png)
2. cgroup : 네임스페이스를 통해 프로세스에 자원을 할당하고 제어. 가상 운영체제에서 HW에 접근하기 위한 가상화 과정이 필요없으며, 2차 스케쥴링 또한 필요없음.
    ![image](하이버파이저와%20도커.png)



서버가 많아지고 컨테이너가 많아지면서, 이를 효율적으로 관리하기위한 컨테이너 오케스트레이션 툴들이 많이 등장했다.

# 쿠버네티스 
> https://wooono.tistory.com/109
>
> 쿠버네티스는 컨테이너를 관리하는 컨테이너 오케스트레이션 툴이다.
1. 컨테이너의 관리와 운영
2. 컨테이너 실행을 관리, 조율
3. 생성과 소멸
4. 시작, 중단시점 제어


5. 로드벨런싱
   1. 트래픽이 많아지면 새로운 컨테이너를 생성해 병목현상을 줄일 수 있음. 트래픽이 줄어들면 컨테이너를 자동으로 없애줌
6. 무중단 서비스
    1.  업데이트시에 서버를 종료하지 않고도 어플리케이션을 업데이트 할 수 있음.
7. 호환성


# Dockerize Manual (with MongoDB)
1. dockerfile 생성하기
   1. docker 이미지란?
      1. https://help.iwinv.kr/manual/read.html?idx=582
   2. mongoDB는 바로 docker에서 이미지를 받아올 수 있음
      1. https://elfinlas.github.io/2019/02/11/docker-on-mongo/
   3. 에러
      1. [Window]error during connect: Post "http://%2F%2F.%2Fpipe%2FdockerDesktopLinuxEngine/v1.24/images/create?fromImage=mongo&tag=latest": open //./pipe/dockerDesktopLinuxEngine: The system cannot find the file specified.
      2. docker-desktop 실행해야함.

2. 이미지 확인하기
   1. docker images
   2. 기존 이미지와 충돌이 있을 수 있음
      1. docker rmi [image ID]
   3. 기존 컨테이너에서 사용중이라 안지워질 수 있음
      1. docker rm $(docker ps -a -q) 

3. docker run으로 이미지를 컨테이너로 실행하기
   1. docker 기본 사용법
      1. http://pyrasis.com/Docker/Docker-HOWTO
   2. docker run <옵션> <이미지 이름> <실행된 컨테이너에서 실행할 파일>
   3. docker run -d --name [컨테이너 이름] -p [아웃바운드][인바운드] -v [아웃 볼륨]:[인볼륨] [이미지 이름]
   4. docker run -d --name mongo -p 20717:20717 bure5kzam/mongo

4. docker exec로 실행된 docker container 안에서 프로그램 실행
   1. http://pyrasis.com/book/DockerForTheReallyImpatient/Chapter20/08
   2. docker exec -it [컨테이너 이름] [실행할 프로그램 경로]
   3. 컨테이너 안에서 bash 실행

5. 컨테이너 commit해 배포할 수 있는 상태로 저장하기
   1. mongodb에 db 추가
      1. bash에서 mongo로 mongo 실행
      2. use test
      3. db.test.insert({msg : hi})
   2. docker 상태 저장하기
      1. 사용중인 docker 컨테이너를 이미지 형태로 커밋할 수 있음.
         1. https://eungbean.github.io/2018/12/03/til-docker-commit/
      2. docker에도 git처럼 commit 이 있으며, dockerHub에 push할 수 있음.
      3. 먼저 dockerHub에 가입해야함.
         1. https://hub.docker.com/
      4. dockerHub에 로그인
         1. docker login
      5. 컨테이너에 태그 달기
         1. https://docs.docker.com/engine/reference/commandline/tag/
         2. docker tag mongo fhth_mongo:latest
         3. docker tag와 docker image tag의 차이, docker tag의 기능
            1. https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=alice_k106&logNo=220462660147    
      6. docker commit
         1. https://docs.docker.com/engine/reference/commandline/commit/
         2. docker commit mongo fhth_mongo:latest
         3. 문제
            1. docker의 fs 외에 생성된 파일은 커밋해도 이미지로 저장되지않음. 
               1. docker에서 볼륨 생성해서 데이터를 유지할 수 있다고함.
                  1. https://www.daleseo.com/docker-volumes-bind-mounts/
            2. 실행중인 컨테이너에 볼륨을 추가할 수는 없지만, 컨테이너에서 생성된 내용을 복사해올 수는 있음.\
               1. https://www.python2.net/questions-59093.htm
               2. docker cp mongo:/data C:/what
            3. 마운트 후 저장한 데이터를 붙여넣기
               1. docker run -it --name fhth_mongo -p 27017:27017 -v C:/mount/fhth:/data bure5kzam/mongo
               2. 윈도우 경로에 대문자들어가니까 에러뜸
      7. push하기
         1. docker push <Docker 레지스트리 URL>/<이미지 이름>:<태그>
         2. docker push mongo fhth_mongo:latest
         3. $ docker image push [options] 리포지터리명[:태그]
            1. https://joont92.github.io/docker/image-%EB%8B%A4%EB%A3%A8%EA%B8%B0/
         4. 에러
            1. 권한에러 발생
               1. 해결방법
                  1. https://nirsa.tistory.com/53
               2. 이유
                  1. https://stackoverflow.com/questions/41984399/denied-requested-access-to-the-resource-is-denied-docker
                  2. 원격저장소를 이용하기위해서는 repository에 namespace를 지정해줘야함
                  3. https://joont92.github.io/docker/image-%EB%8B%A4%EB%A3%A8%EA%B8%B0/
      8. 윈도우의 mongodb 데이터를 aws에서 사용하기위해선,, mongo export를 사용해야 했다..
         1. https://docs.mongodb.com/database-tools/mongoexport/#mongodb-binary-bin.mongoexport

6. 실전 써보기
   1. 도커 이미지를 컨테이너로 실행
      1. docker -d -p 27017:27017 --name mongo mongo
   2. 도커 컨테이너에서 bash 쉘 실행
      1. docker exec -it mongo bash
      2. 컨테이너 내에서 mongo 커맨드 실행해 조작할 수도 있음
         1. mongo
   3. fhth의 backend와 frontend 실행

# Docker with Mysql Cli
> docker pull mysql
> docker run -it --network some-network --rm mysql mysql -hsome-mysql -uexample-user -p
> docker run -d -p 3306:3306 --name mysql-container -e MYSQL_ROOT_PASSWORD=1234 -v ~/mysqldata/:/var/lib/mysql mysql --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci