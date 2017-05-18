const db = require('./db/db-config.js');
const dbHelpers = require('./db/helpers.js');
const Promise = require('bluebird');

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
  
}