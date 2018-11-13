import { Reducer } from 'redux-testkit';

import { UPDATE } from './againtPokemonActions';
import uut from './againstPokemonReducer';

describe('against pokemon reducer', () => {
  it('should handle UPDATE action on initial state', () => {
    const action = {
      type: UPDATE,
      payload: { selectedPokemonId: 'IVYSAUR', currentAgainstPokemonIndex: 2 },
    };
    const result = {
      againstPokemonIds: [null, null, 'IVYSAUR', null, null, null],
      currentAgainstPokemonIndex: null,
    };
    Reducer(uut).expect(action).toReturnState(result);
  });
});
