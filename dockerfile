FROM node:16

WORKDIR /express

COPY ./src .
COPY .env .

RUN npm ci --only=production

EXPOSE 80

ENTRYPOINT ["npm","start"]