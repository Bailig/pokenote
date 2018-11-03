import _ from 'lodash';
import { createSelector } from 'reselect';
import { LOAD_POKEMON } from './pokemonActions';

// reducer
const initialState = {
  pokemons: null,
  pokemonMoves: null,
  pokemonTypes: null,
  againstPokemonIds: [],
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

// selectors
// const selectAgainstPokemons = createSelector(
//   s => s.pokemon.againstPokemonIds,
//   s => s.pokemon.pokemons,
//   s => s.pokemon.pokemonTypes,
//   (againstPokemonIds, pokemons, pokemonTypes) => {
//     if (!againstPokemonIds || !pokemons || !pokemonTypes) return [];
//     const againstPokemons = _.pick(pokemons, againstPokemonIds);

//   },
// );
