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
    db.run('CREATE TABLE Users (uname TEXT,password TEXT)');
    console.log('New table Users created!');
    
    db.run('CREATE TABLE Events (uname TEXT,DebutTime TEXT,FinTime TEXT,title TEXT,eventTxt TEXT)');
    console.log('New table Events created!');
    
    // insert default dreams
    db.serialize(function() {
      db.run('INSERT INTO Users (uname,password) VALUES ("a123456","123456"), ("honyu2018","hong2018"), ("bin2018","bin2018")');
    });
    
    db.serialize(function() {        "YYYY-MM-DD HH:MM:SS.SSS" 
      db.run('INSERT INTO Events (uname,DebutTime,FinTime,title,eventTxt) VALUES ("a123456","2018-5-28 01:30:00.000","2018-5-28 03:30:00.000","e1","i like it1"),("a123456","2018-5-29 05:00:00.000","2018-5-29 09:30:00.000","e2","i like it2"),("a123456","2018-5-30 09:30:00.000","2018-5-30 11:30:00.000","e3","i like it3")');
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
    
     console.log('Database "Events" ready to go!'); 
    //db.dropDatabase();
    db.each('SELECT * from Events', function(err, row) {
      if ( row ) {
        console.log('events:', row);
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

app.get('/listusers', function(request, response) {   // montrer la liste des utilisateurs
  db.all('SELECT * from Users', function(err, rows) {
    response.send(JSON.stringify(rows));
  });
});

app.get('/list', function(request, response) {  // montrer la liste des events
  db.all('SELECT * from Events', function(err, rows) {
    response.send(JSON.stringify(rows));
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
