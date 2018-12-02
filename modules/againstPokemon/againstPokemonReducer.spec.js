import { Reducer } from 'redux-testkit';

import { UPDATE_SUCCESS } from './againtPokemonActions';
import uut from './againstPokemonReducer';

describe('against pokemon reducer', () => {
  it('should handle UPDATE_SUCCESS action on initial state', () => {
    const action = {
      type: UPDATE_SUCCESS,
      payload: { selectedPokemonId: 'IVYSAUR', currentAgainstPokemonIndex: 2 },
    };
    const result = {
      againstPokemonIds: [undefined, undefined, 'IVYSAUR', undefined, undefined, undefined],
      currentAgainstPokemonIndex: null,
    };
    Reducer(uut).expect(action).toReturnState(result);
  });
});
