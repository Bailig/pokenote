import R from 'ramda';
import { FETCH_SUCCESS, UPDATE, FETCH_FAIL } from './pokemonActions';

// reducer
const initialState = {
  pokemons: null,
  pokemonMoves: null,
  pokemonTypes: null,
  pokemonFetched: null,
};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_SUCCESS:
      return R.mergeAll([state, payload, { pokemonFetched: true }]);
    case FETCH_FAIL:
      return R.assoc('pokemonFetched', false, state);
    case UPDATE:
      return R.assocPath(['pokemons', payload.id], payload, state);
    default: return state;
  }
};
