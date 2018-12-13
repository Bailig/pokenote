import R from 'ramda';

const mapType1 = R.curry((pokemonTypes, thisPokemon) => {
  const pokemonTypeId1 = R.prop('pokemonTypeId1', thisPokemon);
  if (R.isNil(pokemonTypeId1)) return thisPokemon;
  return R.pipe(
    R.prop(R.__, pokemonTypes),
    R.assoc('pokemonType1', R.__, thisPokemon),
  )(pokemonTypeId1);
});

const mapType2 = R.curry((pokemonTypes, thisPokemon) => {
  const pokemonTypeId2 = R.prop('pokemonTypeId2', thisPokemon);
  if (R.isNil(pokemonTypeId2)) return thisPokemon;
  return R.pipe(
    R.prop(R.__, pokemonTypes),
    R.assoc('pokemonType2', R.__, thisPokemon),
  )(pokemonTypeId2);
});

export const mapTypes = R.curry((pokemonTypes, thisPokemon) => R.pipe(
  mapType1(pokemonTypes),
  mapType2(pokemonTypes),
)(thisPokemon));

export const mapFastMoves = R.curry((fastMoves, pokemonFastMoves, thisPokemon) => R.pipe(
  R.prop('id'),
  R.propEq('pokemonId'),
  R.pickBy(R.__, pokemonFastMoves),
  R.map(R.pipe(
    R.prop('fastMoveId'),
    R.prop(R.__, fastMoves),
  )),
  R.values,
  R.indexBy(R.prop('id')),
  R.assoc('fastMoves', R.__, thisPokemon),
)(thisPokemon));

export const mapChargeMoves = R.curry((chargeMoves, pokemonChargeMoves, thisPokemon) => R.pipe(
  R.prop('id'),
  R.propEq('pokemonId'),
  R.pickBy(R.__, pokemonChargeMoves),
  R.map(R.pipe(
    R.prop('chargeMoveId'),
    R.prop(R.__, chargeMoves),
  )),
  R.values,
  R.indexBy(R.prop('id')),
  R.assoc('chargeMoves', R.__, thisPokemon),
)(thisPokemon));
