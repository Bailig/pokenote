import R from 'ramda';
import { createSelector } from 'reselect';
import { isTypeName } from '../pokemon/pokemonTypeServices';
import { isPokemonTypeNameEqual, isPokemonNameIncludes } from '../pokemon/pokemonServices';


export const selectPokemons = createSelector(
  s => s.pokemon.pokemons,
  s => s.pokemon.pokemonTypes,
  s => s.searchPokemon.searchText,
  (pokemons, pokemonTypes, searchText) => {
    if (!pokemons || !pokemonTypes) return [];
    if (!searchText) {
      return R.pipe(
        R.values,
        R.sortBy(R.prop('dex')),
      )(pokemons);
    }
    const filteredPokemons = isTypeName(searchText, pokemonTypes)
      ? R.pickBy(isPokemonTypeNameEqual(pokemonTypes, searchText), pokemons)
      : R.pickBy(isPokemonNameIncludes(searchText), pokemons);

    return R.pipe(
      R.values,
      R.sortBy(R.prop('dex')),
    )(filteredPokemons);
  },
);
