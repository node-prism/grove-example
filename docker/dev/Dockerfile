FROM node:16

RUN apt update && apt install -y rsync

RUN mkdir -p /usr/src/cache
WORKDIR /usr/src/cache

COPY package*.json .
RUN npm install

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
