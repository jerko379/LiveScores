const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise')
const bodyParser = require("body-parser");
const app = express();
const config = require('./config');
const mainRouter = express.Router();
const morgan = require("morgan");
const pool = mysql.createPool(config.pool);

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


mainRouter.get('/', function (req, res) {

  res.sendFile(path.join(__dirname,'index.html'));

});

mainRouter.get('/api/leagues', async function (req,res){

  try {

    let conn = await pool.getConnection();
    let rows = await conn.query('SELECT leagues.* , countries.name as countryName, countries.flag as countryFlag FROM leagues JOIN countries on countries.code=leagues.codeCountry ORDER BY codeCountry');
    conn.release();
    res.json({ status: 'OK', leagues:rows });

  } catch (e){
    console.log(e);
    return res.json({"code" : 100, "status" : "Error with query"});

  }

});

mainRouter.get('/api/fixtures/:idLeague', async function (req,res){

  try {

    let conn = await pool.getConnection();
    console.log(req.params.ididLeague)
    let rows = await conn.query("SELECT fixtures.* , ah.name as nameHome, ac.name nameAway FROM fixtures JOIN clubs  ac ON ac.idClub = fixtures.idAway JOIN clubs  ah ON ah.idClub = fixtures.idHome WHERE fixtures.idLeague = ? ORDER BY dateTime  ",req.params.idLeague);
    conn.release();
    res.json({ status: 'OK', fixtures:rows });

  } catch (e){
    console.log(e);
    return res.json({"code" : 100, "status" : "Error with query"});

  }

}).delete('/api/fixtures/:idFixture', async function(req,res) {

  try {

    let conn = await pool.getConnection();
    let q = await conn.query('DELETE FROM fixtures WHERE idFixture = ?', req.params.idFixture);
    conn.release();
    res.json({ status: 'OK', affectedRows :q.affectedRows });

  } catch (e){
    res.json({ status: 'NOT OK' });
  }
});

mainRouter.put('/api/fixtures/',async function(req,res){

  const fixture =
  {
    shortStatus:'SUSP',
    longStatus:'Match Invalidated'
  }


  try {
    console.log(req.body.idFixture)
    let conn = await pool.getConnection();
    let q = await conn.query("UPDATE fixtures SET ? WHERE idFixture = ? ", [fixture, req.body.idFixture]);
    conn.release();
    res.json({ status: 'OK', changedRows:q.changedRows });
    console.log(q);

  } catch (e){
    console.log(e)
    res.json({ status: 'NOT OK' });
  }

})



app.use('/', mainRouter);

let server = app.listen(config.port, function () {

  let port = server.address().port;
  console.log('Listening at http://localhost:'+port);

});
