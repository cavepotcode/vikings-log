# Vikings Log

Tool for managing centralized log.
# <img src="log.png" alt="logo">


# Table of Contents
* [Installation](#installation)
* [REST Services](#rest-services)

## Instalations
Install the folowing dependencies globaly
```
npm i -g typescript
npm i -g kiwi-server-cli
npm i -g typeorm
```

Comand to install all node_modules dependencies of ui and api.
Also commando to trasnpile the api code.
```
npm run install
npm run compile
```

### Run Migrations
```
npm run migrate_run
```

## REST Services
Bellow you can see the available services
* POST `/log/info` (creates a log entry with info level) [message, stacktrace]
* POST `/log/warning` (creates a log entry with warining level) [message, stacktrace]
* POST `/log/error` (creates a log entry with error level) [message, stacktrace]

Every services needs to send the apikey of the client on the http headers

### Docker
```
docker build -t vikingslog -f Dockerfile . 
docker-compose up server
docker-compose up migrate
```

#### Docker push images
```
docker tag vikingslog public.ecr.aws/a4v3h0f0/vikingslog:v1
docker push public.ecr.aws/a4v3h0f0/vikingslog:v1
```

### Fargate
```
aws ecs run-task --launch-type FARGATE --cluster vikings-log --task-definition Migrations --network-configuration "awsvpcConfiguration={subnets=[subnet-7b90921e],securityGroups=[sg-01acd29184121e7b5],assignPublicIp=ENABLED}" --region sa-east-1
```
