const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const routes = require('./routes.js');

// const session = require('express-session');
// const passport = require('passport');
// const cookieParser = require('cookie-parser');
// const auth = require('./auth');
// const config = process.env.SECRET ? { secret: process.env.SECRET } : require('./config');


const app = express();

// CONFIGURE PASSPORT / AUTH HERE ()
// app.use(cookieParser());

// SETUP MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client'))); // IS THIS RIGHT FOLDER?

// SETUP ROUTES
app.use(require('./routes.js'));

// LISTEN TO PORT
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
console.log('serving static files from' + __dirname + '/../client');


