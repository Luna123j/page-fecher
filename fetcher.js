const fs = require('fs');
const readline = require('readline');
const getWeb = process.argv.slice(2);
const request = require('request');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



const writeIntoFile = function(name, body) {

  fs.writeFile(`./${name}.txt`, body, error => {
    if (error) printOutMessage("Error");
    if (!error) {
      fs.stat(`./body.txt`, (err, stat) => {
        if (error) console.log("Error");
        if (!error)
          printOutMessage(`Downloaded and saved ${stat.size} bytes to ./index.html`);
      });
    }
  });

};

request(getWeb[0], (error, response, body) => {
  console.log('error:', error);
  console.log('statusCode:', response && response.statusCode);
  rl.question("Create a file name: ", (name) => {
    if (fs.existsSync(`./${name}.txt`)) {
      rl.question(" File already exist. Do you want to overwrite? /y  ", (answer) => {
        if (answer === "y") {
          writeIntoFile(name, body);
          rl.close();
        } else {
          console.log("cancelled");
          rl.close();
        }
      });
    } else {
      writeIntoFile(name, body);
      rl.close();
    }

  });
});

const printOutMessage = message => {
  console.log(message); // => print out details correctly.
};