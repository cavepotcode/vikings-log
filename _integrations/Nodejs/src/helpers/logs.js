const https = require('https');
const http = require('http');


exports.test = () => {
    return new Promise((resolve,rejects) => {
        const req = https.get('https://jsonplaceholder.typicode.com/todos/1',res => {
            res.on('data',data => {
                process.stdout.write(data);
                resolve(data)
            })
        })

        req.on('error',error => {
            rejects(error)
        })

        req.end()

    })
}

exports.registerlog = (object,level) => {
    try {


        const data = JSON.stringify(object)

        const options = {
            host: 'localhost',
            port: 8099,
            path: `/v1/logs/${level}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey':'b136e785-2cd5-48b6-bdd7-012d6af138bb'
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

