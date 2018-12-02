import R from 'ramda';
import { createSelector } from 'reselect';

import { assignDefenceTypeEffective } from '../pokemon/pokemonServices';


export const selectAgainstPokemons = createSelector(
  s => s.againstPokemon.againstPokemonIds,
  s => s.pokemon.pokemons,
  s => s.pokemon.pokemonTypes,
  (againstPokemonIds, pokemons, pokemonTypes) => {
    if (!pokemons || !pokemonTypes) return undefined;
    const againstPokemons = R.map(id => pokemons[id], againstPokemonIds);
    return R.map(assignDefenceTypeEffective(pokemonTypes), againstPokemons);
  },
);
