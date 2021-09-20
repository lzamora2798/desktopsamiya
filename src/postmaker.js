'use strict';
const https = require('https')
const data = JSON.stringify({
    username: "administrador",
    password: "Administrador1"
})

const options = {
    hostname: 'localhost',
    port: 8000,
    path: 'users/signin',
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


module.exports = function (data) {

    req.write(data)
    req.end()
};