import R from 'ramda';
import {
  UPDATE_INDEX,
  FETCH_SUCCESS,
  UPDATE_SUCCESS,
  REMOVE_SUCCESS,
} from './againtPokemonActions';

const initialState = {
  againstPokemonIds: new Array(6).fill(undefined),
  currentAgainstPokemonIndex: undefined,
};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_SUCCESS:
      return R.assoc('againstPokemonIds', payload, state);
    case UPDATE_SUCCESS:
      return R.evolve({
        againstPokemonIds: R.update(payload.currentAgainstPokemonIndex, payload.selectedPokemonId),
        currentAgainstPokemonIndex: R.always(undefined),
      })(state);
    case UPDATE_INDEX:
      return R.assoc('currentAgainstPokemonIndex', payload, state);
    case REMOVE_SUCCESS:
      return initialState;
    default: return state;
  }
};
