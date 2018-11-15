import _ from 'lodash';
import { createSelector } from 'reselect';

const getDefenceScalar = ({ pokemonTypeId, pokemonTypeId2, pokemonType }) => {
  const attackScalar1 = pokemonType.typeEffective.filter(t => t.id === pokemonTypeId)[0].attackScalar;
  let defenceScalar;
  if (!pokemonTypeId2) {
    defenceScalar = attackScalar1;
  } else {
    const attackScalar2 = pokemonType.typeEffective.filter(t => t.id === pokemonTypeId2)[0].attackScalar;
    defenceScalar = attackScalar2 * attackScalar1;
  }
  return Math.round(defenceScalar * 1000) / 10;
};

export const getDefenceTypeEffective = ({ pokemonTypeId, pokemonTypeId2, pokemonTypes }) => {
  if (!pokemonTypeId) return null;
  if (!pokemonTypes) {
    console.error(`Error: pokemonTypes: array, but ${pokemonTypes} found.`);
    return null;
  }
  let defenceTypeEffective = {
    vulnerableToTypes: [],
    resistantToTypes: [],
  };
  _.forEach(pokemonTypes, (pokemonType) => {
    const { id, name } = pokemonType;
    const newPokemonType = { id, name, imageKey: name.toLowerCase() };
    const defenceScalar = getDefenceScalar({ pokemonTypeId, pokemonTypeId2, pokemonType });
    let effectiveType;
    if (defenceScalar > 100) effectiveType = 'vulnerableToTypes';
    if (defenceScalar < 100) effectiveType = 'resistantToTypes';
    if (!effectiveType) return;
    defenceTypeEffective = {
      ...defenceTypeEffective,
      [effectiveType]: [...defenceTypeEffective[effectiveType], { ...newPokemonType, defenceScalar }],
    };
  });
  defenceTypeEffective = {
    ...defenceTypeEffective,
    vulnerableToTypes: _.orderBy(defenceTypeEffective.vulnerableToTypes, 'defenceScalar', 'desc'),
    resistantToTypes: _.orderBy(defenceTypeEffective.resistantToTypes, 'defenceScalar', 'asc'),
  };
  return defenceTypeEffective;
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
