FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY ./ ./

EXPOSE 4005
CMD [ "npm", "start" ]