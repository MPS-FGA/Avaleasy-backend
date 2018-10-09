FROM node:10-alpine

RUN apk add --update python python-dev py-pip

WORKDIR /app

ADD package.json /app

RUN yarn install

ADD . /app

CMD ["yarn", "start"]
