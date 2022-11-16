FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY ./ ./

EXPOSE 5100
CMD [ "npm", "dev" ]