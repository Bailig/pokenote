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
      return {
        ...state,
        ...payload,
        pokemonFetched: true,
      };
    case FETCH_FAIL:
      return { ...state, pokemonFetched: false };
    case UPDATE:
      return {
        ...state,
        pokemons: {
          ...state.pokemons,
          [payload.id]: payload,
        },
      };
    default: return state;
  }
};
