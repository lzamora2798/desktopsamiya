var mqtt = require('mqtt')
const { exec } = require("child_process");
const https = require('https')
const makePost = require('./postmaker.js');

var client  = mqtt.connect([{ host: 'localhost', port: 1883 }])
var topic = "python/weight"
var loginform = document.getElementById("loginform") ;
var admin_flag= false;
function changeScreen() {
    console.log("cambio de pantalla")
    window.location.href = "index.html"
}

function TurnBuzzer(value){
  exec(`echo ${value} > /dev/buzzer`, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});
  
}

function activeNoise(){
  TurnBuzzer(1)
  setTimeout(function() {
    TurnBuzzer(0)
  }, 1000);

}

function onlogin(){
  
    loginform.style.visibility = "visible";
}

client.on('message',(topic,message)=>{ 
    message = JSON.parse(message.toString());
    role = message['RFID']['ROLE']
    card = message['RFID']
    if(card=="No Card"){ // solo hay role en admin
      admin_flag = true   
    }

    if(admin_flag && role=="SMY@DM1N.01"){ // solo hay role en admin
        client.end()    
    }
})
  
  client.on('connect',()=>{
    admin_flag = false;
    client.subscribe(topic)
    console.log("conectado")
    makePost();
  })
  
  client.on('end',()=>{ //se llama 
    activeNoise();
    console.log("desconectado")
    changeScreen()
  })