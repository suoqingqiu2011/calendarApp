// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// init sqlite db
var fs = require('fs');
var dbFile = './.data/sqlite.db';
var exists = fs.existsSync(dbFile);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbFile);

// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
db.serialize(function(){
  if (!exists) {
    db.run('CREATE TABLE Users (name TEXT)');
    console.log('New table Users created!');
    
    // insert default dreams
    db.serialize(function() {
      db.run('INSERT INTO Users (name) VALUES ("a123456"), ("honyu"), ("bin")');
    });
  }
  else {
    console.log('Database "Users" ready to go!'); 
    //db.dropDatabase();
    db.each('SELECT * from Users', function(err, row) {
      if ( row ) {
        console.log('users:', row);
      }
    });
  }
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.get("/login", function (request, response) {
  response.sendFile(__dirname + '/login.html');
});

app.get("/signin", function (request, response) {
  response.sendFile(__dirname + '/signin.html');
});

app.get("/logout", function (request, response) {
  response.sendFile(__dirname + '/index.html');
});


// endpoint to get all the dreams in the database
// currently this is the only endpoint, ie. adding dreams won't update the database
// read the sqlite3 module docs and try to add your own! https://www.npmjs.com/package/sqlite3
app.get('/getDreams', function(request, response) {
  db.all('SELECT * from Dreams', function(err, rows) {
    response.send(JSON.stringify(rows));
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
