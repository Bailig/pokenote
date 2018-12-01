import R from 'ramda';
import { Selector } from 'redux-testkit';

import pokemons from '../../data/output/pokemon.json';
import pokemonMoves from '../../data/output/pokemonMove.json';
import pokemonTypes from '../../data/output/pokemonType.json';
import * as uut from './againstPokemonSelectors';

describe('pokemon selectors', () => {
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

  describe('selectAgainstPokemons()', () => {
    it('should select array of 6 nulls from pokemon state', () => {
      const state = {
        pokemon: {
          pokemons,
          pokemonMoves,
          pokemonTypes,
        },
        againstPokemon: {
          againstPokemonIds: new Array(6).fill(null),
        },
      };
      const result = new Array(6).fill(null);
      Selector(uut.selectAgainstPokemons).expect(state).toReturn(result);
    });

    it('should select BULBASAUR with defenceTypeEffective from pokemon state', () => {
      const state = {
        pokemon: {
          pokemons,
          pokemonMoves,
          pokemonTypes,
        },
        againstPokemon: {
          againstPokemonIds: ['BULBASAUR', null, null, null, null, null],
        },
      };
      const result = [{
        ...bulbasaur,
        defenceTypeEffective: {
          vulnerableToTypes: expectedVulnerableToTypes,
          resistantToTypes: expectedResistantToTypes,
        },
      }, null, null, null, null, null];
      Selector(uut.selectAgainstPokemons).expect(state).toReturn(result);
    });
  });

  describe('helper functions', () => {
    it('assignDefenceTypeEffective() should return pokemon with defenceTypeEffective', () => {
      const result = {
        ...bulbasaur,
        defenceTypeEffective: {
          vulnerableToTypes: expectedVulnerableToTypes,
          resistantToTypes: expectedResistantToTypes,
        },
      };
      expect(uut.assignDefenceTypeEffective(R.values(pokemonTypes), bulbasaur)).toMatchObject(result);
    });

    it('getDefenceScalar() should return pokemon DefenceScalar', () => {
      expect(uut.getDefenceScalar('POKEMON_TYPE_GRASS', 'POKEMON_TYPE_POISON', pokemonTypes.POKEMON_TYPE_FIRE)).toEqual(140);
    });
    // it('getPokemonTypeIds() should return pokemon typeIds', () => {
    //   const result = { pokemonTypeId: 'POKEMON_TYPE_GRASS', pokemonTypeId2: 'POKEMON_TYPE_POISON' };
    //   expect(uut.getPokemonTypeIds(bulbasaur)).toMatchObject(result);
    // });

    // it('getDefenceTypeEffective() should return defenceTypeEffective for one pokemon', () => {
    //   const params = {
    //     pokemonTypeId: 'POKEMON_TYPE_GRASS',
    //     pokemonTypeId2: 'POKEMON_TYPE_POISON',
    //     pokemonTypes,
    //   };
    //   const result = {
    //     vulnerableToTypes: expectedVulnerableToTypes,
    //     resistantToTypes: expectedResistantToTypes,
    //   };
    //   expect(uut.getDefenceTypeEffective(params)).toMatchObject(result);
    // });
  });
});
