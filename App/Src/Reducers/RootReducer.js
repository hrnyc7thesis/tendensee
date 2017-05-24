import { combineReducers } from 'redux';
import photoCount from './Photos';
import user from './FetchUser';
import auth from './Auth';
import sendingPhoto from './SendPhoto';
import modal from './Modal';

const rootReducer = combineReducers({
  photoCount,
  auth,
  user,
  sendingPhoto,
  modal
});

export default rootReducer;
