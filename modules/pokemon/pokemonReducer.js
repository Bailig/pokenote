import { FETCH_SUCCESS, UPDATE } from './pokemonActions';

// reducer
const initialState = {
  pokemons: null,
  pokemonMoves: null,
  pokemonTypes: null,
};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        ...payload,
      };
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
