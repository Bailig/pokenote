import R from 'ramda';

const getAttachScaler = (pokemonTypeId, typeEffectives) => {
  const typeEffective = R.find(R.propEq('id', pokemonTypeId), typeEffectives);
  return R.prop('attackScalar', typeEffective);
};

export const getDefenceScalar = R.curry((pokemonTypes = [], thisPokemonType) => {
  const pokemonTypeId1 = R.compose(R.prop('id'), R.head)(pokemonTypes);
  const pokemonTypeId2 = R.compose(R.prop('id'), R.nth(1))(pokemonTypes);
  let defenceScalar;
  const attackScalar1 = getAttachScaler(pokemonTypeId1, thisPokemonType.typeEffective);
  if (!pokemonTypeId2) {
    defenceScalar = attackScalar1;
  } else {
    const attackScalar2 = getAttachScaler(pokemonTypeId2, thisPokemonType.typeEffective);
    defenceScalar = attackScalar2 * attackScalar1;
  }
  return Math.round(defenceScalar * 1000) / 10;
});
