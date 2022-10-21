FROM node:16-alpine

WORKDIR /usr/local/apps/app

COPY . .

RUN npm ci

EXPOSE ${PORT}

ENTRYPOINT ["npm","start"]