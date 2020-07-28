# Vikings Log API
REST api 

# Table of Contents
* [Installation](#installation)
* [Migrations](#migrations)

## Instalations
Install the folowing dependencies globaly or use npx.
```
npm i -g typeorm
npm install -g ts-node
```

## Migrations
We are using typeorm for managing database. 
For more information about it [https://typeorm.io/](https://typeorm.io/)

### Create migrations
```
typeorm migration:create -n <migration_name>
```

### Run migrations
```
typeorm migration:run
```