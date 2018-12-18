import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { COLOR } from '../commonStyles';

const styles = StyleSheet.create({
  containerStyle: {
    minHeight: 56,
    backgroundColor: COLOR.lowContrastLight,
    borderRadius: 28,
    marginBottom: 24,
    overflow: 'hidden',
  },
});

export const Card = ({ children }) => (
  <View style={styles.containerStyle}>
    {children}
  </View>
);

Card.defaultProps = {
  children: undefined,
};

Card.propTypes = {
  children: PropTypes.element,
};
