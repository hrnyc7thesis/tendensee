import { combineReducers } from 'redux';
import photoCount from './Photos';
import user from './FetchUser';
import auth from './Auth';
import routes from './Routes';
import sendingPhoto from './SendPhoto';
import addingHabit from './AddHabit';
import modal from './Modal';
import friends from './Friends';

const rootReducer = combineReducers({
  routes,
  photoCount,
  auth,
  user,
  sendingPhoto,
  addingHabit,
  modal,
  friends
});

export default rootReducer;
