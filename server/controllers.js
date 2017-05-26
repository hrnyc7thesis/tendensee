const db = require('./db/db-config.js');
const config = require('./config.js');
const jwt = require('jwt-simple');
const dbHelpers = require('./db/helpers.js');
const uploadS3 = require('./db/s3-config.js');
const Promise = require('bluebird');

// const zlib = require('zlib'); // USE THIS TO COMPRESS?
// const fs = require('fs');

//PROMISIFY DB HELPERS
const createPromise = Promise.promisify(dbHelpers.create);
const retrievePromise = Promise.promisify(dbHelpers.retrieve);
const updatePromise = Promise.promisify(dbHelpers.update);
const deletePromise = Promise.promisify(dbHelpers.delete);

exports.retrieve = retrievePromise;
exports.create = createPromise;
exports.update = updatePromise;

const getUserData = (userId) => {
  let resData = {};
  return retrievePromise(dbHelpers.query('retrieveUser', userId))
  .then(user => {
    console.log('user:', user)
    let { id, username, email, facebook } = user[0];
    resData['user'] = { id, username, email, facebook }
    return retrievePromise(dbHelpers.query('retrieveUserHabits', userId))
    .then(habits => {
      if(habits.length) {
        habits.forEach(habit => {
          habit.has_pictures = habit.has_pictures.lastIndexOf(1) !== -1;
          habit.private = habit.private.lastIndexOf(1) !== -1;
          habit.dates = [];
        })
        console.log('habits:', habits)
        resData['habits'] = habits;
        // DOES THIS WORK FOR WHEN THERE ARE NO DATES PER HABIT?
        datePromises = resData.habits.map(habit => {
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
          console.log('pormiseall', resData)
          return resData;
        })
      } else {
          console.log('no habits', resData)
        resData['habits'] = [];
        return resData;
      }
    })
    .catch(err => console.log('Error getting user data from DB:', err))
  })
}

exports.getUserData = getUserData;

// USERS -------------------------------->
exports.getUser = (req, res) => {
  console.log('x-custom?', req.headers['x-custom-header'])

  console.log('gu req.headers', req.headers['x-custom-header']);
  console.log('gu req.cookies', req.cookies);
  // let username = req.session.passport.user;
  let token = req.headers['x-custom-header'];
  let user = jwt.decode(token, config.tokenSecret);
  getUserData(user.id)
  .then(data => {
    data.token = token;
    res.status(200).json(data);
  })
  .catch(err => console.log('Error getting user data from DB:', err))
}

exports.addUser = (req, res) => {
  let resData = {};
  resData.user = req.body;
  resData.habits = [];

  createPromise(req.body, 'users')
  .then(user => {
    resData.user.id = user.insertId;

    console.log('adduser return obj', data)
    res.status(201).json(resData);
  })
  .catch(err => console.log('Error adding user to DB:', err))
}

exports.patchUser = (req, res) => {
  let resData = {};
  resData.user = req.body.user;
  for(let key in req.body.data) {
    resData.user[key] = req.body.data[key];
  }
  resData.habits = req.body.habits;

  updatePromise(req.body.data, 'users', req.body.user.id)
  .then(user => {
    console.log('User Updated:', user)
    console.log('resData', resData)
    res.status(201).json(resData);
  })
  .catch(err => console.log('Error updating user in DB:', err))
}


// HABITS -------------------------------->
exports.addHabit = (req, res) => {
  let newHabit = Object.assign({}, req.body.data);
  newHabit.id_users = req.body.user.id;
  newHabit.start_date = new Date().toMysqlFormat(); // LATER - ability to set date?

  let resData = {};
  resData.user = req.body.user;
  resData.habits = req.body.habits;

  console.log('add habit newHabit', newHabit)
  createPromise(newHabit, 'habits')
  .then(habit => {
    console.log('habit after put in', habit);
    newHabit.id = habit.insertId;
    newHabit.dates = [];
    resData.habits.push(newHabit);
    console.log('resData in addHabit', resData)
    res.status(201).json(resData);
  })
  .catch(err => console.log('Error adding habit to DB:', err))
}

// DATES ---------------------------------->
exports.addDate = (req, res) => {
  let resData = {};
  resData.user = req.body.user;
  resData.habits = req.body.habits;
  // DEAL WITH NO PICTURE INSTANCES?
  let id_users = req.body.user.id || 101; // GET RID OF OR ONCE USING
  let id_habits = req.body.habits.map(h => h.id)
  let newDate = { id_users, id_habits };

  newDate.date = new Date().toMysqlFormat(); // LATER - ability to set date?
  let imageRecData;

  uploadS3(req.body.data.data, pic => {
    console.log('in s3 cb');
    newDate.picture = pic.Location;
    if(newDate.id_habits.length === 1) {
      newDate.id_habits = newDate.id_habits[0];
      // LATER: if ONLY 1 HABIT, TRAIN CLARIFAI!!!
      createPromise(newDate, 'dates')
      .then(date => {
        newDate.id = date.insertId;
        resData.habits[0].dates.push(newDate);
        res.status(201).json(resData);
      })
      .catch(err => console.log('Error adding date to DB:', err))
    } else if(newDate.id_habits.length > 1) { // NOT COMPLETE  - STILL NEED TO MATCH TO HABIT AND SET ID

      //COMMENT OUT IMAGE REC FOR NOW...
      // imageRec.models.predict(Clarifai.GENERAL_MODEL, newDate.picture)
      // .then(data => {
      //   imageRecData = data;
      //   imageRecData.tags = data.outputs[0].data.concepts.map(item => item.name)
      //   // USE TAGS TO MATCH IMAGE TO HABIT (USER habit IDs ARE IN newDate.id_habits ARRAY -ONCE FIND CORRECT HABIT, OVERWRITE ID to id_habits)
      //   console.log('image recognized!!!:', imageRecData.tags)
      //   console.log('newDate right before add to sql', newDate)

      let habitId = Math.floor(Math.random()*newDate.id_habits.length);
      newDate.id_habits = newDate.id_habits[habitId];

      createPromise(newDate, 'dates')
      .then(date => {
        newDate.id = date.insertId;
        resData.habits[habitId].dates.push(newDate);
        res.status(201).json(resData);
      })
      .catch(err => console.log('Error adding date to DB:', err))
    }
  })
}

// AUTHENTICATION --------------------------------------------->

exports.register = (req, res) => {
  console.log(req.body);
  res.send(201);
}
