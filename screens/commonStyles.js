// text styles
export const SUBTITLE = {
  fontFamily: 'josefin-sans',
  lineHeight: 0,
};

export const SUBTITLE1 = [SUBTITLE, {
  fontSize: 16,
}];

export const SUBTITLE2 = [SUBTITLE, {
  fontSize: 14,
}];

export const SUBTITLE3 = [SUBTITLE, {
  fontSize: 10,
}];

export const HEADLINE = {
  fontFamily: 'mali-bold',
  fontSize: 15,
};


// colors
export const HIGH_CONTRAST_LIGHT = '#EDF1F2';
export const LOW_CONTRAST_LIGHT = '#BAC0C4';
export const HIGH_CONTRAST_DARK = '#1C2833';
export const LOW_CONTRAST_DARK = '#527394';

// shadows
export const elevation = level => ({
  shadowColor: 'black',
  shadowOpacity: 0.24,
  shadowRadius: level,
  shadowOffset: {
    height: level,
  },
});
