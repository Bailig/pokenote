import R from 'ramda';
import { FETCH_FAIL } from '../pokemon';
import {
  LOAD_FONT_SUCCESS,
  LOAD_FONT_FAIL,
} from './appActions';

const initialState = {
  fontLoaded: false,
  errors: {},
};

export default (state = initialState, action = {}) => {
  const { type } = action;
  switch (type) {
    case LOAD_FONT_SUCCESS:
      return {
        ...state,
        fontLoaded: true,
        errors: R.dissoc('loadFontFail', state.errors),
      };
    case LOAD_FONT_FAIL:
      return {
        ...state,
        fontLoaded: false,
        errors: { ...state.errors, loadFontFail: 'Unable to load font.' },
      };
    case FETCH_FAIL:
      return {
        ...state,
        errors: { ...state.errors, fetchPokemonFail: 'Network Error.' },
      };
    default: return state;
  }
};
