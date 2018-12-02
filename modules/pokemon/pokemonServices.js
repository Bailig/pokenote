import R from 'ramda';
import { getDefenceScalar } from './pokemonTypeServices';

const isVulnerableToType = R.gt(R.__, 100);
const isResistantToType = R.lt(R.__, 100);

const assignDefenceScalar = (defenceScaler, pokemonType) => R.compose(R.assoc('defenceScalar', defenceScaler), R.dissoc('typeEffective'))(pokemonType);


export const getDefenceTypeEffective = (pokemonTypes, thisPokemon) => {
  let vulnerableToTypes = [];
  let resistantToTypes = [];
  R.forEach((pokemonType) => {
    const defenceScaler = getDefenceScalar(R.prop('pokemonTypes', thisPokemon), pokemonType);
    const newPokemonType = assignDefenceScalar(defenceScaler, pokemonType);
    if (isVulnerableToType(defenceScaler)) vulnerableToTypes = R.append(newPokemonType, vulnerableToTypes);
    if (isResistantToType(defenceScaler)) resistantToTypes = R.append(newPokemonType, resistantToTypes);
  }, R.values(pokemonTypes));
  return {
    vulnerableToTypes: R.sort(R.descend(R.prop('defenceScalar')), vulnerableToTypes),
    resistantToTypes: R.sort(R.ascend(R.prop('defenceScalar')), resistantToTypes),
  };
};

export const assignDefenceTypeEffective = R.curry((pokemonTypes, thisPokemon) => {
  if (R.isNil(thisPokemon)) return undefined;
  const defenceTypeEffective = getDefenceTypeEffective(pokemonTypes, thisPokemon);
  return R.assoc('defenceTypeEffective', defenceTypeEffective, thisPokemon);
});
