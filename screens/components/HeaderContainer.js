import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { COLOR, elevation } from '../commonStyles';

const styles = StyleSheet.create({
  containerStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 66,
    backgroundColor: COLOR.lowContrastDark,
    zIndex: 4,
  },
});

export const HeaderContainer = ({ children, style }) => (
  <View style={[elevation(4), styles.containerStyle, style]}>
    {children}
  </View>
);
HeaderContainer.defaultProps = {
  style: null,
};
HeaderContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
