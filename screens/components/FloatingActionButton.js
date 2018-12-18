import React from 'react';
import { TouchableHighlight, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { elevation } from '../commonStyles';

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    ...elevation(6),
  },
});

export const FloatingActionButton = ({
  size, style, children, ...props
}) => (
  <TouchableHighlight
    style={[
      styles.containerStyle,
      { height: size, width: size, borderRadius: size / 2 },
      style,
    ]}
    {...props}
  >
    {children}
  </TouchableHighlight>
);

FloatingActionButton.defaultProps = {
  style: {},
  children: undefined,
};

FloatingActionButton.propTypes = {
  size: PropTypes.number.isRequired,
  style: PropTypes.number,
  children: PropTypes.element,
};
