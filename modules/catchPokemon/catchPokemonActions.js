import R from 'ramda';
import { AsyncStorage } from 'react-native';
import uuid from 'uuid/v1';

import { selectDefaultFastMoveIdForPokemon, selectDefaultChargeMoveIdForPokemon } from './catchPokemonSelectors';

export const FETCH = 'catchPokemon/FETCH';
export const FETCH_SUCCESS = 'catchPokemon/FETCH_SUCCESS';
export const FETCH_FAIL = 'catchPokemon/FETCH_FAIL';
export const SAVE_ADD_POKEMON = 'catchPokemon/SAVE_ADD_POKEMON';
export const SAVE_ADD_POKEMON_SUCCESS = 'catchPokemon/SAVE_ADD_POKEMON_SUCCESS';
export const SAVE_ADD_POKEMON_FAIL = 'catchPokemon/SAVE_ADD_POKEMON_FAIL';
export const UPDATE_ADD_POKEMON = 'catchPokemon/UPDATE_ADD_POKEMON';
export const UPDATE_ADD_POKEMON_MOVE = 'catchPokemon/UPDATE_ADD_POKEMON_MOVE';


const fetchCatchPokemonFromAsyncStorage = async () => {
  const catchPokemons = JSON.parse(await AsyncStorage.getItem('catchPokemons'));
  return R.defaultTo({}, catchPokemons);
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

export const updateAddPokemonMove = ({ moveProp, value }) => ({
  type: UPDATE_ADD_POKEMON_MOVE,
  payload: { moveProp, value },
});

export const updateAddPokemon = pokemonId => (dispatch, getState) => {
  const state = getState();
  dispatch({
    type: UPDATE_ADD_POKEMON,
    payload: {
      pokemonId,
      fastMoveId: selectDefaultFastMoveIdForPokemon(state, pokemonId),
      chargeMoveId: selectDefaultChargeMoveIdForPokemon(state, pokemonId),
    },
  });
};


export const saveAddPokemon = () => async (dispatch, getState) => {
  dispatch({ type: SAVE_ADD_POKEMON });
  try {
    const { catchPokemon: { addPokemon } } = getState();
    const catchPokemons = await fetchCatchPokemon();
    const id = uuid();
    const updatedCatchPokemons = R.pipe(
      R.assoc('id', id),
      R.assoc(id, R.__, catchPokemons),
    )(addPokemon);
    await AsyncStorage.setItem('catchPokemons', JSON.stringify(updatedCatchPokemons));
    dispatch({
      type: SAVE_ADD_POKEMON_SUCCESS,
      payload: updatedCatchPokemons,
    });
  } catch (error) {
    dispatch({ type: SAVE_ADD_POKEMON_FAIL, payload: error });
  }
};

export const removeCatchPokemon = () => () => {

};
