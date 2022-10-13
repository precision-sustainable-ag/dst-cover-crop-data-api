FROM node:16

WORKDIR /express

COPY . .

RUN npm ci --only=production

EXPOSE 3000

ENTRYPOINT ["npm","start"]