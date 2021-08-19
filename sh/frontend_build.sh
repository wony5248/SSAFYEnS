#!/bin/bash
NGINX_PORT=80

SHALL_PATH=$(dirname $(realpath $0))

echo cd &&
cd "$SHALL_PATH/../frontend"&&

echo git: pull origin from develop &&
git pull origin develop &&

echo react: remove exist build file at $SHALL_PATH &&
rm -rf  ./build &&

echo nginx: build file &&
npm run build &&

echo nginx: remove exist container, image &&
sudo docker stop sfens-nginx 
sudo docker rm sfens-nginx 
sudo docker rmi sfens-nginx 

echo nginx: build &&
docker build -t sfens-nginx . &&

echo nginx: run &&
docker run -d --name sfens-nginx -p $NGINX_PORT:80 sfens-nginx 
