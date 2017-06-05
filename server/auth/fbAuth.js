const db = require('../controllers.js');
const jwt = require('jwt-simple');
const dbconfig = require('../db/db-config.js');
const secret = process.env.tokenSecret ? process.env.tokenSecret : require('../config.js').tokenSecret;

module.exports = (req, res) => {

  console.log('fb req.body.id', req.body.id)
  db.retrieve(`select * from users where users.facebook_id = "${req.body.id}"`) //
  .then(rows => {
    console.log('rows', rows[0].id)
    if (!rows.length) {
      let newUser = {
        //later replace username with chosen username
        facebook_id: req.body.id,
        username: req.body.name,
        email: req.body.email,
        facebook_name: req.body.name,
        photo: req.body.picture.data.url,
      };
      console.log('New FB User to be created:', newUser);
      db.create(newUser, 'users')
      .then(user => {
        newUser.id = user.insertId;
        db.getUserData(newUser.id)
        .then(data => {
          let token = jwt.encode(data, secret);  // rows obj right thing here?
          data.token = token;
          console.log('FBlogin senddata', data)
          res.status(200).json(data)
        })
      })
    } else {
      db.getUserData(rows[0].id)
      .then(data => {
        console.log(data);
        console.log('secret', secret);
        let token = jwt.encode(data, secret);
        data.token = token;
        console.log('FBlogin senddata', data)
        res.status(200).json(data)
      })
    }
  })
  .catch(err =>{
    console.error('Login Error', err);
    res.status(403).json(err);
  })
}