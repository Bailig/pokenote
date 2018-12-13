import { Thunk } from 'redux-testkit';

import * as uut from './catchPokemonActions';
import * as testData from '../../data/testDataV2';
import * as catchPokemonSelectors from './catchPokemonSelectors';

jest.mock('./catchPokemonSelectors');

describe('catch pokemon actions', () => {
  const allData = testData.getAll();
  const bulbasaur = testData.getBulbasaur();

  describe('updatePokemonToAdd()', () => {
    it('should filter posts', () => {
      catchPokemonSelectors.selectDefaultFastMoveIdForPokemon.mockReturnValueOnce('VINE_WHIP_FAST');
      catchPokemonSelectors.selectDefaultChargeMoveIdForPokemon.mockReturnValueOnce('POWER_WHIP');
      const dispatches = Thunk(uut.updatePokemonToAdd).execute({ pokemonId: bulbasaur.id });
      expect(dispatches.length).toBe(1);
      expect(dispatches[0].getAction()).toEqual({
        type: uut.UPDATE_POKEMON_TO_ADD,
        payload: {
          pokemonId: bulbasaur.id,
          fastMoveId: 'VINE_WHIP_FAST',
          chargeMoveId: 'POWER_WHIP',
        },
      });
    });
  });
});
