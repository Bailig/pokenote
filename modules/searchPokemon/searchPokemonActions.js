export const UPDATE_SEARCH_TEXT = 'searchPokemon/UPDATE_SEARCH_TEXT';
export const CLEAR_SEARCH_TEXT = 'searchPokemon/CLEAR_SEARCH_TEXT';

export const updateSearchText = text => ({ type: UPDATE_SEARCH_TEXT, payload: text });
export const clearSearchText = () => ({ type: CLEAR_SEARCH_TEXT });
