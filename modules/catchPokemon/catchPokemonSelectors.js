import R from 'ramda';
import { createSelector } from 'reselect';

import {
  assignPokemonTypeImageKey,
  assignSelectedPokemonMoves,
} from '../pokemon';

export const selectPokemonToAdd = createSelector(
  s => s.catchPokemon.selectedPokemonToAddId,
  s => s.pokemon.pokemons,
  s => s.pokemon.pokemonMoves,
  s => s.pokemon.pokemonTypes,
  (id, pokemons, pokemonMoves, pokemonTypes) => {
    if (!id || !pokemons || !pokemonMoves || !pokemonTypes) return undefined;

    const pokemon = R.pipe(
      R.prop(id),
      assignSelectedPokemonMoves(pokemonMoves, pokemonTypes),
    )(pokemons);

    const assignPokemonTypeImageKeyForPokemonMove = assignPokemonTypeImageKey(pokemonMoves, pokemonTypes);
    return R.evolve({
      quickMoves: R.map(assignPokemonTypeImageKeyForPokemonMove),
      cinematicMoves: R.map(assignPokemonTypeImageKeyForPokemonMove),
    })(pokemon);
  },
);
