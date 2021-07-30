# MariaDB 사용해보기(WSL2)

mariadb 설치 후 systemctl 커맨드로 서비스 제어하는 중에 오류 발생

service 명령어로 대신 수행 가능하다고 하지만 해결해도 다른 에러가 나올거같아서 포기

# MariaDB 사용해보기(Docker in Window)

SSAFYens 프로젝트에 사용하기 위해 MariaDB를 설치하던 중 Docker 환경을 이용해보기로 했다.

```bash
(window cmd)

# docker hub에서 이미지 가져오기 
# (https://hub.docker.com/_/mariadb)
$ docker pull mariadb

# 이미지(mariadb:tag)를 컨테이너로 실행하고 이름을 (mariadb)로 설정. 환경변수 MARIADB_ROOT_PASSWORD를 my-secret-pw로 설정. 컨테이너의 3306port를 expose하고 외부 컨테이너의 3306과 binding
# https://docs.docker.com/engine/reference/commandline/run/
$ docker run -p 127.0.0.1:3306:3306  --name mariadb -e MARIADB_ROOT_PASSWORD=my-secret-pw -d mariadb:tag
```

## (error) An attempt was made to access a socket in a way forbidden by its access permissions.

권한문제인줄 알고 관리자 모드로 실행해보기도 했는데, 도커 포럼에 검색해보니 그냥 사용 중인 포트라 바인딩 할 권한을 얻지 못했다는 의미였다

.(https://forums.docker.com/t/error-starting-userland-proxy-listen-tcp-0-0-0-0-bind-an-attempt-was-made-to-access-a-socket-in-a-way-forbidden-by-its-access-permissions/81299/7)

###(solve)

포트를 닫아주었다...

```bash
(window cmd)

# 3306 사용중인 프로세스 검색
$ netstat -ano | findstr "3306"

# 작업관리자에서 종료
```



### 참고자료

- MariaDB 소개 : https://mariadb.com/kb/ko/mariadb-korean-mariadb
- 기본 문법 : https://mariadb.com/kb/ko/basic-sql-statements/