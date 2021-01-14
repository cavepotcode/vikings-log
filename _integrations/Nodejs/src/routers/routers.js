const http = require('http');
const url = require('url');


module.exports = http.createServer((req,res) => {
    var mainOps = require('../controllers/mainController')
    const reqUrl = url.parse(req.url,true);

    // POST endpoint
    if (reqUrl.pathname == '/main/info' && req.method === 'POST') {
        console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
        mainOps.info(req,res);
    }

    // POST endpoint
    if (reqUrl.pathname == '/main/warning' && req.method === 'POST') {
        console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
        mainOps.warning(req,res)
    }

    // POST endpoint
    if (reqUrl.pathname == '/main/error' && req.method === 'POST') {
        console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
        mainOps.error(req,res);
    }

})