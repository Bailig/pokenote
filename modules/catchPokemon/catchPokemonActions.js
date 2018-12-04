import { AsyncStorage } from 'react-native';

const FETCH = 'catchPokemon/FETCH';
const FETCH_SUCCESS = 'catchPokemon/FETCH_SUCCESS';
const FETCH_FAIL = 'catchPokemon/FETCH_FAIL';
const ADD = 'catchPokemon/ADD';
const ADD_SUCCESS = 'catchPokemon/ADD_SUCCESS';
const ADD_FAIL = 'catchPokemon/ADD_FAIL';
export const UPDATE_SELECTED_POKEMON_TO_ADD = 'catchPokemon/UPDATE_SELECTED_POKEMON_TO_ADD';


export const updateSelectedPokemonToAdd = pokemonId => ({
  type: UPDATE_SELECTED_POKEMON_TO_ADD,
  payload: pokemonId,
});

export const addCatchPokemon = () => async (dispatch, getState) => {

};

export const removeCatchPokemon = () => () => {

};
