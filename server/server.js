const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const routes = require('./routes.js');

//AUTHENTICATION MODULES
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const config = process.env.SECRET ? { secret: process.env.SECRET } : require('./config');
const db = require('./db/db-config.js');
const sessionStore = new MySQLStore({}, db);



const app = express();

//AUTHENTICATION MIDDLEWARE
app.use(session({
  secret: config.secret,
  resave: true, // need this?
  saveUninitialized: false, // need this?
  store: sessionStore, 
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(flash());
//PASSPORT SETUP AND INITIALIZATION - LATER - FB TOO
// const fbAuth = require('./auth/facebookAuth.js');



// IMPLEMENT THE BELOW LATER? OR NO NEED BC APP NOT SITE? (TURN INTO MIDDLEWARE FIRST...)
// app.use('/api', auth.checkAuth);

// OTHER MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '1mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));
app.use(express.static(path.join(__dirname, '../client')));

// SETUP ROUTES
app.use(require('./routes.js'));

// LISTEN TO PORT
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})