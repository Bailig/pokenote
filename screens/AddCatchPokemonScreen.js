import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { COLOR } from './commonStyles';
import { Header, DarkBackButton } from './components';


const AddCatchPokemonScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: COLOR.highContrastLight }}>
      <Header text="Select Ideal Moves" />
      <DarkBackButton onPress={navigation.goBack} />
    </View>
  );
};

AddCatchPokemonScreen.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

export default connect(null, mapDispatchToProps)(AddCatchPokemonScreen);
