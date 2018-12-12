import R from 'ramda';
import { createSelector } from 'reselect';

import { assignDefenceTypeEffective } from './againstPokemon';

export const selectAgainstPokemons = createSelector(
  s => s.againstPokemon.againstPokemonIds,
  s => s.pokemon.pokemons,
  s => s.pokemon.pokemonTypes,
  s => s.pokemon.typeEffectives,
  (againstPokemonIds, pokemons, pokemonTypes, typeEffectives) => {
    if (!againstPokemonIds || !pokemons || !pokemonTypes || !typeEffectives) return new Array(6).fill(undefined);
    return R.pipe(
      R.map(R.prop(R.__, pokemons)),
      R.map(assignDefenceTypeEffective(pokemonTypes, typeEffectives)),
      R.values,
    )(againstPokemonIds);
  },
);
