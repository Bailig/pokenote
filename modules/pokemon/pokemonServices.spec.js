
import * as uut from './pokemonServices';
import pokemons from '../../data/output/pokemon.json';
import pokemonTypes from '../../data/output/pokemonType.json';

describe('pokemon services', () => {
  const expectedVulnerableToTypes = [
    { id: 'POKEMON_TYPE_FIRE', name: 'Fire', defenceScalar: 140, imageKey: 'fire' },
    { id: 'POKEMON_TYPE_FLYING', name: 'Flying', defenceScalar: 140, imageKey: 'flying' },
    { id: 'POKEMON_TYPE_ICE', name: 'Ice', defenceScalar: 140, imageKey: 'ice' },
    { id: 'POKEMON_TYPE_PSYCHIC', name: 'Psychic', defenceScalar: 140, imageKey: 'psychic' },
  ];
  const expectedResistantToTypes = [
    { id: 'POKEMON_TYPE_GRASS', name: 'Grass', defenceScalar: 51, imageKey: 'grass' },
    { id: 'POKEMON_TYPE_ELECTRIC', name: 'Electric', defenceScalar: 71.4, imageKey: 'electric' },
    { id: 'POKEMON_TYPE_FAIRY', name: 'Fairy', defenceScalar: 71.4, imageKey: 'fairy' },
    { id: 'POKEMON_TYPE_FIGHTING', name: 'Fighting', defenceScalar: 71.4, imageKey: 'fighting' },
    { id: 'POKEMON_TYPE_WATER', name: 'Water', defenceScalar: 71.4, imageKey: 'water' },
  ];
  const bulbasaur = pokemons.BULBASAUR;

  it('getDefenceTypeEffective() should return { vulnerableToTypes, resistantToTypes }', () => {
    const result = {
      vulnerableToTypes: expectedVulnerableToTypes,
      resistantToTypes: expectedResistantToTypes,
    };
    expect(uut.getDefenceTypeEffective(pokemonTypes, bulbasaur)).toEqual(result);
  });

  it('assignDefenceTypeEffective() should return pokemon with defenceTypeEffective', () => {
    const result = {
      ...bulbasaur,
      defenceTypeEffective: {
        vulnerableToTypes: expectedVulnerableToTypes,
        resistantToTypes: expectedResistantToTypes,
      },
    };
    expect(uut.assignDefenceTypeEffective(pokemonTypes, bulbasaur)).toEqual(result);
  });
});
