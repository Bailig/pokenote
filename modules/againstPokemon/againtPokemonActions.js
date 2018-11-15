import { AsyncStorage } from 'react-native';

export const FETCH = 'againstPokemon/FETCH';
export const FETCH_SUCCESS = 'againstPokemon/FETCH_SUCCESS';
export const FETCH_FAIL = 'againstPokemon/FETCH_FAIL';
export const UPDATE = 'againstPokemon/UPDATE';
export const UPDATE_SUCCESS = 'againstPokemon/UPDATE_SUCCESS';
export const UPDATE_FAIL = 'againstPokemon/UPDATE_FAIL';
export const UPDATE_INDEX = 'againstPokemon/UPDATE_INDEX';
export const REMOVE = 'againstPokemon/REMOVE';
export const REMOVE_SUCCESS = 'againstPokemon/REMOVE_SUCCESS';
export const REMOVE_FAIL = 'againstPokemon/REMOVE_FAIL';

const AGAINST_POKEMON_KEYS = ['againstPokemon0', 'againstPokemon1', 'againstPokemon2', 'againstPokemon3', 'againstPokemon4', 'againstPokemon5'];

export const updateAgainstPokemonIndex = index => ({ type: UPDATE_INDEX, payload: index });

export const fetchAgainstPokemon = () => async (dispatch) => {
  dispatch({ type: FETCH });
  try {
    const againstPokemonIds = (await AsyncStorage.multiGet(AGAINST_POKEMON_KEYS)).map(item => item[1]);
    dispatch({
      type: FETCH_SUCCESS,
      payload: againstPokemonIds,
    });
  } catch (error) {
    dispatch({ type: FETCH_FAIL, payload: error });
  }
};

export const updateAgainstPokemon = ({ selectedPokemonId, currentAgainstPokemonIndex }) => async (dispatch) => {
  dispatch({ type: UPDATE });
  try {
    await AsyncStorage.setItem(`againstPokemon${currentAgainstPokemonIndex}`, selectedPokemonId);
    dispatch({
      type: UPDATE_SUCCESS,
      payload: { selectedPokemonId, currentAgainstPokemonIndex },
    });
  } catch (error) {
    dispatch({ type: UPDATE_FAIL, payload: error });
  }
};

export const removeAgainstPokemon = () => async (dispatch) => {
  dispatch({ type: REMOVE });
  try {
    await AsyncStorage.multiRemove(AGAINST_POKEMON_KEYS);
    dispatch({ type: REMOVE_SUCCESS });
  } catch (error) {
    dispatch({ type: REMOVE_FAIL, payload: error });
  }
};
