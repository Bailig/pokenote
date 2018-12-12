import R from 'ramda';
import { createSelector } from 'reselect';

import { mapTypes } from '../pokemon';

export const selectCatchPokemons = createSelector(
  s => s.catchPokemon.searchText,
  s => s.catchPokemon.catchPokemons,
  s => s.pokemon.pokemons,
  s => s.pokemon.fastMoves,
  s => s.pokemon.chargeMoves,
  s => s.pokemon.pokemonTypes,
  (searchText, catchPokemons, pokemons, fastMoves, chargeMoves, pokemonTypes) => {
    if (!catchPokemons || !pokemons || !fastMoves || !chargeMoves || !pokemonTypes) return [];
    if (!searchText) {
      const assignMoveTypeImageKey = move => R.pipe(
        R.prop('pokemonTypeId'),
        R.prop(R.__, pokemonTypes),
        R.prop('imageKey'),
        R.assoc('typeImageKey', R.__, move),
      )(move);

      return R.map(catchPokemon => R.pipe(
        R.prop('pokemonId'),
        R.prop(R.__, pokemons),
        mapTypes(pokemonTypes),
        R.assoc('selectedFastMove', R.pipe(
          R.prop('fastMoveId'),
          R.prop(R.__, fastMoves),
          assignMoveTypeImageKey,
        )(catchPokemon)),
        R.assoc('selectedChargeMove', R.pipe(
          R.prop('chargeMoveId'),
          R.prop(R.__, chargeMoves),
          assignMoveTypeImageKey,
        )(catchPokemon)),
      )(catchPokemon))(catchPokemons);
    }
    return [];
  },
);
