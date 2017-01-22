FROM node:6.9.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run compile

EXPOSE 5000

CMD npm run migrate && npm start