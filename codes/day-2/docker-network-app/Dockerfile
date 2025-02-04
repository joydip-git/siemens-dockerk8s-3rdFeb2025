FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY ./models/ ./models/
COPY ./app.js .

CMD ["node", "app.js"]