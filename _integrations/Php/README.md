#PHP Implementation

## Include in /src/Configs/appSettings.
```
{
    "logs":{
        "apiKey":"***",
        "logurl":"http://localhost/v1/logs/",
        "type":"php"
    }
}
```

### Run
```
php -S localhost:8000
```

### Endpoints

* POST /main/warning
* POST /main/info
* POST /main/error


