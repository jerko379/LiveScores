const express = require('express');
const mysql = require('mysql2/promise')
const bodyParser = require("body-parser");
const app = express();
const config = require('./config');
const morgan = require("morgan");
const pool = mysql.createPool(config.pool);
const api = require("./api");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(express.static(__dirname));

app.use(morgan('dev'));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \ Authorization');
  next();
});







apiRouter = api(express,pool);

app.use('/api', apiRouter);

app.get('*', function (req, res) {

  res.sendFile(path.join(__dirname,'index.html'));

});

let server = app.listen(config.port, function () {

  let port = server.address().port;
  console.log('Listening at http://localhost:'+port);

});
