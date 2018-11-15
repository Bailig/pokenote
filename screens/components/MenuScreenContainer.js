import React from 'react';
import { ImageBackground, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { LightBackButton } from '.';

const styles = StyleSheet.create({
  buttonGroupContainerStyle: {
    position: 'absolute',
    bottom: 130,
    right: 28,
  },
});

export const MenuScreenContainer = ({ children, onBack }) => (
  <ImageBackground source={require('../../assets/background.png')} style={{ flex: 1 }}>
    <View style={styles.buttonGroupContainerStyle}>
      {children}
    </View>
    <LightBackButton onPress={onBack} />
  </ImageBackground>
);

MenuScreenContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  onBack: PropTypes.func.isRequired,
};
