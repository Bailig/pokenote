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
