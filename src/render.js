var mqtt = require('mqtt')
const saveData = require('./filewriter.js');
const Buzzer = require('./buzzer.js');
const makePost = require('./postmaker.js');
var client  = mqtt.connect([{ host: 'localhost', port: 1883 }])
var host = 'broker.senscloud.io'
var port = 1883
var username = "rfid_samiya_test"
var pass  = "b4cGPbq3muEZSbvBPWOXUrgKwMU4c1"
var topic2 = '/api/rfid/'+username
const clientid = 'rfid_' + Math.random().toString(16).substr(2, 8)
var client2  = mqtt.connect({servers : [{ host: host, port: port}], username : username, password :pass ,clientId:clientid})
var topic = "python/weight"
var elem = document.getElementById('peso');
var modal = document.getElementById('infoModal');
var logoutmodal = document.getElementById('logoutModal');
var logoutform = document.getElementById('logoutform');
var pinInput = document.getElementById("pinInput") ;
var errorText = document.getElementById("errorText") ;
var pesoEN = document.getElementById('pesoEN');
var rfidEN = document.getElementById('rfidEN');
var adminrole = "SMY@DM1N.01";
var admin_flag= false;

let bandera_logout = false;
function onlogout(){
  bandera_logout = true;
  logoutmodal.classList.add("is-active");
}

function cancellogout(){
  bandera_logout = false;
  logoutmodal.classList.remove("is-active");
  logoutform.classList.add("logout");
  logoutform.style.visibility = "hidden"
}

function showlogout(){
  logoutform.classList.remove("logout");
  logoutform.style.visibility = "visible"
}

function gobacktoLogin(){
  client2.end();
  client.end();
}

function showmodal(message){
  modal.classList.add("is-active");
  pesoEN.textContent = message['SCALE']['weight'] + " " + message['SCALE']['units']
  rfidEN.textContent = message['RFID']['ID']
  setTimeout(function() {
    modal.classList.remove("is-active"); // se desactiva el modal despues de 3 seg
  }, 3000);

}

function stringPayload(message)
{ 
  var peso = { 
    weight:parseFloat(message['SCALE']['weight']),
    units:message['SCALE']['units'],
    id:message['RFID']['ID']
  }
  return JSON.stringify(peso);
}
client.on('message',(topic,message)=>{ // cuando llega el mensaje del mqtt local
  message = JSON.parse(message.toString());
  elem.textContent = message['SCALE']['weight'] + " " + message['SCALE']['units']; //change data in html
  var role = message['RFID']['ROLE'];
  var bandera = message['SEND']
  let card = message['RFID']
  if(card=="No Card"){ // solo hay role en admin
    admin_flag = true   
  }
  
    if(bandera_logout && admin_flag && role==adminrole){  
      gobacktoLogin();
    }
  
  else{   
    if (bandera && message['RFID']['ID'] && role != adminrole){ // garantiza que si exista el id 
      var payload = stringPayload(message);
      client2.publish(topic2, payload)
      showmodal(message);
    }
  }

  
})

client.on('connect',()=>{
  client.subscribe(topic)
  console.log("conectado")
  bandera_logout = false;
})

client2.on('connect',()=>{
  console.log("conectado senscloud")
})

client2.on('end',()=>{ //se llama 
  Buzzer.TurnBuzzer(1)
  setTimeout(function() {
    Buzzer.TurnBuzzer(0);
    bandera_logout = false;
    logoutmodal.classList.remove("is-active");
    window.location.href = "main.html"
  }, 300);
})

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
      gobacktoLogin()
    } 
    else if (pinInput.value === "0000"){
      gobacktoLogin()
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



