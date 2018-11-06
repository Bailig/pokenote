import _ from 'lodash';
import { Font } from 'expo';

// actions
const LOAD_FONT = 'app/LOAD_FONT';
const LOAD_FONT_SUCCESS = 'app/LOAD_FONT_SUCCESS';
const LOAD_FONT_FAIL = 'app/LOAD_FONT_FAIL';

export const loadFont = () => async (dispatch) => {
  dispatch({ type: LOAD_FONT });
  try {
    await Font.loadAsync({
      'josefin-sans': require('../assets/fonts/Josefin_Sans/JosefinSans-Regular.ttf'),
      'mali-bold': require('../assets/fonts/Mali/Mali-Bold.ttf'),
    });
    dispatch({ type: LOAD_FONT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOAD_FONT_FAIL });
  }
};


// reducer
const initialState = {
  fontLoaded: false,
  errors: {},
};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_FONT_SUCCESS:
      return {
        ...state,
        fontLoaded: true,
        errors: _.omit(state.errors, 'loadFontFail'),
      };
    case LOAD_FONT_FAIL:
      return {
        ...state,
        fontLoaded: false,
        errors: { ...state.errors, loadFontFail: 'Unable to load font.' },
      };
    default: return state;
  }
};