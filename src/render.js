var mqtt = require('mqtt')
const saveData = require('./filewriter.js');
var client  = mqtt.connect([{ host: 'localhost', port: 1883 }])
var topic = "python/weight"
var elem = document.getElementById('peso');


client.on('message',(topic,message)=>{ 
  message = JSON.parse(message.toString());
  //saveData(message)
  elem.textContent = message.peso + " kg"; //change data in html
})

client.on('connect',()=>{
  client.subscribe(topic)
  console.log("conectado")
})






