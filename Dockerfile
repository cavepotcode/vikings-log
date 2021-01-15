### STAGE 1: Build ###
FROM node:12.7-alpine AS build
WORKDIR /app
COPY api/ ./api/
COPY ui/ ./ui/
COPY package*.json ./

RUN npm i -g typescript && \
    npm i -g kiwi-server-cli && \
    npm i -g typeorm && \
    npm install -g @angular/cli@10.0.4 && \
    npm run install && \
    npm run compile && \
    npm run compile-ui-prod
COPY . .

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
WORKDIR /app
RUN apk add --no-cache --repository http://nl.alpinelinux.org/alpine/edge/main libuv \
    &&  apk add --update nodejs npm && \
    npm i -g forever 
COPY package*.json ./
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/api ./api
COPY --from=build /app/ui/dist/ui /usr/share/nginx/html
