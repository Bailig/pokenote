import R from 'ramda';
import { Selector } from 'redux-testkit';

import * as uut from './searchPokemonSelectors';
import * as testData from '../../data/testDataV2';

describe('search pokemon selectors', () => {
  const pokemons = testData.getPokemons();
  const pokemonTypes = testData.getPokemonTypes();
  const charmander = testData.getCharmander();

  describe('selectPokemons()', () => {
    it('should select pokemons with name including search text', () => {
      const state = {
        pokemon: { pokemons, pokemonTypes },
        searchPokemon: { searchText: 'bulbas' },
      };
      const result = [pokemons.BULBASAUR];
      Selector(uut.selectPokemons).expect(state).toReturn(result);
    });

    it('should select a type of pokemons', () => {
      const state = {
        pokemon: { pokemons, pokemonTypes },
        searchPokemon: { searchText: 'fire' },
      };

      const result = Selector(uut.selectPokemons).execute(state);
      expect(result.length).toBe(39);
      expect(result[0]).toBe(charmander);
      expect(result[38]).toBe(pokemons.ARCEUS_FIRE);
    });
  });
});
