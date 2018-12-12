import R from 'ramda';
import { AsyncStorage } from 'react-native';

export const FETCH = 'catchPokemon/FETCH';
export const FETCH_SUCCESS = 'catchPokemon/FETCH_SUCCESS';
export const FETCH_FAIL = 'catchPokemon/FETCH_FAIL';
const ADD = 'catchPokemon/ADD';
const ADD_SUCCESS = 'catchPokemon/ADD_SUCCESS';
const ADD_FAIL = 'catchPokemon/ADD_FAIL';
export const UPDATE_SELECTED_POKEMON_TO_ADD = 'catchPokemon/UPDATE_SELECTED_POKEMON_TO_ADD';


const fetchCatchPokemonFromAsyncStorage = async () => {
  const catchPokemons = JSON.parse(await AsyncStorage.getItem('catchPokemons'));
  return R.defaultTo([], catchPokemons);
};

export const fetchCatchPokemon = () => async (dispatch) => {
  dispatch({ type: FETCH });
  try {
    const catchPokemons = await fetchCatchPokemonFromAsyncStorage();
    dispatch({
      type: FETCH_SUCCESS,
      payload: catchPokemons,
    });
  } catch (error) {
    dispatch({ type: FETCH_FAIL, payload: error });
  }
};

export const updateSelectedPokemonToAdd = pokemonId => ({
  type: UPDATE_SELECTED_POKEMON_TO_ADD,
  payload: pokemonId,
});

export const addCatchPokemon = () => async (dispatch, getState) => {

};

export const removeCatchPokemon = () => () => {

};
