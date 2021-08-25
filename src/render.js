var mqtt = require('mqtt')
var client  = mqtt.connect([{ host: 'localhost', port: 1883 }])
var topic = 'python/mqtt'
var elem = document.getElementById('peso');
console.log(client)

client.on('message',(topic,message)=>{
  message =message.toString();
  console.log(message);
  elem.textContent = message;
})

client.on('connect',()=>{
  client.subscribe(topic)
})