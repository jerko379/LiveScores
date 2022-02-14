const express = require('express');
const path = require('path');
const mysql = require('promise-mysql');
const bodyParser = require("body-parser");
const app = express();
const mainRouter = express.Router();

let connection;

async function init() {

  connection = await mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'jerko379',
    database : 'scores'
  });

}

init();
app.use(express.static(__dirname));


app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \ Authorization');
  next();
});


mainRouter.get('/', function (req, res) {

  res.sendFile(path.join(__dirname,'index.html'));

});

mainRouter.get('/leagues', async function (req,res){

  let rows = await connection.query('SELECT * FROM leagues');
  res.send(rows);

});



app.use('/', mainRouter);

let server = app.listen(8081, function () {

  let port = server.address().port;
  console.log(`Listening at http://localhost:${port}`);

});
