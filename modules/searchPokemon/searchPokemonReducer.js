import R from 'ramda';
import { UPDATE_SEARCH_TEXT, CLEAR_SEARCH_TEXT } from './searchPokemonActions';

const initialState = {
  searchText: '',
};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_SEARCH_TEXT:
      return R.assoc('searchText', payload, state);
    case CLEAR_SEARCH_TEXT:
      return R.assoc('searchText', '', state);
    default: return state;
  }
};
