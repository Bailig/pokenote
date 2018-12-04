import { Selector } from 'redux-testkit';

import * as testData from '../../data/testData';
import * as uut from './againstPokemonSelectors';

describe('pokemon selectors', () => {
  const defenceTypeEffective = testData.getDefenceTypeEffective();
  const bulbasaur = testData.getPokemon();
  const pokemons = testData.getPokemons();
  const pokemonMoves = testData.getPokemonMoves();
  const pokemonTypes = testData.getPokemonTypes();

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

    it('should select bulbasaur with defenceTypeEffective from pokemon state', () => {
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
        defenceTypeEffective,
      }, undefined, undefined, undefined, undefined, undefined];
      Selector(uut.selectAgainstPokemons).expect(state).toReturn(result);
    });
  });
});
