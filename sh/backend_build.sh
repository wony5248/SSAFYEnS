#!/bin/bash
MARIADB_PORT=3308
MARIADB_VERSION=10.3
HTTP_PORT=80

SHELL_PATH=$(dirname $(realpath $0))

echo docker pull mariadb/server $MARIADB_VERSION 
sudo docker pull mariadb/server:$MARIADB_VERSION &&


echo run mariaDB image... &&
docker run -p $MARIADB_PORT:3306  --name sfens-mariadb -e MARIADB_ROOT_PASSWORD=rlathdgus -d mariadb/server:$MARIADB_VERSION &&
  
echo cd ...&&
cd S05P13A109/frontend/&&

echo build delete...&&
rm -rf  ./build&&

echo build...&&
npm run build &&

echo build... &&
docker build -t sfens-nginx . &&

echo run... &&
docker run -d --name sfens-nginx -p $HTTP_PORT:80 sfens-nginx 
