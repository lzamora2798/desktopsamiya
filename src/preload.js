const {
    contextBridge,
    ipcRenderer
} = require("electron");
const mqtt = require('mqtt')
window.mqtt = mqtt
contextBridge.exposeInMainWorld(
    "api", {
        mqtt: mqtt
    }
);