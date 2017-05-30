import { combineReducers } from 'redux';
import photoCount from './Photos';
import user from './FetchUser';
import auth from './Auth';
import routes from './Routes';
import sendingPhoto from './SendPhoto';
import habit from './Habit';
import modal from './Modal';

const rootReducer = combineReducers({
  routes,
  photoCount,
  auth,
  user,
  sendingPhoto,
  habit,
  modal,
});

export default rootReducer;
