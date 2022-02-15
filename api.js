module.exports =function(express,pool){

  const apiRouter = express.Router();

  apiRouter.get('/', function (req, res) {

    res.sendFile(path.join(__dirname,'index.html'));

  });

  apiRouter.get('/leagues', async function (req,res){

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

  apiRouter.get('/fixtures/:idLeague', async function (req,res){

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

  }).delete('/fixtures/:idFixture', async function(req,res) {

    try {

      let conn = await pool.getConnection();
      let q = await conn.query('DELETE FROM fixtures WHERE idFixture = ?', req.params.idFixture);
      conn.release();
      res.json({ status: 'OK', affectedRows :q.affectedRows });

    } catch (e){
      res.json({ status: 'NOT OK' });
    }
  });

  apiRouter.put('/fixtures/',async function(req,res){

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

  apiRouter.get('/countries', async function (req,res){

    try {

      let conn = await pool.getConnection();
      let rows = await conn.query('SELECT * from countries ORDER BY code');
      conn.release();
      res.json({ status: 'OK', countries:rows });

    } catch (e){
      console.log(e);
      return res.json({"code" : 100, "status" : "Error with query"});

    }

  });

  apiRouter.delete('/countries/:codeCountry', async function(req,res) {

    try {

      let conn = await pool.getConnection();
      let q = await conn.query('DELETE FROM countries WHERE code = ?', req.params.codeCountry);
      conn.release();
      res.json({ status: 'OK', affectedRows :q.affectedRows });

    } catch (e){
      console.log(e)
      res.json({ status: 'NOT OK' });
    }
  });


  return apiRouter;
}

