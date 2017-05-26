const db = require('../controllers.js');
const passport = require('passport');
const FBStrategy = require('passport-facebook').Strategy;
const config = process.env.FBID ? {
  fbId: process.env.FBID,
  fbSecret: process.env.FBSECRET,
} : require('../config.js');

const baseURL = process.env.BASEURL || config.baseURL; // NEED TO SET THIS!

// WHEN WANT TO USE FB - EXPORT THIS
passport.use(new FBStrategy({
  clientID: config.fbId,
  clientSecret: config.fbSecret,
  callbackURL: `${baseURL}/auth/facebook/callback`,
  passReqToCallback: true,
},
  (req, token, refreshToken, profile, done) => {
    console.log('PROFILE in fb auth:', profile);

    db.retrieve(`select * from users where users.facebook_id = "${profile.id}"`)
    .then(rows => {
      if(rows.length) {
        return done(null, user);
      } else {
        let newUser = {};
        newUser.facebook_id = profile.id;
        newUser.facebook_token = token;
        newUser.facebook_name = profile.name.givenName + ' ' + profile.name.familyName;
        newUser.email = profile.emails[0].value;
        newUser.photo = profile.photos[0].value;
        //LATER - friends?  (Would only be those that also use the app...)

        db.create(newUser, 'users')
        .then(data => {
          newUser.id = data.insertId;
          return done(null, newUser);
        })
      }
    })
    .catch(err => done(err));
  }
))

passport.serializeUser((user, done)=> done(null, user));
passport.deserializeUser((id, done)=> {
  db.retrieve(`select * from users where users.facebook_id = "${id}"`)
  .then(user => {
    return done(null, user);
  })
  .catch(err => console.error(err));
});

exports.checkAuth = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  res.status(403).send();
}