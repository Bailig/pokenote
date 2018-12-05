import R from 'ramda';
import { getDefenceScalar, assignPokemonTypeImageKey } from './pokemonTypeServices';


export const isVulnerableToType = R.curry((thisPokemonTypes, pokemonType) => R.pipe(
  getDefenceScalar(thisPokemonTypes),
  R.gt(R.__, 100),
)(pokemonType));

export const isResistantToType = R.curry((thisPokemonTypes, pokemonType) => R.pipe(
  getDefenceScalar(thisPokemonTypes),
  R.lt(R.__, 100),
)(pokemonType));

const assignDefenceScalar = R.curry((thisPokemonTypes, pokemonType) => {
  const defenceScalar = getDefenceScalar(thisPokemonTypes, pokemonType);
  return R.pipe(
    R.dissoc('typeEffective'),
    R.assoc('defenceScalar', defenceScalar),
  )(pokemonType);
});

export const getDefenceTypeEffective = R.curry((pokemonTypes, thisPokemon) => {
  const thisPokemonTypes = R.prop('pokemonTypes', thisPokemon);
  const pokemonTypesArray = R.values(pokemonTypes);

  const vulnerableToTypes = R.pipe(
    R.filter(isVulnerableToType(thisPokemonTypes)),
    R.map(assignDefenceScalar(thisPokemonTypes)),
    R.sort(R.descend(R.prop('defenceScalar'))),
  )(pokemonTypesArray);

  const resistantToTypes = R.pipe(
    R.filter(isResistantToType(thisPokemonTypes)),
    R.map(assignDefenceScalar(thisPokemonTypes)),
    R.sort(R.ascend(R.prop('defenceScalar'))),
  )(pokemonTypesArray);

  return { vulnerableToTypes, resistantToTypes };
});

export const assignDefenceTypeEffective = R.curry((pokemonTypes, thisPokemon) => {
  if (R.isNil(thisPokemon)) return undefined;
  const defenceTypeEffective = getDefenceTypeEffective(pokemonTypes, thisPokemon);
  return R.assoc('defenceTypeEffective', defenceTypeEffective, thisPokemon);
});

const getSelectedPokemonMove = R.curry((pokemonMoves, pokemonTypes, thisPokemonMoves) => (
  R.pipe(
    R.find(R.propEq('selected', true)),
    assignPokemonTypeImageKey(pokemonMoves, pokemonTypes),
  )(thisPokemonMoves)
));

const getSelectedPokemonMoves = R.curry((pokemonMoves, pokemonTypes, thisPokemon) => {
  const getSelectedPokemonMoveFromPokemonMoves = getSelectedPokemonMove(pokemonMoves, pokemonTypes);
  const quickMove = getSelectedPokemonMoveFromPokemonMoves(thisPokemon.quickMoves);
  const cinematicMove = getSelectedPokemonMoveFromPokemonMoves(thisPokemon.cinematicMoves);
  return [quickMove, cinematicMove];
});

export const assignSelectedPokemonMoves = R.curry((pokemonMoves, pokemonTypes, thisPokemon) => {
  const selectedPokemonMoves = getSelectedPokemonMoves(pokemonMoves, pokemonTypes, thisPokemon);
  return R.assoc('selectedPokemonMoves', selectedPokemonMoves, thisPokemon);
});
