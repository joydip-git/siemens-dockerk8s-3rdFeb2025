FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY feedback/ ./feedback/
COPY pages/ ./pages/
COPY public/ ./public/
COPY ./temp/ ./temp/
COPY server.js .

# ENV PORT=3001
#documentation (does not expose this port of docker containerized app to the outside of the container)
# EXPOSE ${PORT}

CMD [ "node","server.js" ]
