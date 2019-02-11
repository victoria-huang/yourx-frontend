import { combineReducers } from 'redux';
import prescriptions from './prescriptions'
import user from './user'

export default combineReducers({
  prescriptions,
  user
});
