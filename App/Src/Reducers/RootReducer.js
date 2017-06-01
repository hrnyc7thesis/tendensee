import { combineReducers } from 'redux';
import photoCount from './Photos';
import user from './FetchUser';
import auth from './Auth';
import routes from './Routes';
import sendingPhoto from './SendPhoto';
import habit from './Habit';
import day from './Day';
import modal from './Modal';
import friends from './Friends';

const rootReducer = combineReducers({
  routes,
  photoCount,
  auth,
  day,
  user,
  sendingPhoto,
  habit,
  modal,
  friends
});

export default rootReducer;
