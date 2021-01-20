require('dotenv').config();
const http = require('http');

exports.registerlog = (object,level) => {
    try {
        const myUrl = new URL(process.env.API_LOGS_URL);

        const options = {
            host: myUrl.hostname,
            port: myUrl.port,
            path: myUrl.pathname + `${level}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': `${process.env.API_LOGS_KEY}`
            }
        }
        return new Promise((resolve,rejects) => {
            const req = http.request(options,res => {
                console.log(`statusCode: ${res.statusCode}`)

                res.on('data',d => {
                    process.stdout.write(d)
                    resolve(d)
                })
            })

            req.on('error',error => {
                console.error(error)
                rejects(error)
            })

            req.write(JSON.stringify(object))

            req.end()
        })
    } catch (error) {
        console.log(error)
    }
}

