import { combineReducers } from 'redux';

import app from './app';
import pokemon from './pokemon';
import againstPokemon from './againstPokemon';
import catchPokemon from './catchPokemon';
import searchPokemon from './searchPokemon';

const rootReducer = combineReducers({
  app,
  pokemon,
  againstPokemon,
  catchPokemon,
  searchPokemon,
});
export default rootReducer;
