const routes = require('express').Router();
const controllers = require('./controllers.js');
const auth = require('./auth/tokenAuth.js');

// LOG TIME OF EACH REQUEST
routes.use(function timeLog (req, res, next) {
  console.log('Time: ', new Date())
  next()
});

//FB AUTHENTICATION (NOT IN USE...)
// routes.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email', 'user_friends'] }));
// routes.get('/auth/facebook/callback',
//   passport.authenticate('facebook', {failureRedirect: '/auth/facebook' }));
                // find user in DB and add stuff to cookie for client to use?

// // LOCAL AUTH
// routes.post('/api/register', passport.authenticate('local-signup', {failureRedirect : '/login', failureFlash: false }), (req, res) => {
//   console.log('SignUp successful');
//   req.session.cookie.expires = false;
//   let { id, username, email, session_id } = req.user;
//   let resData = {};
//   resData.user = { id, username, email, sessionId: session_id };
//   resData.habits = [];
//   res.status(201).json(id); // check client to see if they get cookie
// });

routes.post('/api/login', auth.login);
routes.post('/api/register', auth.register);
routes.post('/api/register', auth.register);
routes.get('/api/signedin', auth.checkAuth);

// OTHER ROUTES
routes.route('/api/users')
  .get(controllers.getUser)
  .post(controllers.addUser)
  .put(controllers.patchUser);
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

// routes.route('/api/register')
//   .post(controllers.register);

// routes.route('/api/friends')
//   .get(controllers.getFriends)
//   .post(controllers.addFriend)
//   .put(controllers.challengeFriend)
//   .delete(controllers.deleteFriend);

module.exports = routes;