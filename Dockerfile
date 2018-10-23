FROM node:10-alpine

RUN apk add --update python python-dev py2-pip autoconf automake g++ make --no-cache \
&& pip install py-bcrypt

WORKDIR /app

ADD package.json /app

RUN yarn install

ADD . /app

CMD ["yarn", "start"]
