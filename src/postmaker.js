'use strict';
const https = require('https')

const sendRequest = () => {
const data = JSON.stringify({
    username: "administrador",
    password: "Administrador1"
})

const options = {
    hostname: 'backend.senscloud.io',
    port: 443,
    path: '/api/users/signin/',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'access-control-allow-methods': 'GET, POST, PUT, DELETE',
        'access-control-allow-headers': '*',
        'access-control-allow-origin': '*',
    }
}

    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)
    
        res.on('data', d => {
            process.stdout.write(d)
        })
    }) 
    req.on('error', error => {
        console.error(error)
    })
    req.write(data)
    req.end()
    console.log("wokrin")
  };


exports.sendRequest = sendRequest;