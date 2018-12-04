import R from 'ramda';
import {
  UPDATE_SELECTED_POKEMON_TO_ADD,
} from './catchPokemonActions';

const initialState = {
  selectedPokemonToAdd: undefined,
};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_SELECTED_POKEMON_TO_ADD:
      return R.assoc('selectedPokemonToAdd', payload, state);
    default: return state;
  }
};
