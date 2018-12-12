import { Font } from 'expo';

export const LOAD_FONT = 'app/LOAD_FONT';
export const LOAD_FONT_SUCCESS = 'app/LOAD_FONT_SUCCESS';
export const LOAD_FONT_FAIL = 'app/LOAD_FONT_FAIL';

export const loadFont = () => async (dispatch) => {
  dispatch({ type: LOAD_FONT });
  try {
    await Font.loadAsync({
      'josefin-sans': require('../../assets/fonts/Josefin_Sans/JosefinSans-Regular.ttf'),
      'mali-bold': require('../../assets/fonts/Mali/Mali-Bold.ttf'),
    });
    dispatch({ type: LOAD_FONT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOAD_FONT_FAIL });
  }
};
