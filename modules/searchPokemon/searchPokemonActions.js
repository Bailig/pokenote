export const UPDATE_SEARCH_TEXT = 'searchPokemon/UPDATE_SEARCH_TEXT';
export const UPDATE_SELECTED_POKEMON = 'searchPokemon/UPDATE_SELECTED_POKEMON';
export const CLEAR_SELECTED_POKEMON = 'searchPokemon/CLEAR_SELECTED_POKEMON';

export const updateSearchText = text => ({ type: UPDATE_SEARCH_TEXT, payload: text });
export const updateSelectedPokemon = id => ({ type: UPDATE_SELECTED_POKEMON, payload: id });
export const clearSelectedPokemonId = () => ({ type: CLEAR_SELECTED_POKEMON });
