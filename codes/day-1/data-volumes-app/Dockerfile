FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY feedback/ ./feedback/
COPY pages/ ./pages/
COPY public/ ./public/
COPY ./temp/ ./temp/
COPY .env   .
COPY server.js .

#documentation (does not expose this port of docker containerized app to the outside of the container)
EXPOSE 3001
CMD [ "node","server.js" ]
