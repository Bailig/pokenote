import R from 'ramda';
import {
  UPDATE_INDEX,
  FETCH_SUCCESS,
  UPDATE_SUCCESS,
  REMOVE_SUCCESS,
} from './againtPokemonActions';

const initialState = {
  againstPokemonIds: new Array(6).fill(null),
  currentAgainstPokemonIndex: null,
};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        againstPokemonIds: payload,
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        againstPokemonIds: R.update(payload.currentAgainstPokemonIndex, payload.selectedPokemonId, state.againstPokemonIds),
        currentAgainstPokemonIndex: null,
      };
    case UPDATE_INDEX:
      return { ...state, currentAgainstPokemonIndex: payload };
    case REMOVE_SUCCESS:
      return initialState;
    default: return state;
  }
};
