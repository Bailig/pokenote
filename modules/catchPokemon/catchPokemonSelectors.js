import R from 'ramda';
import { createSelector } from 'reselect';

import * as pokemonModule from '../pokemon';

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
        pokemonModule.mapTypes(pokemonTypes),
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


export const selectDefaultFastMoveIdForPokemon = createSelector(
  (__, pokemonId) => pokemonId,
  s => s.pokemon.pokemons,
  s => s.pokemon.pokemonTypes,
  s => s.pokemon.pokemonFastMoves,
  s => s.pokemon.fastMoves,
  (pokemonId, pokemons, pokemonTypes, pokemonFastMoves, fastMoves) => {
    if (!pokemonId || !pokemons || !pokemonTypes || !pokemonFastMoves || !fastMoves) return undefined;
    const pokemon = R.prop(pokemonId, pokemons);
    return R.pipe(
      pokemonModule.mapFastMoves(fastMoves, pokemonFastMoves),
      R.prop('fastMoves'),
      R.values,
      R.sort(R.descend((move) => {
        const dps = move.damage / move.duration;
        const eps = move.energy / move.duration;
        if (move.pokemonTypeId === pokemon.pokemonTypeId1
          || move.pokemonTypeId === pokemon.pokemonTypeId2) {
          return dps * eps * 1.25;
        }
        return dps * eps;
      })),
      R.head,
      R.prop('id'),
    )(pokemon);
  },
);

export const selectDefaultChargeMoveIdForPokemon = createSelector(
  (__, pokemonId) => pokemonId,
  s => s.pokemon.pokemons,
  s => s.pokemon.pokemonTypes,
  s => s.pokemon.pokemonChargeMoves,
  s => s.pokemon.chargeMoves,
  (pokemonId, pokemons, pokemonTypes, pokemonChargeMoves, chargeMoves) => {
    if (!pokemonId || !pokemons || !pokemonTypes || !pokemonChargeMoves || !chargeMoves) return undefined;
    const pokemon = R.prop(pokemonId, pokemons);
    return R.pipe(
      pokemonModule.mapChargeMoves(chargeMoves, pokemonChargeMoves),
      R.prop('chargeMoves'),
      R.values,
      R.sort(R.descend((move) => {
        const dps = move.damage / move.duration;
        const dpe = move.damage / move.energy * -1;
        if (move.pokemonTypeId === pokemon.pokemonTypeId1
          || move.pokemonTypeId === pokemon.pokemonTypeId2) {
          return dps * dpe * 1.25;
        }
        return dps * dpe;
      })),
      R.head,
      R.prop('id'),
    )(pokemon);
  },
);
