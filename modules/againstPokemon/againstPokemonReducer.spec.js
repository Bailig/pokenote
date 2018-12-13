import { Reducer } from 'redux-testkit';

import { FETCH_SUCCESS } from './againtPokemonActions';
import uut from './againstPokemonReducer';

describe('against pokemon reducer', () => {
  it('should handle FETCH_SUCCESS action on initial state', () => {
    const againstPokemonIds = ['BULBASAUR', undefined, undefined, undefined, undefined, undefined];
    const action = {
      type: FETCH_SUCCESS,
      payload: againstPokemonIds,
    };
    const result = { currentAgainstPokemonIndex: undefined, againstPokemonIds };
    Reducer(uut).expect(action).toReturnState(result);
  });
});
