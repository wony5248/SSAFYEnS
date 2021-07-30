



### 문제 1.

###  AWS bash에서 docker로 mysql/mysql-server 을 구동하고 mysql-cli로 접속하는데 문제가 있습니다.



문제상황 : 리눅스에서 Docker로 mysql를 구동하고 mysql-cli로 docker에 접속하려 하는데, 호스트를 어떻게 명시하느냐에 따라 다른 결과가 나옵니다. 제가 생각하기는 같은 표현을 다르게 명시한 것 같은데 이해가 안됩니다.



```bash
#아래는 trouble shooting에 필요한 docker mysql 구축 과정입니다.

$ docker run -d -p 3307:3306 --name sfens-mysql -e MYSQL_ROOT_PASSWORD=suic -v sfens-mysql:/var/lib/mysql bure5kzam/sfens-mysql
# dockerhub에서 pull 받아온 mysql-server를 컨테이너로 실행했습니다. port는 3307로 expose해주었고, 데몬으로 동작하는 -d옵션을 주었고, 루트권한 비밀번호로 사용되는 환경변수 'MYSQL_ROOT_PASSWORD'를 suic로 설정해주었습니다.

$ sudo docker exec -it mysql1 bash
=> bash-4.4#
#mysql1 컨테이너에서 shell을 실행합니다.

$ bash-4.4# mysql -u root -p suic
=> mysql >
#mysql에 접속을 성공했습니다. 컨테이너 생성시에 적용한 환경변수 값으로 접속 성공했습니다.

mysql은 기본 설정으로 root@localhost만 접속 가능하므로, 외부 호스트가 접근할 수있도록 설정을 해줘야했습니다. 모든 호스트를 의미하는 % 기호를 사용해서 GRANT명령어로 root@%에게 suic2라는 패스워드를 생성해주었습니다.
#아래는 생성된 결과입니다. root@%와 root %localhost 계정이 있는것을 확인했습니다,
>   mysql> select host,user from user
        -> ;
    +-----------+------------------+
    | host      | user             |
    +-----------+------------------+
    | %         | root             |
    | localhost | healthchecker    |
    | localhost | mysql.infoschema |
    | localhost | mysql.session    |
    | localhost | mysql.sys        |
    | localhost | root             |
    +-----------+------------------+

$ mysql -h 127.0.0.1 -u root -P 3307 -p suic2
=> mysql
#접속이 잘 됩니다.

$ mysql -h localhost -u root -P 3307 -p suic
=> ERROR 1698 (28000): Access denied for user 'root'@'localhost'
# localhost로 접속요청을 하고 Root 비밀번호로 설정했던 suic를 입력해서 접속을 시도하면 접속이 되지 않습니다.

$ mysql -h localhost -u root -P 3307 -p suic2
=> ERROR 1698 (28000): Access denied for user 'root'@'localhost'
# localhost로 접속요청을 하고 % 호스트 비밀번호로 설정했던 suic2를 입력해서 접속을 시도해도 접속이 되지 않습니다.


```

```bash
*추가시도
찾아보니 리눅스는 localhost 도메인네임으로 접속요청을 할 경우 /etc/hosts의 내용을 참조해 변환한다는 내용을 발견했습니다. (출처는 남기지 못했습니다 ㅜㅜ) 

그래서 mysql1 컨테이너에 접속해 /etc/hosts를 확인해보았고, 127.0.0.1로 치환되도록 설정되어있는 것을 확인했습니다.
cat /etc/hosts       
127.0.0.1       localhost
::1     localhost ip6-localhost ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
172.17.0.2      b6108ed11aeb
```

# 문제1 파악 완료

제가 생각대로라면 localhost 주소를 통해 접속하면 도메인 네임이 치환되어 루프백 주소(127.0.0.1)로 치환되고, **mysql -h 127.0.0.1 -u root -P 3307 -p** 로 접속되어 똑같이 동작할 줄 알았습니다. 

답은 mysql 공식 문서에서 찾을 수 있었습니다.

https://dev.mysql.com/doc/refman/8.0/en/connecting.html

> - Unix에서 MySQL 프로그램 `localhost`은 다른 네트워크 기반 프로그램과 비교할 때 예상과 다른 방식으로 호스트 이름을 특별히 처리합니다 . 클라이언트는 Unix 소켓 파일을 사용하여 연결합니다. [`--socket`](https://dev.mysql.com/doc/refman/8.0/en/connection-options.html#option_general_socket) 옵션이나 `MYSQL_UNIX_PORT` 환경 변수는 소켓 이름을 지정할 수 있습니다.

도메인 치환과정을 거치는 것이 아니라 그냥 바로 명시된 포트로 로컬 접속을 시도하는 것이었습니다. docker의 container에 접속 요청을 하는게 아니라, docker가 설치된 linux os에 접속시도를 하는 것이었습니다.



### 문제2

nodejs의 ORM인 sequelize로 docker(mysql)에서 db를 생성하려하는데 로그인에 실패했다는 결과문구를 얻었습니다. 나중에는 성공했지만, 원인 파악이 안되고 있습니다.

관련된 파일와 시도 결과를 첨부합니다.

```js
// config.js : sequelize에서 mysql에 접속할 때 설정값을 확인하는 config.js 파일입니다.
...
require("dotenv").config();                                                                    
const env = process.env;                                                                         
const development = {                                                                           
  username: env.MYSQL_USERNAME,                                                                 
  password: env.MYSQL_PASSWORD,                                                                 
  database: env.MYSQL_DATABASE,                                                                   host: env.MYSQL_HOST,
  dialect: "mysql",                                                                         
  port: env.MYSQL_PORT || 3306                                                                   
};         
...
```

```js
// .env : config.js에서 참조하는 application용 설정값 파일입니다.
MYSQL_USERNAME=root
MYSQL_PASSWORD=suic
MYSQL_DATABASE=sfens
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3307
```

```js
// package.json : nodejs 의존성 파일입니다.
"dependencies": {
...
    "mysql": "^2.18.1",
    "mysql2": "^2.2.5",
...
    "sequelize": "^6.6.5",
    "sequelize-cli": "^6.2.0"
  }
```

```bash
# bash
$ sudo npx sequelize db:create
=> ERROR: Access denied for user 'root'@'172.17.0.1' (using password: YES)
# 왜 .env에서 127.0.0.1로 접속시도하도록 했는데 172.17.0.1로 접속시도하는지 모르겠습니다.
# 검색해보니 docker에서 사용하는 linux의 bridge와 관련된 내용인 것 같은데, 파악에 어려움을 겪고 있습니다.

```



### 다른시도

```js
// config.js
MYSQL_USERNAME=root
MYSQL_PASSWORD=suic2 // changed
MYSQL_DATABASE=sfens
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3307
```

```bash
# bash
$ sudo npx sequelize db:create
=>  Loaded configuration file "config/config.js".
    Using environment "development".
    Database sfens created.
#root@% 용 비밀번호로 설정한 suic2로 비밀번호를 변경했더니 생성에는 성공했습니다.
```



# 문제 2 파악 완료

docker의 컨테이너는 달리 설정하지 않으면 기본적으로 bridge 방식으로 설정됩니다.

bridge 로 설정해 생성하게 되면 docker host는 외부와 docker container간의 통신을 위해 ip를 하나 더 생성하고 이 ip를 통해 라우팅 역할을 하게됩니다. (ip addr show 명령어로 리눅스에 연결된 랜카드 주소들을 확인해봤더니 docker0이라는 이름에 172.17.0.1 ip가 하나 더 할당된 것을 확인할 수 있었습니다. 위의 에러에서 나타난 host입니다.) 원래 사용하던 os에서 [루프백주소]:[노출된 포트]로 접속요청을 보내면 **docker0으로 라우팅되어 컨테이너에 접속하게 됩니다.** 

 MySQL에서는 유저가 접속요청을 하면 '유저이름'@'접속요청한 호스트 ip'로 식별합니다. 저는 원래 127.0.0.1로 접속을 시도했기 때문에 'username'@127.0.0.1으로 접속된 줄 알았지만, **docker0으로 라우팅 과정**을 거쳤기 때문에  **'username'@'172.17.0.1'** 로 접속되었고, Mysql에는 'username'@'172.17.0.1'에 대한 접근권한이 설정되어 있지 않았기 때문에 접속할 수 없었습니다.