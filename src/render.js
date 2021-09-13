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
var modal = document.getElementById('infoModal');
var pesoEN = document.getElementById('pesoEN');
var rfidEN = document.getElementById('rfidEN');

function onlogout(){
  console.log("cambio de pantalla")
  window.location.href = "main.html"
}

function showmodal(message){
  modal.classList.add("is-active");
  pesoEN.textContent = message.peso + " kg"
  rfidEN.textContent = message.rfid
  setTimeout(function() {
    modal.classList.remove("is-active"); // se desactiva el modal despues de 3 seg
  }, 3000);

}

function stringPayload(message)
{ 
  var peso = { 
    peso:{ 
      value:message.peso
    },
    rfid:{ 
      value:message.rfid
    }
  }
  return JSON.stringify(peso);
}
client.on('message',(topic,message)=>{ // cuando llega el mensaje del mqtt local
  message = JSON.parse(message.toString());
  console.log(message)
  elem.textContent = message.peso + " kg"; //change data in html
  if (message.flag){ 
    var payload = stringPayload(message);
    client2.publish(topic2, payload)
    showmodal(message);
  }
})

client.on('connect',()=>{
  client.subscribe(topic)
  console.log("conectado")
})

client2.on('connect',()=>{
  console.log("conectado2")
})





