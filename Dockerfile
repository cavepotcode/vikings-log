FROM node:8

WORKDIR /app
COPY api/ ./api/
COPY ui/ ./ui/
COPY package*.json ./

RUN npm i -g typescript && npm i -g kiwi-server-cli && npm i -g typeorm  && npm run install && npm run compile

# RUN migrations
# RUN npm run migrate_run

EXPOSE 4200

CMD node api/dist/default/src/server.js
