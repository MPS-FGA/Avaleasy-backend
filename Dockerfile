FROM node:10-alpine

WORKDIR /app

ADD package.json /app

RUN yarn install

ADD . /app

CMD ["yarn", "start"]