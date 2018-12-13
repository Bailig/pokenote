import R from 'ramda';
import {
  UPDATE_POKEMON_TO_ADD,
  FETCH_SUCCESS,
} from './catchPokemonActions';

const initialState = {
  catchPokemons: undefined,
  pokemonToAdd: {
    pokemonId: undefined,
    fastMoveId: undefined,
    chargeMoveId: undefined,
  },
};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_SUCCESS:
      return R.assoc('catchPokemons', payload, state);
    case UPDATE_POKEMON_TO_ADD:
      return R.assocPath(['pokemonToAdd', 'pokemonId'], payload, state);
    default: return state;
  }
};
