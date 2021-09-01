var mqtt = require('mqtt')
const saveData = require('./filewriter.js');
var client  = mqtt.connect([{ host: 'localhost', port: 1883 }])
var host = 'broker.senscloud.io'
var port = 1883
var username = "HMI_samiya_test"
var pass  = "b4cGPbq3muEZSbvBPWOXUrgKwMU4c1"
var topic2 = '/api/devices/'+username
var client2  = mqtt.connect({servers : [{ host: host, port: port}], username : username, password :pass})
var topic = "python/weight"
var elem = document.getElementById('peso');

function stringPayload(message)
{ 
  var peso = { 
    peso:{ 
      value:message.peso
    }
  }
  return JSON.stringify(peso);
}
client.on('message',(topic,message)=>{ 
  message = JSON.parse(message.toString());
  //saveData(message)
  var payload = stringPayload(message);
  client2.publish(topic2, payload)
  elem.textContent = message.peso + " kg"; //change data in html
})

client.on('connect',()=>{
  client.subscribe(topic)
  console.log("conectado")
})

client2.on('connect',()=>{
  console.log("conectado2")
})





