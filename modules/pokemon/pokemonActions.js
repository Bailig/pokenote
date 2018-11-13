import { fetch } from '../app';
import { fetchDownloadURL } from './pokemonServices';

export const FETCH = 'pokemon/FETCH';
export const FETCH_SUCCESS = 'pokemon/FETCH_SUCCESS';
export const FETCH_FAIL = 'pokemon/FETCH_FAIL';
export const UPDATE = 'pokemon/UPDATE';

const fetchPokemonImageUrl = pokemons => async (dispatch) => {
  if (!pokemons) return;
  const promises = Object.values(pokemons).map(async (pokemon) => {
    const imageUrl = await fetchDownloadURL(`pokemon/${pokemon.dex}.png`);
    dispatch({
      type: UPDATE,
      payload: { ...pokemon, imageUrl },
    });
  });
  await Promise.all(promises);
};

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
