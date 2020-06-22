ARG deploy_env='dev'

FROM node:10-alpine

RUN apk add yarn

WORKDIR /

EXPOSE 8080

COPY package.json .

RUN yarn

ARG deploy_env

ENV DEPLOY_ENV ${deploy_env}

COPY . .

CMD ["yarn", "prod:docker"]