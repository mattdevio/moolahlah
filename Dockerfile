FROM node:carbon-jessie
MAINTAINER mattdevio

WORKDIR /var/www

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
