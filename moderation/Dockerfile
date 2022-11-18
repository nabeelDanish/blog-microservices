FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY ./ ./

EXPOSE 4004
CMD [ "npm", "start" ]