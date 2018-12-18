import R from 'ramda';
import {
  UPDATE_ADD_POKEMON,
  UPDATE_ADD_POKEMON_MOVE,
  FETCH_SUCCESS,
  SAVE_ADD_POKEMON_SUCCESS,
} from './catchPokemonActions';

const initialState = {
  catchPokemons: undefined,
  addPokemon: {
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
    case UPDATE_ADD_POKEMON:
      return R.evolve({
        addPokemon: {
          pokemonId: R.always(payload.pokemonId),
          fastMoveId: R.always(payload.fastMoveId),
          chargeMoveId: R.always(payload.chargeMoveId),
        },
      }, state);
    case UPDATE_ADD_POKEMON_MOVE:
      return R.assocPath(['addPokemon', payload.moveProp], payload.value, state);
    case SAVE_ADD_POKEMON_SUCCESS:
      return R.assoc('catchPokemons', payload, state);
    default: return state;
  }
};
