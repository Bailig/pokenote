import { Thunk } from 'redux-testkit';
import * as uut from './catchPokemonActions';
import * as testData from '../../data/testDataV2';
import * as catchPokemonSelectors from './catchPokemonSelectors';

jest.mock('./catchPokemonSelectors');

describe('catch pokemon actions', () => {
  const bulbasaur = testData.getBulbasaur();
  const fastMove = testData.getFastMove();
  const chargeMove = testData.getChargeMove();

  it('updateAddPokemon() should dispatch pokemonId, default fastMoveId and chargeMoveId', () => {
    catchPokemonSelectors.selectDefaultFastMoveIdForPokemon.mockReturnValueOnce(fastMove.id);
    catchPokemonSelectors.selectDefaultChargeMoveIdForPokemon.mockReturnValueOnce(chargeMove.id);

    const dispatches = Thunk(uut.updateAddPokemon).execute(bulbasaur.id);

    expect(dispatches.length).toBe(1);
    expect(dispatches[0].getAction()).toEqual({
      type: uut.UPDATE_ADD_POKEMON,
      payload: {
        pokemonId: bulbasaur.id,
        fastMoveId: fastMove.id,
        chargeMoveId: chargeMove.id,
      },
    });
  });

  it('updateAddPokemonMove() should update fastMoveId', () => {
    expect(uut.updateAddPokemonMove({ moveProp: 'fastMoveId', value: fastMove })).toEqual({
      type: uut.UPDATE_ADD_POKEMON_MOVE,
      payload: { moveProp: 'fastMoveId', value: fastMove },
    });
  });
});
