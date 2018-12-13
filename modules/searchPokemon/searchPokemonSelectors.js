import R from 'ramda';
import { createSelector } from 'reselect';


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

    const sortByDex = R.pipe(
      R.values,
      R.sortBy(R.prop('dex')),
    );

    const filteredTypeId = R.pipe(
      R.pickBy(R.pipe(
        R.prop('name'),
        R.toLower,
        R.equals(R.toLower(searchText)),
      )),
      R.keys,
      R.head,
    )(pokemonTypes);

    if (R.isNil(filteredTypeId)) {
      return R.pipe(
        R.pickBy(R.pipe(
          R.prop('name'),
          R.toLower,
          R.includes(R.toLower(searchText)),
        )),
        sortByDex,
      )(pokemons);
    }

    return R.pipe(
      R.pickBy(pokemon => R.either(
        R.equals(pokemon.pokemonTypeId1),
        R.equals(pokemon.pokemonTypeId2),
      )(filteredTypeId)),
      sortByDex,
    )(pokemons);
  },
);
