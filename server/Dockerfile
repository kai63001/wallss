FROM node:alpine

RUN mkdir -p /usr/src/app/server
WORKDIR /usr/src/app/server
COPY ./package.json /usr/src/app/server
RUN npm i
RUN npm i nodemon -g
RUN npm i ts-node -g
RUN npm i typescript -node -g
COPY . /usr/src/app/server

CMD ["npm", "run", "dev"]
# CMD ["npm", "start"]