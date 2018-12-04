import * as uut from './pokemonTypeServices';
import * as testData from '../../data/testData';

describe('pokemon type services', () => {
  const bulbasaur = testData.getPokemon();
  const pokemonTypes = testData.getPokemonTypes();

  it('getDefenceScalar() should return 140', () => {
    expect(uut.getDefenceScalar(bulbasaur.pokemonTypes, pokemonTypes.POKEMON_TYPE_FIRE)).toEqual(140);
  });

  it('getDefenceScalar() should return 51', () => {
    expect(uut.getDefenceScalar(bulbasaur.pokemonTypes, pokemonTypes.POKEMON_TYPE_GRASS)).toEqual(51);
  });
});
