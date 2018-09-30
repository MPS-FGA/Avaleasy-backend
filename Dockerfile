FROM node:10-alpine

WORKDIR /app

ADD package.json /app

RUN yarn install

RUN apk add --update python python-dev py-pip

ADD . /app

CMD ["yarn", "start"]
CMD ["yarn", "nodemon"]
