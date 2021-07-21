# MariaDB 사용해보기(WSL2)

mariadb 설치 후 systemctl 커맨드로 서비스 제어하는 중에 오류 발생

service 명령어로 대신 수행 가능하다고 하지만 해결해도 다른 에러가 나올거같아서 포기

# MariaDB 사용해보기(Docker)

방법을 찾다가 docker 배포판이 있을거같아서 봤더니 있었다.

1. docker로 이미지 가져오기

   1. ```docker pull mariadb```

      1. https://hub.docker.com/_/mariadb

   2. `docker run -p 127.0.0.1:3306:3306  --name mariadb -e MARIADB_ROOT_PASSWORD=my-secret-pw -d mariadb:tag`

      1. 에러발생

         `docker run -p 127.0.0.1:3306:3306  --name mariadb -e MARIADB_ROOT_PASSWORD=my-secret-pw -d mariadb:tag`

      2. (https://forums.docker.com/t/error-starting-userland-proxy-listen-tcp-0-0-0-0-bind-an-attempt-was-made-to-access-a-socket-in-a-way-forbidden-by-its-access-permissions/81299/7)

         1. 사용중인 포트라서라고 한다
         2. 윈도우니까 netstat -ano로 포트확인
            1. 윈도우에서 grep을 대체하는 커맨드가 있었다. findstr "3306"

   3. docker 컨테이너 생성 완료 (maria)

### 참고자료

- MariaDB 소개 : https://mariadb.com/kb/ko/mariadb-korean-mariadb
- 기본 문법 : https://mariadb.com/kb/ko/basic-sql-statements/
- MariaDB 공식 브로슈어
- mysqldump를 활용한 논리 백업 및 복구