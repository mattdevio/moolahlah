FROM node:carbon-jessie
MAINTAINER mattdevio

COPY ./package*.json /var/www/
WORKDIR /var/www

RUN npm install

COPY . /var/www/

EXPOSE 3000

CMD ["npm", "start"]
