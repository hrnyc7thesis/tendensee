import { combineReducers } from 'redux';
import photoCount from './Photos';
import user from './FetchUser';
import auth from './Auth';
import sendingPhoto from './SendPhoto';

const rootReducer = combineReducers({
  photoCount,
  auth,
  user,
  sendingPhoto
});

export default rootReducer;
