const routes = require('express').Router();
const controllers = require('./controllers.js');

//DO AUTH STUFF HERE;

routes.route('/api/users')
  .get(controllers.getAllUserData)
  .post(controllers.addUser);
  // .put(controllers.updateUser)
  // .delete(controllers.deleteUser);

routes.route('/api/habits')
  // .get(controllers.getHabitData)
  .post(controllers.addHabit);
  // .put(controllers.updateHabit)
  // .delete(controllers.deleteHabit);

routes.route('/api/dates')
  // .get(controllers.getDate)
  .post(controllers.addDate);
  // .delete(controllers.deleteDate);

// routes.route('/api/friends')
//   .get(controllers.getFriends)
//   .post(controllers.addFriend)
//   .put(controllers.challengeFriend)
//   .delete(controllers.deleteFriend);

module.exports = routes;