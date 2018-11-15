import _ from 'lodash';
import { createSelector } from 'reselect';

export const selectPokemons = createSelector(
  s => s.pokemon.pokemons,
  s => s.searchPokemon.searchText,
  (pokemons, seatchText) => {
    const lowerCaseSearchText = seatchText.toLowerCase();
    const filteredPokemons = _.pickBy(pokemons, (pokemon) => {
      if (pokemon.name.toLowerCase().indexOf(lowerCaseSearchText) !== -1) return true;
      if (pokemon.pokemonTypes[0]
        && pokemon.pokemonTypes[0].name.toLowerCase() === lowerCaseSearchText) return true;
      if (pokemon.pokemonTypes[1]
        && pokemon.pokemonTypes[1].name.toLowerCase() === lowerCaseSearchText) return true;
      return false;
    });
    return _.orderBy(filteredPokemons, 'dex');
  },
);
