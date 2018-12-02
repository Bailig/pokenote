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
    it('should select array of 6 undefined from pokemon state', () => {
      const state = {
        pokemon: {
          pokemons,
          pokemonMoves,
          pokemonTypes,
        },
        againstPokemon: {
          againstPokemonIds: new Array(6).fill(undefined),
        },
      };
      const result = new Array(6).fill(undefined);
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
          againstPokemonIds: ['BULBASAUR', undefined, undefined, undefined, undefined, undefined],
        },
      };
      const result = [{
        ...bulbasaur,
        defenceTypeEffective: {
          vulnerableToTypes: expectedVulnerableToTypes,
          resistantToTypes: expectedResistantToTypes,
        },
      }, undefined, undefined, undefined, undefined, undefined];
      Selector(uut.selectAgainstPokemons).expect(state).toReturn(result);
    });
  });
});
