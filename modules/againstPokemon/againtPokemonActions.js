
export const UPDATE = 'againstPokemon/UPDATE';
export const UPDATE_INDEX = 'againstPokemon/UPDATE_INDEX';

export const updateAgainstPokemonIndex = index => ({ type: UPDATE_INDEX, payload: index });

export const updateAgainstPokemon = ({ selectedPokemonId, currentAgainstPokemonIndex }) => ({
  type: UPDATE,
  payload: { selectedPokemonId, currentAgainstPokemonIndex },
});
