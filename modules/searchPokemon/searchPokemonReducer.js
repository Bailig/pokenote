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
      return { ...state, searchText: payload };
    case UPDATE_SELECTED_POKEMON:
      return { ...state, selectedPokemonId: payload };
    case CLEAR_SELECTED_POKEMON:
      return { ...state, selectedPokemonId: null };
    default: return state;
  }
};
