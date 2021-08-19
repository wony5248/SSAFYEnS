#!/bin/bash
MARIADB_PORT=3308
MARIADB_VERSION=10.3
HTTP_PORT=80

SHELL_PATH=$(dirname $(realpath $0))

echo docker pull mariadb/server $MARIADB_VERSION 
sudo docker pull mariadb/server:$MARIADB_VERSION &&

echo remove mariadb
sudo docker stop sfens-mariadb
sudo docker rm sfens-mariadb
sudo docker 

echo run mariaDB image... &&
docker run -p $MARIADB_PORT:3306  --name sfens-mariadb -e MARIADB_ROOT_PASSWORD=rlathdgus -d mariadb/server:$MARIADB_VERSION &&
  


