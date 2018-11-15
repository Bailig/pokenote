// text styles
const subtitle = {
  fontFamily: 'josefin-sans',
  lineHeight: 0,
};

export const TEXT_STYLE = {
  subtitle1: {
    ...subtitle,
    fontSize: 16,
  },
  subtitle2: {
    ...subtitle,
    fontSize: 14,
  },
  subtitle3: {
    ...subtitle,
    fontSize: 10,
  },
  headline: {
    fontFamily: 'mali-bold',
    fontSize: 15,
  },
};

// colors
export const COLOR = {
  highContrastDark: '#1C2833',
  lowContrastDark: '#527394',
  highContrastLight: '#EDF1F2',
  lowContrastLight: '#BAC0C4',
  red: '#EB5757',
  green: '#27AE60',
};

// shadows
export const elevation = level => ({
  shadowColor: 'black',
  shadowOpacity: 0.24,
  shadowRadius: level,
  shadowOffset: {
    height: level,
  },
});
