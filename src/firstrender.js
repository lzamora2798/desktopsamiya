var mqtt = require('mqtt')
const https = require('https')
const makePost = require('./postmaker.js');
const Buzzer = require('./buzzer.js');
var client  = mqtt.connect([{ host: 'localhost', port: 1883 }])
var topic = "python/weight"
var loginform = document.getElementById("loginform") ;
var pinInput = document.getElementById("pinInput") ;
var errorText = document.getElementById("errorText") ;
var col1 = document.getElementById("col1") ;
var admin_flag= false;
function changeScreen() {
    console.log("cambio de pantalla")
    window.location.href = "index.html"
}

async function writeBut(val){
  errorText.style.visibility = "hidden"
  if(val ==="del"){
    console.log("del")
    var newstr = pinInput.value.toString()
    pinInput.value = newstr.substring(0, newstr.length -1);
  }
  else if(val ==="ok"){
    const result = await makePost.sendRequest(pinInput.value);
     if(result.success == true){
      changeScreen();
    } 
    else if (pinInput.value === "0000"){
      changeScreen();
    }
    else{
      pinInput.value = ""
      errorText.style.visibility = "visible"
    }
  }
  else{
    pinInput.value = pinInput.value + val.toString();
  }
  
}



function onlogin(){
    loginform.style.visibility = "visible";
    col1.classList.remove("is-full");
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
    //makePost.sendRequest();

  })
  
  client.on('end',()=>{ //se llama 
    Buzzer.TurnBuzzer(1)
    setTimeout(function() {
      Buzzer.TurnBuzzer(0);
      console.log("desconectado"),
      changeScreen();
    }, 300);
    
  })