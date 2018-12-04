import * as testData from '../../data/testData';
import * as uut from './pokemonServices';
import { getDefenceScalar } from './pokemonTypeServices';

jest.mock('./pokemonTypeServices');

describe('pokemon services', () => {
  const bulbasaur = testData.getPokemon();
  const pokemonTypes = testData.getPokemonTypes();
  const defenceTypeEffective = testData.getDefenceTypeEffective();

  beforeEach(() => {
    getDefenceScalar.mockImplementation(testData.getDefenceScalar);
  });

  it('isVulnerableToType() should return true', () => {
    expect(uut.isVulnerableToType(bulbasaur.pokemonTypes, pokemonTypes.POKEMON_TYPE_FIRE)).toEqual(true);
  });

  it('isVulnerableToType() should return false', () => {
    expect(uut.isVulnerableToType(bulbasaur.pokemonTypes, pokemonTypes.POKEMON_TYPE_GRASS)).toEqual(false);
  });

  it('isResistantToType() should return true', () => {
    expect(uut.isResistantToType(bulbasaur.pokemonTypes, pokemonTypes.POKEMON_TYPE_GRASS)).toEqual(true);
  });

  it('isResistantToType() should return false', () => {
    expect(uut.isResistantToType(bulbasaur.pokemonTypes, pokemonTypes.POKEMON_TYPE_FIRE)).toEqual(false);
  });

  it('getDefenceTypeEffective() should return defenceTypeEffective', () => {
    const result = defenceTypeEffective;
    expect(uut.getDefenceTypeEffective(pokemonTypes, bulbasaur)).toEqual(result);
  });

  it('assignDefenceTypeEffective() should return pokemon with defenceTypeEffective', () => {
    const result = {
      ...bulbasaur,
      defenceTypeEffective,
    };
    expect(uut.assignDefenceTypeEffective(pokemonTypes, bulbasaur)).toEqual(result);
  });
});
