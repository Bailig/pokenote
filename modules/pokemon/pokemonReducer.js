import { LOAD_POKEMON } from './pokemonActions';

// reducer
const initialState = {
  pokemons: null,
  pokemonMoves: null,
  pokemonTypes: null,
  againstPokemonIds: new Array(6).fill(null),
  catchPokemonIds: [],
};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_POKEMON:
      return {
        ...state,
        ...payload,
      };
    default: return state;
  }
};
