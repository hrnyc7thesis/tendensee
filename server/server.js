const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const db = require('./db/db-config.js');

const app = express();

// IMPLEMENT THE BELOW LATER? OR NO NEED BC APP NOT SITE? (TURN INTO MIDDLEWARE FIRST...)
// app.use('/api', auth.checkAuth);

// MIDDLEWARE
app.use(cookieParser());
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '1mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));

// SETUP ROUTES
app.use(require('./routes.js'));

// LISTEN TO PORT
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})