FROM node:carbon-jessie
MAINTAINER mattdevio

WORKDIR /var/www

EXPOSE 3000

CMD npm install && npm start
