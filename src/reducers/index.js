import { combineReducers } from 'redux';
import router from './router';
import clock from './clock';

export default combineReducers({ router, clock });
