import React from 'react';
import { ImageBackground } from 'react-native';
import PropTypes from 'prop-types';

import { LightBackButton } from './components';

const AgainstMenuScreen = ({ navigation }) => (
  <ImageBackground source={require('../assets/background.png')} style={{ flex: 1 }}>
    <LightBackButton onPress={() => navigation.goBack()} />
  </ImageBackground>
);

AgainstMenuScreen.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

export default AgainstMenuScreen;
