const db = require('./db/db-config.js');
const config = require('./config.js');
const dbHelpers = require('./db/helpers.js');
const uploadS3 = require('./db/s3-config.js');
const Promise = require('bluebird');
// const zlib = require('zlib'); // USE THIS TO COMPRESS?
// const fs = require('fs');
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
  // DEAL WITH NO PICTURE INSTANCES!!!
  let id_users = req.body.id_users;
  let id_habits = req.body.id_habits;

  let newDate = { id_users, id_habits };
  newDate.date = new Date();
  let imageRecData;

  console.log('add date req.body', newDate);

  uploadS3(req.body.path, pic =>{
    console.log('s3 pic in addDate callback:', pic);
    newDate.picture = pic.location;
    // if one habit, send immediately; if >1 do this:
    imageRec.models.predict(Clarifai.GENERAL_MODEL, newDate.picture)
    .then(data => {
      imageRecData = data;
      imageRec.tags = imageTags.outputs[0].data.concepts.map(item => item.name)
      // USE TAGS TO MATCH IMAGE TO HABIT (USER habit IDs ARE IN newDate.id_habits ARRAY -ONCE FIND CORRECT HABIT, OVERWRITE ID to id_habits)
      console.log('image recognized!!!:', imageRecData.tags)
      createPromise(newDate, 'dates')
      .then(date => {
        res.status(201).json(date)
      })
    })
  })

}
