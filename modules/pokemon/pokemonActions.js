import { fetch } from '../app/appServices';

export const FETCH = 'pokemon/FETCH';
export const FETCH_SUCCESS = 'pokemon/FETCH_SUCCESS';
export const FETCH_FAIL = 'pokemon/FETCH_FAIL';
export const UPDATE = 'pokemon/UPDATE';
export const UPDATE_SELECTED_POKEMON_MOVE = 'catchPokemon/UPDATE_SELECTED_POKEMON_MOVE';

export const fetchPokemon = () => async (dispatch, getState) => {
  const { pokemon } = getState();
  if (pokemon.pokemons && pokemon.pokemonMoves && pokemon.pokemonTypes) return;
  dispatch({ type: FETCH });
  try {
    const [
      pokemons,
      fastMoves,
      chargeMoves,
      pokemonTypes,
      typeEffectives,
      pokemonFastMoves,
      pokemonChargeMoves,
    ] = await Promise.all([
      fetch('pokemon'),
      fetch('fastMove'),
      fetch('chargeMove'),
      fetch('pokemonType'),
      fetch('typeEffective'),
      fetch('pokemonFastMove'),
      fetch('pokemonChargeMove'),
    ]);
    dispatch({
      type: FETCH_SUCCESS,
      payload: {
        pokemons,
        fastMoves,
        chargeMoves,
        pokemonTypes,
        typeEffectives,
        pokemonFastMoves,
        pokemonChargeMoves,
      },
    });
  } catch (error) {
    dispatch({ type: FETCH_FAIL, payload: error });
  }
};


// export const updateSelectedPokemonMove = pokemonMoveId => (dispatch, getState) => {
//   const pokemonMoveType = R.ifElse(
//     R.includes('_FAST'),
//     R.always('quickMoves'),
//     R.always('cinematicMoves'),
//   )(pokemonMoveId);

//   const selectedPokemon = selectPokemonToAdd(getState());

//   dispatch({
//     type: UPDATE_SELECTED_POKEMON_MOVE,
//     payload: { selectedPokemonToAddId, pokemonMoveType, pokemonMoveId },
//   });
// };
