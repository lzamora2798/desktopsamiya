'use strict';
const fs = require('fs');
var backup_dir = '/etc/filebackup.json'

module.exports = function () {
    try {
        if (fs.existsSync(backup_dir)) {
          console.log("existe")
        }
      } catch (err) {
        console.log(" no existe")
        let newData = {
          "data": []
        }
        const finished = (error) => {
          if (error) {
            console.error(error)
            return;
          }
        }
        console.log("no existe")
        const jsonData = JSON.stringify(newData, null, 2)
        fs.writeFile(backup_dir, jsonData, finished)
      
      }
};