const db = require('../controllers.js');
const jwt = require('jwt-simple');
const dbconfig = require('../db/db-config.js');
const bcrypt = require('bcrypt-nodejs');
const secret = process.env.tokenSecret ? process.env.tokenSecret : require('../config.js').tokenSecret;

exports.login = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  db.retrieve(`select * from users where users.username = "${username}"`) //
  .then(rows => {
    if (!rows.length) {
      console.log('Login Error: User Not Found.');
      res.status(403).json('User Not Found.');
    } else if (!bcrypt.compareSync(password, rows[0].password)){
      console.log('Login Error: Wrong Password.');
      res.status(403).json('Wrong Password.');
    } else {
      user = rows[0];
      let token = jwt.encode(user, secret);
      db.getUserData(user.id)
      .then(data => {
        data.token = token;
        console.log('login senddata', data)
        res.status(200).json(data)
      })
    }
  })
  .catch(err =>{
    console.error('Login Error');
    res.status(403).json(err);
  })
}

exports.register = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  db.retrieve(`select * from users where username = "${username}"`)
  .then(rows => {
    if (rows.length) {
      console.log('SignUp Error: Username already taken.');
      res.status(403).json('That username is already taken.');
    } else {
      let newUser = {
        username, 
        password: bcrypt.hashSync(password, null),
        email: req.body.email
      };
      console.log('newuser', newUser);

      db.create(newUser, 'users')
      .then(user => {
        newUser.id = user.insertId;
        delete newUser.password;
        let token = jwt.encode(newUser, secret);  // rows obj right thing here?
        db.getUserData(newUser.id)
        .then(data => {
          data.token = token;
          console.log('login senddata', data)
          res.status(200).json(data)
        })
      })
      .catch(err =>{
        console.error('SignUp Error Upon DB Insertion');
        res.status(403).json(err);
      })
    }
  })
  .catch(err =>{
    console.error('SignUp Error');
    res.status(403).json(err);
  })
}

exports.checkAuth = (req, res) => {
  console.log('x-custom?', req.headers['x-custom-header'])
  let token = req.headers['x-custom-header'];
  if(!token) {
    res.status(403).json("No Token");
  } else {
  let user = jwt.decode(token, secret);
  db.retrieve(`select * from users where users.username = "${user.username}"`) //
  .then(rows => {
    if (!rows.length) {
      res.status(401).json('User Not Found.');
    } else {
      res.json(200)
    }
  })
  .catch(err =>{
    console.error('Token DB Error');
    res.status(403).json(err);
  })
  }
}