import { Reducer } from 'redux-testkit';

import { UPDATE_ADD_POKEMON, UPDATE_ADD_POKEMON_MOVE } from './catchPokemonActions';
import * as testData from '../../data/testDataV2';
import uut from './catchPokemonReducer';

describe('catch pokemon reducer', () => {
  const bulbsaur = testData.getBulbasaur();
  const chargeMove = testData.getChargeMove();
  const fastMove = testData.getFastMove();

  it('should handle UPDATE_ADD_POKEMON', () => {
    const action = {
      type: UPDATE_ADD_POKEMON,
      payload: {
        pokemonId: bulbsaur.id,
        fastMoveId: fastMove.id,
        chargeMoveId: chargeMove.id,
      },
    };
    const result = {
      addPokemon: {
        pokemonId: bulbsaur.id,
        fastMoveId: fastMove.id,
        chargeMoveId: chargeMove.id,
      },
    };
    Reducer(uut).expect(action).toReturnState(result);
  });

  it('should handle UPDATE_ADD_POKEMON_MOVE', () => {
    const state = {
      addPokemon: {
        pokemonId: bulbsaur.id,
        fastMoveId: undefined,
        chargeMoveId: chargeMove.id,
      },
    };
    const action = {
      type: UPDATE_ADD_POKEMON_MOVE,
      payload: { moveProp: 'fastMoveId', value: fastMove.id },
    };
    const result = {
      addPokemon: {
        pokemonId: bulbsaur.id,
        fastMoveId: fastMove.id,
        chargeMoveId: chargeMove.id,
      },
    };
    Reducer(uut).withState(state).expect(action).toReturnState(result);
  });
});
