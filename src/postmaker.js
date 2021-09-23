'use strict';
const https = require('https')

const sendRequest = async (value) => {
const data = JSON.stringify({
    pin: value.toString()
})
 

const options = {
    hostname: 'backend.senscloud.io',
    port: 443,
    path: '/api/pins/getpin',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'access-control-allow-methods': 'GET, POST, PUT, DELETE',
        'access-control-allow-headers': '*',
        'access-control-allow-origin': '*',
    }
}
    let p = new Promise((resolve, reject) => {
        const req = https.request(options, res => {
            res.setEncoding('utf8');
            let responseBody = '';

            res.on('data', (chunk) => {
                responseBody += chunk;
            });
            res.on('end', () => {
                resolve(JSON.parse(responseBody));
            });

        })
        req.on('error', error => {
            console.error(error)
        })
        req.write(data)
        req.end()
        
    });

return await p;
    
    
  };


exports.sendRequest = sendRequest;