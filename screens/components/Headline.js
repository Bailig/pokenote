import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { COLOR, TEXT_STYLE } from '../commonStyles';

const styles = StyleSheet.create({
  headlineStyle: { color: COLOR.highContrastLight, marginTop: 32, textAlign: 'center' },
});

export const Headline = ({ children }) => (
  <Text style={[TEXT_STYLE.headline, styles.headlineStyle]}>
    {children}
  </Text>
);

Headline.propTypes = {
  children: PropTypes.string.isRequired,
};
