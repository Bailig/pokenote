import { FETCH_SUCCESS } from './pokemonActions';

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
    default: return state;
  }
};
