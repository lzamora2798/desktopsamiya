var mqtt = require('mqtt')
var client  = mqtt.connect([{ host: 'localhost', port: 1883 }])
var topic = "python/login"

function changeScreen() {
    console.log("cambio de pantalla")
    window.location.href = "index.html"
}

client.on('message',(topic,message)=>{ 
    message = JSON.parse(message.toString());
    console.log(message)
    if(message.flag){
        client.end()
        changeScreen()
    }
})
  
  client.on('connect',()=>{
    client.subscribe(topic)
    console.log("conectado")
  })
  