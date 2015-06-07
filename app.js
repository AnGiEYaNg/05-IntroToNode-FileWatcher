//Answer
var fs = require('fs');
var express = require('express');
var logger = require('morgan');
var async = require('async');

// take a list of files from the command line.
// now we can watch three files using:
// node app.js file1.js file2.js file3.js
//console.log(process.argv);
var filenames = process.argv.slice(2);
console.log(filenames);

// create the express app
var app = express();

app.set('view engine', 'ejs');

// connect the Morgan logging middleware to our app
app.use( logger('dev') );

// start a server listening on port 1234
app.listen( 1234 );

// when someone requests http://localhost:1234/, run the callback
// function listed here and respond with the data
// we call this the "/" (or "Root") route.
app.get("/", function(request, response) {

    async.map(filenames, function (filename, done) {
        fs.readFile(filename, function (err, contents) {
            var transformedData = {
                id: filename.replace(/[^0-9]/ig, ""),
                data: contents.toString(),
                filename: filename
            };
            done(err, transformedData);
        });
    }, function (err, arrayOfFileData) {
        response.render('mainView', { files: arrayOfFileData });
    });

});

/*// console.log(process.argv);


// for(var i = 2; i < process.argv.length; i++) {
//     console.log(process.argv[i]);
// }

//console.log("Node starting...");
// var buffer = '';
// var fs = require('fs');
// fs.readFile('./file1.txt', function(err, data) {
//      buffer = data.toString();  // buffer object
//      console.log(buffer);
// });
 
 
// fs.watchFile('./file1.txt', {interval:10}, function(prev, curr) {
//   console.log('updated file');
//   fs.readFile('./file1.txt', function(err, data) {
//      buffer = data.toString();  // buffer object
//      console.log(buffer);
//   // display an update was made, then console.log the new updated file!
// });  
// });


var async = require('async');
var fs = require('fs');
var express = require('express');
var logger = require('morgan');
var ejs = require('ejs');
var mainView = require('./views/mainView');
// take a list of files from the command line.
// now we can watch three files using:
// node app.js file1.js file2.js file3.js
var filenames = Array.prototype.slice.call(process.argv, 2);
console.log(filenames);


// create the express app
var app = express();

// connect the Morgan logging middleware to our app
app.use( logger('dev') );

// start a server listening on port 1234
app.listen( 1234 );

// when someone requests http://localhost:1234/, run the callback
// function listed here and respond with the data
// we call this the "/" (or "Root") route.

app.set('view engine', 'ejs');


// app.get("/", function(request, response) {
//     async.map(filenames, function(path,done) {
//         fs.readFile(path, function(err, contents) {
//             done(err,contents);
//         });
//     }, function (err, contentsOfAllFiles) {
//         response.render( 'mainView', { files: results} );

//         //response.send('<pre>' + contentsOfAllFiles.join("\n\n").toString() + '</pre>');
//     });
// });

app.get('/', function (request, response) {
  var mapFilenamesToContent = function(path,done) {
        fs.readFile(path, function(err, contents) {
            fileObj = { id: path.replace(/[^0-9]/ig, ""),
                  data: contents.toString(),
                  filename: path
                }
            done(err,fileObj);
        });

  };

  async.map(filenames, mapFilenamesToContent, function (err, results) {
    if (err) console.log('async.map error:', err);
    response.render( 'mainView', { files: results} );
  });
});


// { id: filename.replace(/[^0-9]/ig, ""),
//   data: data.toString(),
//   filename: filename
// }
*/