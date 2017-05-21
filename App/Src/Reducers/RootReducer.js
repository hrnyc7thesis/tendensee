import { combineReducers } from 'redux';
import photoCount from './Photos';
import user from './FetchUser';

const rootReducer = combineReducers({
  photoCount,
  user
});

export default rootReducer;
