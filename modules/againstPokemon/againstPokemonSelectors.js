import _ from 'lodash';
import { createSelector } from 'reselect';

export const getDefenceTypeEffective = ({ pokemonTypeId, pokemonTypeId2, pokemonTypes }) => {
  if (!pokemonTypeId) return null;
  if (!pokemonTypes) {
    console.error(`Error: pokemonTypes: array, but ${pokemonTypes} found.`);
    return null;
  }
  let defenceTypeEffective = {};
  _.forEach(pokemonTypes, (pokemonType) => {
    const attackScalar1 = pokemonType.typeEffective.filter(t => t.id === pokemonTypeId)[0].attackScalar;
    const { id, name } = pokemonType;
    defenceTypeEffective = { ...defenceTypeEffective, [id]: { id, name } };
    if (!pokemonTypeId2) {
      defenceTypeEffective = {
        ...defenceTypeEffective,
        [id]: { ...defenceTypeEffective[id], defenceScalar: attackScalar1 },
      };
    } else {
      const attackScalar2 = pokemonType.typeEffective.filter(t => t.id === pokemonTypeId2)[0].attackScalar;
      const defenceScalar = Math.round(attackScalar2 * attackScalar1 * 1000) / 1000;
      defenceTypeEffective = {
        ...defenceTypeEffective,
        [id]: { ...defenceTypeEffective[id], defenceScalar },
      };
    }
  });
  return _.pickBy(defenceTypeEffective, d => d.defenceScalar !== 1);
};

export const getPokemonTypeIds = (pokemon) => {
  if (!pokemon) return null;
  const { pokemonTypes } = pokemon;
  const pokemonTypeId = pokemonTypes.length > 0 ? pokemon.pokemonTypes[0].id : null;
  const pokemonTypeId2 = pokemonTypes.length > 1 ? pokemon.pokemonTypes[1].id : null;
  return { pokemonTypeId, pokemonTypeId2 };
};

export const selectAgainstPokemons = createSelector(
  s => s.againstPokemon.againstPokemonIds,
  s => s.pokemon.pokemons,
  s => s.pokemon.pokemonTypes,
  (againstPokemonIds, pokemons, pokemonTypes) => {
    if (!pokemons || !pokemonTypes) return undefined;
    const againstPokemons = againstPokemonIds.map(id => pokemons[id]);
    return _.map(againstPokemons, (againstPokemon) => {
      if (!againstPokemon) return null;
      const pokemonTypeIds = getPokemonTypeIds(againstPokemon);
      const defenceTypeEffective = getDefenceTypeEffective({ ...pokemonTypeIds, pokemonTypes });
      return { ...againstPokemon, defenceTypeEffective };
    });
  },
);
