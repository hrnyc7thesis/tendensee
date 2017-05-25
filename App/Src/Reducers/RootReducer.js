import { combineReducers } from 'redux';
import photoCount from './Photos';
import user from './FetchUser';
import auth from './Auth';
import routes from './Routes';
import sendingPhoto from './SendPhoto';

const rootReducer = combineReducers({
  routes,
  photoCount,
  auth,
  user,
  sendingPhoto
});

export default rootReducer;
