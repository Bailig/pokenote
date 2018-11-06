import { Selector } from 'redux-testkit';

import pokemons from '../../data/output/pokemon.json';
import pokemonMoves from '../../data/output/pokemonMove.json';
import pokemonTypes from '../../data/output/pokemonType.json';
import * as uut from './pokemonSelectors';

describe('pokemon selectors', () => {
  const expectedDefenceTypeEffective = {
    POKEMON_TYPE_FIRE: { id: 'POKEMON_TYPE_FIRE', name: 'Fire', defenceScalar: 1.4 },
    POKEMON_TYPE_FLYING: { id: 'POKEMON_TYPE_FLYING', name: 'Flying', defenceScalar: 1.4 },
    POKEMON_TYPE_ICE: { id: 'POKEMON_TYPE_ICE', name: 'Ice', defenceScalar: 1.4 },
    POKEMON_TYPE_PSYCHIC: { id: 'POKEMON_TYPE_PSYCHIC', name: 'Psychic', defenceScalar: 1.4 },
    POKEMON_TYPE_GRASS: { id: 'POKEMON_TYPE_GRASS', name: 'Grass', defenceScalar: 0.51 },
    POKEMON_TYPE_ELECTRIC: { id: 'POKEMON_TYPE_ELECTRIC', name: 'Electric', defenceScalar: 0.714 },
    POKEMON_TYPE_FAIRY: { id: 'POKEMON_TYPE_FAIRY', name: 'Fairy', defenceScalar: 0.714 },
    POKEMON_TYPE_FIGHTING: { id: 'POKEMON_TYPE_FIGHTING', name: 'Fighting', defenceScalar: 0.714 },
    POKEMON_TYPE_WATER: { id: 'POKEMON_TYPE_WATER', name: 'Water', defenceScalar: 0.714 },
  };

  describe('selectAgainstPokemons()', () => {
    it('should select array of 6 nulls from pokemon state', () => {
      const state = {
        pokemon: {
          pokemons,
          pokemonMoves,
          pokemonTypes,
          againstPokemonIds: new Array(6).fill(null),
          catchPokemonIds: [],
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
          againstPokemonIds: ['BULBASAUR', null, null, null, null, null],
          catchPokemonIds: [],
        },
      };
      const result = [{
        ...pokemons.BULBASAUR,
        defenceTypeEffective: expectedDefenceTypeEffective,
      }, null, null, null, null, null];
      Selector(uut.selectAgainstPokemons).expect(state).toReturn(result);
    });
  });

  describe('helper functions', () => {
    it('getPokemonTypeIds() should return pokemon typeIds', () => {
      const result = { pokemonTypeId: 'POKEMON_TYPE_GRASS', pokemonTypeId2: 'POKEMON_TYPE_POISON' };
      expect(uut.getPokemonTypeIds(pokemons.BULBASAUR)).toMatchObject(result);
    });

    it('getDefenceTypeEffective() should return defenceTypeEffective for one pokemon', () => {
      const params = {
        pokemonTypeId: 'POKEMON_TYPE_GRASS',
        pokemonTypeId2: 'POKEMON_TYPE_POISON',
        pokemonTypes,
      };
      const result = expectedDefenceTypeEffective;
      expect(uut.getDefenceTypeEffective(params)).toMatchObject(result);
    });
  });
});
