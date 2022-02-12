module.exports=function(express,pool) {

  const apiRouter = express.Router();

  apiRouter.get('/', function (req, res) {
    res.json({message: 'Dobro dosli na nas API!'});
  });


  apiRouter.route('/leagues').get(async function (req, res) {

    try {

      let conn = await pool.getConnection();
      let rows = await conn.query('SELECT * FROM leagues');
      conn.release();
      res.json({status: 'OK', leagues: rows});

    } catch (e) {
      console.log(e);
      return res.json({"code": 100, "status": "Error with query"});

    }

  });
}
