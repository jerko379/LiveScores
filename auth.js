
module.exports=function(express, pool) {
  const salt = 'abcdefghi1874/87891'
  const crypto = require('crypto');
  let authRouter = express.Router();

  authRouter.post('/login', async function(req,res){
    try {

      //console.log(req.body);

      let conn = await pool.getConnection();
      let rows = await conn.query('SELECT * FROM users WHERE username=?', req.body.username);
      conn.release();

      //console.log(typeof req.body.password)
      //console.log(typeof rows[0])
      //console.log(rows[0][0]['password']);

      //if (rows.length>0 && rows[0][0].password==req.body.password){
      let compare = false;
      if (rows.length > 0) {
        let hash = crypto.pbkdf2Sync(req.body.password, salt, 10000, 64, 'sha512');
        compare = hash.toString('hex') == rows[0][0].password;
        if (compare) {
          res.json({status: 'OK', user: rows[0]});
        } else {
          res.json({status: 'NOT OK', description: 'Password doesnt match'})
        }
      } else {

        res.json({status: 'NOT OK', description: 'Username  doesnt exist'});

      }
    }catch (e){

      console.log(e);
      return res.json({"code" : 100, "status" : "Error with query"});

    }
  });


  authRouter.post('/register', async function(req,res){
    //console.log(req.body.noviUser);
    const nuser=req.body.noviUser;
    let password = nuser.password;
    let hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString(`hex`);
    console.log(hash)
    console.log(password)
    const user = {
      username:nuser.username,
      name : nuser.name,
      surname: nuser.surname,
      email: nuser.email,
      password:hash
    }
    //console.log(user)

    try {

      let conn = await pool.getConnection();
      let q = await conn.query('INSERT INTO users SET ?', user);
      conn.release();
      res.json({ status: 'OK', insertId:q.insertId });

    } catch (e){
      //console.log(e);
      res.json({ status: 'NOT OK' });
    }



  })


  return authRouter;
}



