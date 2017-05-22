import { combineReducers } from 'redux';
import photoCount from './Photos';
import user from './FetchUser';
import sendingPhoto from './SendPhoto';

const rootReducer = combineReducers({
  photoCount,
  user,
  sendingPhoto
});

export default rootReducer;
