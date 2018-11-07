import { combineReducers } from 'redux';

import app from './app';
import pokemon from './pokemon';
import againstPokemon from './againstPokemon';
import searchPokemon from './searchPokemon';

const rootReducer = combineReducers({
  app,
  pokemon,
  againstPokemon,
  searchPokemon,
});
export default rootReducer;
