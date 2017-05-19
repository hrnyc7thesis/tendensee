const db = require('./db/db-config.js');
const config = require('./config.js');
const dbHelpers = require('./db/helpers.js');
const uploadS3 = require('./db/s3-config.js');
const Promise = require('bluebird');
// const zlib = require('zlib'); // USE THIS TO COMPRESS?
const fs = require('fs');
const Clarifai = require('clarifai');

// SETUP IMAGE RECOGNITION
const imageRec = new Clarifai.App(config.imageId, config.imageSecret)

//PROMISIFY DB HELPERS
const createPromise = Promise.promisify(dbHelpers.create);
const retrievePromise = Promise.promisify(dbHelpers.retrieve);
const updatePromise = Promise.promisify(dbHelpers.update);
const deletePromise = Promise.promisify(dbHelpers.delete);

// USERS -------------------------------->
exports.getUserData = (req, res) => {
  let userId = 101; // LATER - get from front end? Session? 
  let responseData = {};
  retrievePromise(dbHelpers.query('retrieveUserHabits', userId))
  .then(habits => {
    console.log('habits:', habits)
    responseData['habits'] = habits;
    return retrievePromise(dbHelpers.query('retrieveUserDates', userId))
  })
  .then(dates => {
    responseData['dates'] = dates;  // WHEN HAVE GOOD DATA - PUT DATES IN EACH HABIT!
    console.log('resdata with all in controller', responseData);
    res.json(responseData);
  })
}
 
exports.addUser = (req, res) => {
  console.log('add user req.body', req.body)
  createPromise(req.body, 'users')
  .then(user => {
    console.log('user:', user);
    res.status(201).json(user);
  })
}

// HABITS -------------------------------->
exports.addHabit = (req, res) => {
  console.log('add user req.body', req.body)
  createPromise(req.body, 'habits')
  .then(habit => {
    res.status(201).json(habit);
  })
}

// DATES ---------------------------------->
exports.addDate = (req, res) => {
  let newDate = req.body; // pull needed stuff off req.body
  console.log('add date req.body', req.body)
  // WILL NEED TO SEND TO S3 & PUT RETURNED URL INTO CLARIFAI
  imageUrl = 'http://cdnak1.psbin.com/img/mw=390/mh=250/cr=n/d=v5tal/78wvuofy7raoto9t.jpg';
  let tags;
  imageRec.models.predict(Clarifai.GENERAL_MODEL, imageUrl)
  .then(imageTags => {
    tags = imageTags.outputs[0].data.concepts.map(item => item.name)
    console.log('image recognized!!!:', tags)
    return tags
  })
  .then(array => {
    // SET HABIT BASED ON TAGS, add to newDate
    createPromise(newDate, 'dates')
    .then(date => {
      res.status(201).json(date)
    })
  })
}