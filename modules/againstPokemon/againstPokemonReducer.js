
const initialState = {
  againstPokemonIds: new Array(6).fill(null),
};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    default: return state;
  }
};
