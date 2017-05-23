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

const getUserData = (userId) => {
  let responseData = {};
  return retrievePromise(dbHelpers.query('retrieveUser', userId))
  .then(user => {
    console.log('user:', user)
    let { id, username, email, facebook } = user[0];
    responseData['user'] = { id, username, email, facebook }
    return retrievePromise(dbHelpers.query('retrieveUserHabits', userId))
    .then(habits => {
      if(habits.length) {
        habits.forEach(habit => {
          habit.has_picture = habit.has_picture.lastIndexOf(1) !== -1;
          habit.private = habit.private.lastIndexOf(1) !== -1;
          habit.dates = [];
        })
        console.log('habits:', habits)
        responseData['habits'] = habits;
        // DOES THIS WORK FOR WHEN THERE ARE NO DATES PER HABIT?
        datePromises = responseData.habits.map(habit => {
          return retrievePromise(dbHelpers.query('retrieveDatesFromHabit', habit.id))
          .then(dates => {
            dates.forEach(day => {
              let { id, date, picture } = day;
              habit.dates.push({ id, date, picture });
              return day;
            })
          })
        })
        return Promise.all(datePromises)
        .then(() => {
          console.log('resdata with all in controller:', responseData);
          return responseData;
        })
      } else {
        responseData['habits'] = [];
        return responseData;
      }
    })
    .catch(err => console.log('Error getting user data from DB:', err))
  })
}

// USERS -------------------------------->
exports.getUser = (req, res) => {
  let userId = 101; // LATER - get from Session...
  getUserData(userId)
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => console.log('Error getting user data from DB:', err))
}

exports.addUser = (req, res) => {
  console.log('add user req.body:', req.body)
  createPromise(req.body, 'users')
  .then(user => {
    console.log('user:', user);
    getUserData(user.insertId)
    .then(data => {
      console.log('adduser get user data', data)
      res.status(201).json(data);
    })
    .catch(err => console.log('Error getting user data from DB:', err))
  })
  .catch(err => console.log('Error adding user to DB:', err))
}

// HABITS -------------------------------->
exports.addHabit = (req, res) => {
  let newHabit = Object.assign({}, req.body.data);
  newHabit.id_users = req.body.user.id;
  newHabit.start_date = new Date().toMysqlFormat(); // LATER - ability to set date?

  let returnObj = {};
  returnObj.user = req.body.user;
  returnObj.habits = req.body.habits;

  console.log('add habit newHabit', newHabit)
  createPromise(newHabit, 'habits')
  .then(habit => {
    console.log('habit after put in', habit);
    newHabits.id = insertId;
    returnObj.habits.push(newHabits);
    res.status(201).json(returnObj);
  })
  .catch(err => console.log('Error adding habit to DB:', err))
}

// DATES ---------------------------------->
exports.addDate = (req, res) => {
  let returnObj = {};
  returnObj.user = req.body.user;
  returnObj.habits = req.body.habits;
  // DEAL WITH NO PICTURE INSTANCES!!!
  let id_users = req.body.user.id || 101; // GET RID OF OR ONCE USING
  let id_habits = req.body.habits.map(h => h.id)
  let newDate = { id_users, id_habits };

  newDate.date = new Date().toMysqlFormat(); // LATER - ability to set date?
  console.log('date to check format', newDate.date)
  let imageRecData;

  // STREAM UPLOAD FUNCTION CALL
  // uploadS3(req.body.data.path, pic => {

  //DIRECT UPLOAD FUNCTION CALL
  uploadS3(req.body.data.data, pic => {

    console.log('in s3 cb');
    newDate.picture = pic.Location;
    if(newDate.id_habits.length === 1) {

      newDate.id_habits = newDate.id_habits[0];
      // LATER: if ONLY 1 HABIT, TRAIN CLARIFAI!!!
      createPromise(newDate, 'dates')
      .then(date => {
        newDate.id = date.insertId;
        returnObj.habits[0].dates.push(newDate);
        res.status(201).json(returnObj);
      })
      .catch(err => console.log('Error adding date to DB:', err))
    } else if(newDate.id_habits.length > 1) { // NOT COMPLETE  - STILL NEED TO MATCH TO HABIT AND SET ID
      imageRec.models.predict(Clarifai.GENERAL_MODEL, newDate.picture)
      .then(data => {
        imageRecData = data;
        imageRecData.tags = data.outputs[0].data.concepts.map(item => item.name)
        // USE TAGS TO MATCH IMAGE TO HABIT (USER habit IDs ARE IN newDate.id_habits ARRAY -ONCE FIND CORRECT HABIT, OVERWRITE ID to id_habits)
        console.log('image recognized!!!:', imageRecData.tags)
        console.log('newDate right before add to sql', newDate)
        createPromise(newDate, 'dates')
        .then(date => {
          //return correct obj...
          res.status(201).json(date)
        })
        .catch(err => console.log('Error adding date to DB:', err))
      }, err => {
        console.log('Clarifai error:', err);
      })
    }
  })
}

// AUTHENTICATION --------------------------------------------->

exports.register = (req, res) => {
  console.log(req.body);
  res.send(201);
}
