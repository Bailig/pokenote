import { UPDATE_INDEX } from './againtPokemonActions';

const initialState = {
  againstPokemonIds: new Array(6).fill(null),
  currentAgainstPokemonIndex: null,
};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_INDEX:
      return { ...state, currentAgainstPokemonIndex: payload };
    default: return state;
  }
};
