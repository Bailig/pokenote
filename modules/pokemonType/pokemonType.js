import R from 'ramda';

export const mapTypeEffectives = R.curry((typeEffectives, thisType) => R.pipe(
  R.prop('id'),
  R.propEq('pokemonTypeId'),
  R.pickBy(R.__, typeEffectives),
  R.assoc('typeEffectives', R.__, thisType),
)(thisType));
