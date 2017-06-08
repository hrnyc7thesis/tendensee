const db = require('./db/db-config.js');
const config = require('./config.js');
const jwt = require('jwt-simple');
const dbHelpers = require('./db/helpers.js');
const uploadS3 = require('./db/s3-config.js');
const Promise = require('bluebird');
const imageRec = require('./imageRec.js')
const moment = require('moment');

//PROMISIFY DB HELPERS
const createPromise = Promise.promisify(dbHelpers.create);
const retrievePromise = Promise.promisify(dbHelpers.retrieve);
const updatePromise = Promise.promisify(dbHelpers.update);
const deletePromise = Promise.promisify(dbHelpers.delete);
const deleteFriendPromise = Promise.promisify(dbHelpers.deleteFriendRelationship);

exports.create = createPromise;
exports.retrieve = retrievePromise;
exports.update = updatePromise;
exports.delete = deletePromise;

const getUserData = (userId, token) => {
  let resData = {};
  resData.token = token;
  resData['user'] = {};
  return retrievePromise(dbHelpers.query('retrieveUser', userId))
  .then(user => {
    for(let prop in user[0]) {
      resData.user[prop] = user[0][prop];
    }
    resData.user.notifications = resData.user.notifications.lastIndexOf(1) !== -1;
    resData.user.private = resData.user.private.lastIndexOf(1) !== -1;
    if(resData['user'].password) delete resData['user'].password;

    //ADDED BELOW TO GET FRIENDS AND ALL OTHER USERS - DUNCAN
    resData['allUsers'] = [];
    resData['friends'] = [];
    return retrievePromise(dbHelpers.query('retrieveAllOtherUsers', userId))
    .then(users => {
      users.forEach((user) => {
        resData['allUsers'].push({
          id: user.id,
          username: user.username,
          tagline: user.tagline,
          photo: user.photo,
          email: user.email,
        })
      });
      return retrievePromise(dbHelpers.query('retrieveFriends', userId))
      .then((friends) => {
        resData['friends'] = friends.map(friend => friend.id_followee);
        //BELOW FOLLOWS THE CODE THAT WAS EXISTING BEFORE - DUNCAN
        return retrievePromise(dbHelpers.query('retrieveUserHabits', userId))
        .then(habits => {
          if(habits.length) {
            habits.forEach(habit => {
              habit.has_pictures = habit.has_pictures.lastIndexOf(1) !== -1;
              habit.private = habit.private.lastIndexOf(1) !== -1;
              habit.dates = [];
            })
            resData['habits'] = habits;
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
              return resData;
            })
          } else {
            console.log('no habits', resData);
            resData['habits'] = [];
            return resData;
          }
        })
        .catch(err => console.log('Error getting user data from DB:', err))
      })
      .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
  })
  .catch(err => console.error(err))  
}

exports.getUserData = getUserData;

// USERS -------------------------------->
exports.getUser = (req, res) => {
  //ADDED THE FIRST IF STATEMENT TO ACCOUNT FOR CLICKING ON ANOTHER
  //USERS PROFILE. LEFT ELSE BLOCK UNCHANGED - DUNCAN
  if (req.params.user) {
    let user = {id: req.params.user};
    getUserData(user.id)
    .then(data => {
      res.status(200).json(data);
    })
  } else {
    let token = req.headers['x-custom-header'];
    let user = jwt.decode(token, config.tokenSecret);
    getUserData(user.user.id, token)
    .then(data => {
      data.token = token;
      res.status(200).json(data);
    })
    .catch(err => console.error('Error getting user data from DB:', err))
  }
}

exports.addUser = (req, res) => {
  let resData = {};
  resData.user = req.body;
  resData.habits = [];

  createPromise(req.body, 'users')
  .then(user => {
    resData.user.id = user.insertId;
    res.status(201).json(resData);
  })
  .catch(err => console.error('Error adding user to DB:', err))
}

exports.patchUser = (req, res) => {
  let resData = {};
  let putData = {};
  if(req.body.data.photo) {
    uploadS3(req.body.data.photo, pic => {
      putData.photo = pic.Location;
      updatePromise(putData, 'users', req.body.user.id)
      .then(user => {
        res.status(201).json(resData);
      })
      .catch(err => console.error('Error updating user in DB:', err))
    })
  } else{
    updatePromise(req.body.data, 'users', req.body.user.id)
    .then(user => {
      res.status(201).json(resData);
    })
    .catch(err => console.error('Error updating user in DB:', err))
  }
}

// HABITS -------------------------------->
exports.addHabit = (req, res) => {
  let newHabit = Object.assign({}, req.body.data);
  newHabit.id_users = req.body.user.id;
  newHabit.start_date = new Date().toMysqlFormat();

  newHabit.notification = newHabit.notification ? new Date(newHabit.notification).toMysqlFormat() : null;

  let resData = {};
  resData.token = req.body.token;
  resData.user = req.body.user;
  resData.habits = req.body.habits;

  createPromise(newHabit, 'habits')
  .then(habit => {
    newHabit.id = habit.insertId;
    newHabit.dates = [];
    resData.habits.push(newHabit);
    res.status(201).json(resData);
  })
  .catch(err => console.error('Error adding habit to DB:', err))
}

exports.updateHabit = (req, res) => {
  req.body.data.notification = req.body.data.notification ? new Date(req.body.data.notification).toMysqlFormat() : null;

  updatePromise(req.body.data, 'habits', req.body.data.id)
  .then(habit => {
    res.status(200).json(habit);
  })
  .catch(err => console.error('Error updating habit in DB:', err))
}

exports.deleteHabit = (req, res) => {
  db.query(`DELETE FROM dates WHERE id_habits=?`, req.body.habitId, (error, result) => {
    if(error) console.log(error);
    console.log('deleted:', result.affectedRows, 'rows')
    deletePromise(req.body.habitId, 'habits')
    .then(habits => {
      res.status(200).json(habits);
    })
    .catch(err => console.error('Error deleting habit from DB:', err))
  })
}

// DATES ---------------------------------->
const noImageRecHelper = (req, res, picture, newDate) => {
  uploadS3(picture, pic => {
    newDate.picture = pic.Location
    console.log('prechosen or 1 habit newdate before db', newDate);
    createPromise(newDate, 'dates')
    .then(date => {
      newDate.id = date.insertId;
      res.status(201).json({currentDate:newDate});
    })
    .catch(err => console.error('Error adding date to DB:', err))
  })
}

const preChosenHabitHelper = (req, res) => {
  let newDate = { 
    id_users:req.body.user.id, 
    date: new Date(req.body.day.date).toMysqlFormat(),
    id_habits: req.body.picHabit.id,
  };
  let picture = (req.body.data && req.body.data.data) ? req.body.data.data : 'No Photo'
  noImageRecHelper(req, res, picture, newDate);
}

const getUncheckedHabitsList = habits => {
  return habits.filter(h => {
    if(h.dates.length) {
      let today = moment(new Date()).format('YYYY-MM-DD');
      let sortedDates = h.dates.sort((a,b) => new Date(b.date.toString()) - new Date(a.date.toString()));
      let mostRecentDay = moment(sortedDates[0].date).format('YYYY-MM-DD');
      console.log('today and day', today, mostRecentDay)
      return (h.dates.length && (today != mostRecentDay))
    } else {
      return true
    }
  });
}

const noHabitChosenHelper = (req,res) => {
  let newDate = { 
    id_users:req.body.user.id, 
    date: new Date().toMysqlFormat(),
  };
  //GET ARRAY OF HABITS NOT CHECKED OFF FOR TODAY
  let habits = getUncheckedHabitsList(req.body.habits);
  // IF ONLY ONE HABIT, CAN ASSIGN WITHOUT IMAGE REC
  if(habits.length === 1) {
    newDate.id_habits = habits[0].id;
    noImageRecHelper(req, res, req.body.data.data, newDate);      
  } else {
    uploadS3(req.body.data.data, pic => {
      newDate.picture = pic.Location;
      // PERFORM IMAGE RECOGNITION
      imageRec(req.body.data.data, habits)
      .then(habit => {
        newDate.id_habits = habit.id;
        // CREATE ENTRY IN DB AND SEND RESPONSE
        createPromise(newDate, 'dates')
        .then(date => {
          newDate.id = date.insertId;
          res.status(201).json({currentDate:newDate});
        })
        .catch(err => console.error('Error adding date to DB:', err))
      })
      .catch(err => console.error('Image Recognition Error:', err))
    })
  }
}

exports.addDate = (req, res) => {
  req.body.day && req.body.picHabit ? preChosenHabitHelper(req,res) : noHabitChosenHelper(req,res);
}

exports.updateDate = (req, res) => {
  // Swap if there is a picture there already...
  if(req.body.data.swap) {
    let placeHolder = new Date();
    placeHolder.setDate(placeHolder.getDate() + 3);
    placeHolder = placeHolder.toMysqlFormat();

    updatePromise({date: placeHolder}, 'dates', req.body.data.swap.id)
    .then(date => {
      updatePromise({id_habits: req.body.data.id_habits}, 'dates', req.body.data.id)
      .then(date => {
        updatePromise({date: req.body.data.swap.date, id_habits: req.body.data.swap.id_habits }, 'dates', req.body.data.swap.id)
        .then(date => {
          res.status(200).json(date);
        })
        .catch(err => console.error('Error updating date in DB (1):', err))
      })
      .catch(err => console.error('Error updating date in DB (2):', err))
    })
    .catch(err => console.error('Error updating date in DB (3):', err))
  } else {
    updatePromise(req.body.data, 'dates', req.body.data.id)
    .then(date => {
      // console.log('updated date:', date);
      res.status(200).json(date);
    })
    .catch(err => console.error('Error updating date in DB (no swap):', err))
  }
}

exports.deleteDate = (req, res) => {
  deletePromise(req.body.data.id, 'dates')
  .then(date => {
    res.status(200).json(date);
  })
  .catch(err => console.error('Error deleting date in DB:', err))
}

// FRIENDS -------------------------------------------->
exports.addFriends = (req, res) => {
  let token = req.headers['x-custom-header'];
  let user = jwt.decode(token, config.tokenSecret);
  let id_follower = user.user.id;
  req.body.data.forEach(id_followee => {
    createPromise({id_follower, id_followee}, 'friends')
    .then((data) => {
      res.status(201).json(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500);
    })
  })
}

exports.deleteFriend = (req, res) => {
  let token = req.headers['x-custom-header'];
  let user = jwt.decode(token, config.tokenSecret);
  let id_follower = user.user.id;
  let id_followee = req.body.data;
  deleteFriendPromise(id_follower, id_followee)
  .then((data) => {
    res.status(201).json(data);
  })
  .catch(err => {
    console.error(err);
    res.status(500);
  })
};
