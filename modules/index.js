import { combineReducers } from 'redux';

import app from './app';
import pokemon from './pokemon';

const rootReducer = combineReducers({
  app,
  pokemon,
});
export default rootReducer;
