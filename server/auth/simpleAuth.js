const db = require('../controllers.js');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const dbconfig = require('../db/db-config.js');



passport.serializeUser((user, done)=> {
  console.log('serializing...', user)
  done(null, user)
});
passport.deserializeUser((id, done)=> {
  console.log('deserializing...', id)
  db.retrieve(`select * from users where users.id = "${id.id}"`)
  .then(user => {
    return done(null, user);
  })
  .catch(err => console.error(err));
});

passport.use('local-signup', new LocalStrategy ({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
},
(req, username, password, done) => {
  return db.retrieve(`select * from users where username = "${username}"`)
  .then(rows => {
    if (rows.length) {
      console.log('SignUp Error: Username already taken.');
      return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
    } else {
      let newUser = {
        username, 
        password: bcrypt.hashSync(password, null),
        email: req.body.email
      };
      newUser.session_id = req.sessionID; // SAVE SESSION ID TO USER
      console.log('newuser', newUser);

      return db.create(newUser, 'users')
      .then(user => {
        console.log('ppsess', req.session)
        newUser.id = user.insertId;
        return done(null, newUser)
      })
      .catch(err =>{
        console.error('SignUp Error Upon DB Insertion');
        return done(err);
      })
    }
  })
  .catch(err =>{
    console.error('SignUp Error');
    return done(err);
  })
}));

passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
},
(req, username, password, done) => {
  console.log('start local login')
  return db.retrieve(`select * from users where users.username = "${username}"`) //
  .then(rows => {
    if (!rows.length) {
      console.log('Login Error: User Not Found.');
      return done(null, false, req.flash('loginMessage', 'User Not Found.'));
    } else if (!bcrypt.compareSync(password, rows[0].password)){
      console.log('Login Error: Wrong Password.');
      return done(null, false, req.flash('loginMessage', 'Incorrect Password. Please Try Again.'));
    } else {
      return done(null, rows[0]);
    }
  })
  .catch(err =>{
    console.error('Login Error');
    return done(err);
  })
}));

exports.checkAuth = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  res.status(403).send();
}