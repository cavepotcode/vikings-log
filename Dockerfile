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
    npm i -g forever && \
    npm run compile-ui
COPY . .

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
WORKDIR /app
COPY package*.json ./
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/api/dist ./api/dist
COPY --from=build /app/ui/dist/ui /usr/share/nginx/html
