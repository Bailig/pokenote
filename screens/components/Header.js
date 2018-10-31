import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import {
  LOW_CONTRAST_DARK, elevation, HEADLINE, HIGH_CONTRAST_LIGHT,
} from '../commonStyles';

export const Header = ({ text }) => (
  <View
    style={[
      elevation(4),
      {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 66,
        backgroundColor: LOW_CONTRAST_DARK,
        justifyContent: 'center',
        alignItems: 'center',
      },
    ]}
  >
    <Text
      style={[
        HEADLINE,
        { color: HIGH_CONTRAST_LIGHT, marginTop: 10 },
      ]}
    >
      {text}
    </Text>
  </View>
);

Header.propTypes = {
  text: PropTypes.string.isRequired,
};
