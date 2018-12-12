import R from 'ramda';

export const mapAgainstType = R.curry((pokemonTypes, thisTypeEffective) => R.pipe(
  R.prop('againstTypeId'),
  R.prop(R.__, pokemonTypes),
  R.assoc('againstType', R.__, thisTypeEffective),
)(thisTypeEffective));
