import R from 'ramda';
import {
  UPDATE_SELECTED_POKEMON_TO_ADD,
  FETCH_SUCCESS,
} from './catchPokemonActions';

const initialState = {
  selectedPokemonId: undefined,
  catchPokemons: undefined,
};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_SUCCESS:
      return R.assoc('catchPokemons', payload, state);
    case UPDATE_SELECTED_POKEMON_TO_ADD:
      return R.assoc('selectedPokemonToAddId', payload, state);
    default: return state;
  }
};
