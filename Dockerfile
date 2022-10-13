FROM node:16 as builder
WORKDIR /
COPY . .
RUN npm install

EXPOSE 80
ENTRYPOINT npm start
