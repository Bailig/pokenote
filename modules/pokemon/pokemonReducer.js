import R from 'ramda';
import { FETCH_SUCCESS, UPDATE, FETCH_FAIL } from './pokemonActions';

const initialState = {
  pokemons: undefined,
  fastMoves: undefined,
  chargeMoves: undefined,
  pokemonTypes: undefined,
  typeEffectives: undefined,
  pokemonFastMoves: undefined,
  pokemonChargeMoves: undefined,
  pokemonFetched: undefined,
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
