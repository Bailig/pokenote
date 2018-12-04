import R from 'ramda';
import { toPercent } from '../../util/util';

const getAttachScaler = (pokemonTypeId, thisPokemonType) => {
  const typeEffectives = R.prop('typeEffective', thisPokemonType);
  const typeEffective = R.find(R.propEq('id', pokemonTypeId), typeEffectives);
  return R.prop('attackScalar', typeEffective);
};

export const getDefenceScalar = R.curry((pokemonTypes, thisPokemonType) => {
  const pokemonTypeId1 = R.compose(R.prop('id'), R.head)(pokemonTypes);
  const pokemonTypeId2 = R.compose(R.prop('id'), R.nth(1))(pokemonTypes);
  const attackScalar1 = getAttachScaler(pokemonTypeId1, thisPokemonType);
  if (!pokemonTypeId2) {
    return toPercent(attackScalar1);
  }
  const attackScalar2 = getAttachScaler(pokemonTypeId2, thisPokemonType);
  return R.pipe(
    R.multiply(attackScalar2),
    toPercent,
  )(attackScalar1);
});
