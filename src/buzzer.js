'use strict';
const { exec } = require("child_process");

const TurnBuzzer =(value) =>{
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

exports.TurnBuzzer = TurnBuzzer;
