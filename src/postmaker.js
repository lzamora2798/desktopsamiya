'use strict';
const https = require('https')

const sendRequest = async (value) => {
const data = JSON.stringify({
    pin: value.toString()
})
 

const headers = {
        'Content-Type': 'application/json',
        'access-control-allow-methods': 'GET, POST, PUT, DELETE',
        'access-control-allow-headers': '*',
        'access-control-allow-origin': '*',   
}
    let p = new Promise((resolve, reject) => {
        fetch('https://backend.senscloud.io/api/pins/getpin', {
            method: 'POST',
            body: data,
            headers: headers
        }).then(res => res.json())
        .then(json => {
            console.log(json)
            resolve(json)
        }).catch(error=> resolve({success: false}));
    });

    return await p;
    
  };


exports.sendRequest = sendRequest;