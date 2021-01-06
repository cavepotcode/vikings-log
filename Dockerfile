FROM node:latest

WORKDIR /app
COPY api/ ./api/
COPY ui/ ./ui/
COPY package*.json ./

RUN npm i -g typescript && \
 npm i -g kiwi-server-cli && \
 npm i -g typeorm && npm install -g @angular/cli && npm run install && npm run compile && npm i -g forever
 
RUN apt update && apt install nano && apt install telnet
# RUN migrations
# RUN npm run migrate_run

EXPOSE 4200

#CMD cd api && forever start dist/default/src/server.js && cd .. && cd ui && npm run startdocker 
