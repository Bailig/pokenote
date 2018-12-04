import R from 'ramda';
import {
  UPDATE_SEARCH_TEXT,
  UPDATE_SELECTED_POKEMON,
  CLEAR_SELECTED_POKEMON,
} from './searchPokemonActions';

const initialState = {
  searchText: '',
  selectedPokemonId: null,
};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_SEARCH_TEXT:
      return R.assoc('searchText', payload, state);
    case UPDATE_SELECTED_POKEMON:
      return R.assoc('selectedPokemonId', payload, state);
    case CLEAR_SELECTED_POKEMON:
      return R.assoc('selectedPokemonId', null, state);
    default: return state;
  }
};
