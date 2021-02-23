FROM node:alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./package.json /usr/src/app
RUN npm i
RUN npm i nodemon -g
RUN npm i ts-node -g
RUN npm i typescript -node -g
COPY . /usr/src/app

CMD ["npm", "run", "dev"]
# CMD ["npm", "start"]