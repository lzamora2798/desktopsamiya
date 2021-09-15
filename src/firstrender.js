var mqtt = require('mqtt')
var client  = mqtt.connect([{ host: 'localhost', port: 1883 }])
var topic = "python/weight"
var loginform = document.getElementById("loginform") ;

function changeScreen() {
    console.log("cambio de pantalla")
    window.location.href = "index.html"
}

function onlogin(){
  
    loginform.style.visibility = "visible";
}

client.on('message',(topic,message)=>{ 
    message = JSON.parse(message.toString());
    role = message['RFID']['ROLE']
    console.log(role)
    if(role=="SMY@DM1N.01"){ // solo hay role en admin
        client.end()
       
        
    }
})
  
  client.on('connect',()=>{
    client.subscribe(topic)
    console.log("conectado")
  })
  
  client.on('end',()=>{ //se llama 
    console.log("desconectado")
    changeScreen()
  })