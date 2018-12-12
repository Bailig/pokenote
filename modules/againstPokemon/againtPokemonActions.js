import R from 'ramda';
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

const fetchAgainstPokemonIdsFromAsyncStorage = async () => {
  const againstPokemonIds = JSON.parse(await AsyncStorage.getItem('againstPokemonIds'));
  return R.defaultTo(new Array(6).fill(undefined), againstPokemonIds);
};

const updateAgainstPokemonIds = async (index, pokemonId) => {
  const againstPokemonIds = await fetchAgainstPokemonIdsFromAsyncStorage();
  const updatedAgainstPokemonIds = R.update(index, pokemonId, againstPokemonIds);
  await AsyncStorage.setItem('againstPokemonIds', JSON.stringify(updatedAgainstPokemonIds));
  return Promise.resolve(updatedAgainstPokemonIds);
};

export const updateAgainstPokemonIndex = index => ({ type: UPDATE_INDEX, payload: index });

export const fetchAgainstPokemon = () => async (dispatch) => {
  dispatch({ type: FETCH });
  try {
    const againstPokemonIds = await fetchAgainstPokemonIdsFromAsyncStorage();
    dispatch({
      type: FETCH_SUCCESS,
      payload: againstPokemonIds,
    });
  } catch (error) {
    dispatch({ type: FETCH_FAIL, payload: error });
  }
};

export const updateAgainstPokemon = selectedPokemonId => async (dispatch, getState) => {
  dispatch({ type: UPDATE });
  const { againstPokemon: { currentAgainstPokemonIndex } } = getState();
  try {
    const updatedAgainstPokemonIds = await updateAgainstPokemonIds(currentAgainstPokemonIndex, selectedPokemonId);
    dispatch({
      type: UPDATE_SUCCESS,
      payload: updatedAgainstPokemonIds,
    });
  } catch (error) {
    dispatch({ type: UPDATE_FAIL, payload: error });
  }
};

export const removeAgainstPokemon = () => async (dispatch) => {
  dispatch({ type: REMOVE });
  try {
    await AsyncStorage.removeItem('againstPokemonIds');
    dispatch({ type: REMOVE_SUCCESS });
  } catch (error) {
    dispatch({ type: REMOVE_FAIL, payload: error });
  }
};
