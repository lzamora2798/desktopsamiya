
var mqtt = require('mqtt')
//const checkFile = require('./createFile.js');
//checkFile();
const saveData = require('./filewriter.js');
var client  = mqtt.connect([{ host: 'localhost', port: 1883 }])
var topic = 'python/mqtt'
var elem = document.getElementById('peso');


client.on('message',(topic,message)=>{ 
  message = JSON.parse(message.toString());
  saveData(message)
  elem.textContent = message.peso; //change data in html
})

client.on('connect',()=>{
  client.subscribe(topic)
})






