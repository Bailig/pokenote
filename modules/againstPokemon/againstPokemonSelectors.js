import _ from 'lodash';
import R from 'ramda';
import { createSelector } from 'reselect';

// const getDefenceScalar = ({ pokemonTypeId, pokemonTypeId2, pokemonType }) => {
//   const attackScalar1 = pokemonType.typeEffective.filter(t => t.id === pokemonTypeId)[0].attackScalar;
//   let defenceScalar;
//   if (!pokemonTypeId2) {
//     defenceScalar = attackScalar1;
//   } else {
//     const attackScalar2 = pokemonType.typeEffective.filter(t => t.id === pokemonTypeId2)[0].attackScalar;
//     defenceScalar = attackScalar2 * attackScalar1;
//   }
//   return Math.round(defenceScalar * 1000) / 10;
// };

// export const getDefenceTypeEffective = ({ pokemonTypeId, pokemonTypeId2, pokemonTypes }) => {
//   if (!pokemonTypeId) return null;
//   if (!pokemonTypes) {
//     console.error(`Error: pokemonTypes: array, but ${pokemonTypes} found.`);
//     return null;
//   }
//   let defenceTypeEffective = {
//     vulnerableToTypes: [],
//     resistantToTypes: [],
//   };
//   _.forEach(pokemonTypes, (pokemonType) => {
//     const { id, name } = pokemonType;
//     const newPokemonType = { id, name, imageKey: name.toLowerCase() };
//     const defenceScalar = getDefenceScalar({ pokemonTypeId, pokemonTypeId2, pokemonType });
//     let effectiveType;
//     if (defenceScalar > 100) effectiveType = 'vulnerableToTypes';
//     if (defenceScalar < 100) effectiveType = 'resistantToTypes';
//     if (!effectiveType) return;
//     defenceTypeEffective = {
//       ...defenceTypeEffective,
//       [effectiveType]: [...defenceTypeEffective[effectiveType], { ...newPokemonType, defenceScalar }],
//     };
//   });
//   defenceTypeEffective = {
//     ...defenceTypeEffective,
//     vulnerableToTypes: _.orderBy(defenceTypeEffective.vulnerableToTypes, 'defenceScalar', 'desc'),
//     resistantToTypes: _.orderBy(defenceTypeEffective.resistantToTypes, 'defenceScalar', 'asc'),
//   };
//   return defenceTypeEffective;
// };

// export const getPokemonTypeIds = (pokemon) => {
//   if (!pokemon) return null;
//   const { pokemonTypes } = pokemon;
//   const pokemonTypeId = pokemonTypes.length > 0 ? pokemon.pokemonTypes[0].id : null;
//   const pokemonTypeId2 = pokemonTypes.length > 1 ? pokemon.pokemonTypes[1].id : null;
//   return { pokemonTypeId, pokemonTypeId2 };
// };


const findByProp = R.curry((prop, value, data) => R.find(R.propEq(prop, value), data));
const findById = findByProp('id');
const getAttackScalarByPokemonTypeId = R.curry((id, data) => findById(id, data).attackScalar);

export const getDefenceScalar = (pokemonTypeId1, pokemonTypeId2, pokemonType) => {
  let defenceScalar;
  const getAttackScalarByPokemonTypeIdFromTypeEffective = getAttackScalarByPokemonTypeId(R.__, pokemonType.typeEffective);
  const attackScalar1 = getAttackScalarByPokemonTypeIdFromTypeEffective(pokemonTypeId1);
  if (!pokemonTypeId2) {
    defenceScalar = attackScalar1;
  } else {
    const attackScalar2 = getAttackScalarByPokemonTypeIdFromTypeEffective(pokemonTypeId2);
    defenceScalar = attackScalar2 * attackScalar1;
  }
  return Math.round(defenceScalar * 1000) / 10;
};


export const assignDefenceTypeEffective = R.curry((pokemonTypes, pokemon) => {
  if (!pokemon) return null;
  let vulnerableToTypes = [];
  let resistantToTypes = [];
  const pokemonTypeId1 = pokemon.pokemonTypes[0].id;
  const pokemonTypeId2 = pokemon.pokemonTypes.length > 1 ? pokemon.pokemonTypes[1].id : null;
  R.forEach((pokemonType) => {
    const defenceScalar = getDefenceScalar(pokemonTypeId1, pokemonTypeId2, pokemonType);
    const newPokemonType = { ...R.omit(['typeEffective'], pokemonType), defenceScalar };
    if (defenceScalar > 100) vulnerableToTypes = [...vulnerableToTypes, newPokemonType];
    if (defenceScalar < 100) resistantToTypes = [...resistantToTypes, newPokemonType];
  }, pokemonTypes);
  return {
    ...pokemon,
    defenceTypeEffective: {
      vulnerableToTypes: R.sortBy(R.compose(R.multiply(-1), R.prop('defenceScalar')), vulnerableToTypes),
      resistantToTypes: R.sortBy(R.prop('defenceScalar'), resistantToTypes),
    },
  };
});

export const selectAgainstPokemons = createSelector(
  s => s.againstPokemon.againstPokemonIds,
  s => s.pokemon.pokemons,
  s => s.pokemon.pokemonTypes,
  (againstPokemonIds, pokemons, pokemonTypes) => {
    if (!pokemons || !pokemonTypes) return undefined;
    //  find against pokemons by against pokemon ids from pokemons
    const againstPokemons = R.map(id => pokemons[id], againstPokemonIds);
    //  asign defenceTypeEffective to the against pokemons
    return R.map(assignDefenceTypeEffective(R.values(pokemonTypes)), againstPokemons);


    // const againstPokemons = againstPokemonIds.map(id => pokemons[id]);
    // return _.map(againstPokemons, (againstPokemon) => {
    //   if (!againstPokemon) return null;
    //   const pokemonTypeIds = getPokemonTypeIds(againstPokemon);
    //   const defenceTypeEffective = getDefenceTypeEffective({ ...pokemonTypeIds, pokemonTypes });
    //   return { ...againstPokemon, defenceTypeEffective };
    // });
  },
);
