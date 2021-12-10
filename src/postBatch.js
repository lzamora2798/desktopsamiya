'use strict';
const https = require('https')

const sendRequest = async () => {

 

const headers = {
        'Content-Type': 'application/json',
        'access-control-allow-methods': 'GET, POST, PUT, DELETE',
        'access-control-allow-headers': '*',
        'access-control-allow-origin': '*', 
        'access-token':'877f21428132a6c9f3d55bb8163fcb24'  
}
    let p = new Promise((resolve, reject) => {
        fetch('https://backend.senscloud.io/api/scale/batch', {
            method: 'GET',
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