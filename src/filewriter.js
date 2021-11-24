'use strict';
const fs = require('fs');
var backup_dir = '/tmp/filebackup.json'

fs.access(backup_dir, fs.F_OK, (err) => {
  if (err) {
  let newData = {
    "data": []
  }
  const finished = (error) => {
    if (error) {
      return;
    }
  }
  const jsonData = JSON.stringify(newData, null, 2)
  fs.writeFile(backup_dir, jsonData, finished)
  }

})

module.exports = function (data) {
  let alldata = JSON.parse(fs.readFileSync(backup_dir));
  const finished = (error) => {
    if (error) {
      console.error(error)
      return;
    }
  }
  alldata.data.push(data)
  const jsonData = JSON.stringify(alldata, null, 2)
  fs.writeFile(backup_dir, jsonData, finished)

};