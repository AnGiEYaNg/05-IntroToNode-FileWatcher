// console.log("Node starting...");
// var fs = require('fs');
// // console.log(fs);
// console.log(fs.readFileSync('./file1.txt').toString());

// var greeter = require('./greeter');
// // console.log(greeter);

// greeter.greet('Ang');
// greeter.shout('Ang');

var buffer = '';
var fs = require('fs');
fs.readFile('./file1.txt', function(err, data) {
     buffer = data.toString();  // buffer object
     console.log(buffer);
});
