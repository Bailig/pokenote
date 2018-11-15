import { fetch } from '../app';

export const FETCH = 'pokemon/FETCH';
export const FETCH_SUCCESS = 'pokemon/FETCH_SUCCESS';
export const FETCH_FAIL = 'pokemon/FETCH_FAIL';
export const UPDATE = 'pokemon/UPDATE';

export const fetchPokemon = () => async (dispatch, getState) => {
  const { pokemon } = getState();
  if (pokemon.pokemons && pokemon.pokemonMoves && pokemon.pokemonTypes) return;
  dispatch({ type: FETCH });
  try {
    const [pokemons, pokemonMoves, pokemonTypes] = await Promise.all([
      fetch('pokemon'),
      fetch('pokemonMove'),
      fetch('pokemonType'),
    ]);
    dispatch({
      type: FETCH_SUCCESS,
      payload: {
        pokemons,
        pokemonMoves,
        pokemonTypes,
      },
    });
  } catch (error) {
    dispatch({ type: FETCH_FAIL, payload: error });
  }
};
