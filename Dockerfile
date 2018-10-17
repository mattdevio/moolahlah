FROM node:10.12-stretch
MAINTAINER mattdevio

WORKDIR /var/www

EXPOSE 3000

CMD npm install && npm start
