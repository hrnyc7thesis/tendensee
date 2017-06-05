import { combineReducers } from 'redux';
import photoCount from './Photos';
import user from './FetchUser';
import auth from './Auth';
import routes from './Routes';
import sendingPhoto from './SendPhoto';
import habit from './Habit';
import day from './Day';
import modal from './Modal';
import visibleUser from './VisibleUser';
import settings from './Settings'
import facebook from './Facebook'

const rootReducer = combineReducers({
  routes,
  facebook,
  photoCount,
  auth,
  day,
  user,
  sendingPhoto,
  habit,
  modal,
  visibleUser,
  settings,
});

export default rootReducer;
