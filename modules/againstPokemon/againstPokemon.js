import R from 'ramda';

import { mapTypeEffectives } from '../pokemonType';
import { mapAgainstType } from '../typeEffective';
import { mapTypes } from '../pokemon';

const getTypeEffectives = (typeEffectives, typeProp, thisPokemon) => R.pipe(
  R.prop(typeProp),
  mapTypeEffectives(typeEffectives),
  R.prop('typeEffectives'),
  R.map(R.evolve({
    defenceScalar: R.pipe(R.multiply(1000), Math.round, R.divide(R.__, 10)),
    attackScalar: R.always(undefined),
  })),
)(thisPokemon);


const getAgainstTypes = R.curry((pokemonTypes, typeEffectives) => R.pipe(
  R.map(e => mapAgainstType(pokemonTypes, e)),
  R.map(e => R.assoc('defenceScalar', R.prop('defenceScalar', e), R.prop('againstType', e))),
  R.values,
)(typeEffectives));

const isVulnerableToType = R.pipe(
  R.prop('defenceScalar'),
  R.gt(R.__, 100),
);

const isResistantToType = R.pipe(
  R.prop('defenceScalar'),
  R.lt(R.__, 100),
);

const sortVulnerableToTypes = R.sortWith([
  R.descend(R.prop('defenceScalar')),
  R.ascend(R.prop('name')),
]);
const sortResistantToTypes = R.sortWith([
  R.ascend(R.prop('defenceScalar')),
  R.ascend(R.prop('name')),
]);

const getDefenceTypeEffective = R.curry((pokemonTypes, typeEffectives, thisPokemon) => {
  const pokemonWithTypes = mapTypes(pokemonTypes, thisPokemon);
  const typeEffectives1 = getTypeEffectives(typeEffectives, 'pokemonType1', pokemonWithTypes);

  if (!thisPokemon.pokemonTypeId2) {
    const vulnerableToTypes = R.pipe(
      R.pickBy(isVulnerableToType),
      getAgainstTypes(pokemonTypes),
      sortVulnerableToTypes,
    )(typeEffectives1);

    const resistantToTypes = R.pipe(
      R.pickBy(isResistantToType),
      getAgainstTypes(pokemonTypes),
      sortResistantToTypes,
    )(typeEffectives1);
    return { vulnerableToTypes, resistantToTypes };
  }
  const typeEffectives2 = getTypeEffectives(typeEffectives, 'pokemonType2', pokemonWithTypes);

  const mergedTypeEffectives = R.map(typeEffective2 => R.pipe(
    R.eqProps('againstTypeId'),
    R.pickBy(R.__, typeEffectives1),
    R.values,
    R.head,
    R.prop('defenceScalar'),
    R.multiply(R.prop('defenceScalar', typeEffective2)),
    R.divide(R.__, 10),
    Math.round,
    R.divide(R.__, 10),
    R.assoc('defenceScalar', R.__, typeEffective2),
  )(typeEffective2))(typeEffectives2);

  const vulnerableToTypes = R.pipe(
    R.pickBy(isVulnerableToType),
    getAgainstTypes(pokemonTypes),
    sortVulnerableToTypes,
  )(mergedTypeEffectives);

  const resistantToTypes = R.pipe(
    R.pickBy(isResistantToType),
    getAgainstTypes(pokemonTypes),
    sortResistantToTypes,
  )(mergedTypeEffectives);

  return { vulnerableToTypes, resistantToTypes };
});

export const assignDefenceTypeEffective = R.curry((pokemonTypes, typeEffectives, thisPokemon) => {
  if (R.isNil(thisPokemon)) return undefined;
  return R.pipe(
    getDefenceTypeEffective(pokemonTypes, typeEffectives),
    R.assoc('defenceTypeEffective', R.__, thisPokemon),
  )(thisPokemon);
});
