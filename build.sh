#!/bin/bash

echo cd 
cd S05P13A109/frontend/
echo stop
sudo docker stop sfens-nginx
echo rm
sudo docker rm sfens-nginx
echo rmi
sudo docker rmi sfens-nginx
echo pull
git pull origin develop
echo build delete
rm -rf  ./build
echo build
npm run build
echo build
docker build -t sfens-nginx .
echo run
docker run -d --name sfens-nginx -p 80:80 sfens-nginx
