FROM node:16

WORKDIR /express

COPY ./src ./src
COPY .env .

RUN npm ci --only=production

EXPOSE 3000

ENTRYPOINT ["npm","start"]