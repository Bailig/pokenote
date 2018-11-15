import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import { PokemonTypeImage } from '../../components';
import { TEXT_STYLE } from '../../commonStyles';

export const PokemonTypeItem = ({ imageKey, defenceScalar, textStyle }) => (
  <View style={{ marginHorizontal: 5 }}>
    <PokemonTypeImage imageKey={imageKey} />
    <Text style={[{ ...TEXT_STYLE.subtitle2, paddingTop: 2, textAlign: 'center' }, textStyle]}>
      {`${defenceScalar}%`}
    </Text>
  </View>
);

PokemonTypeItem.defaultProps = {
  textStyle: {},
};

PokemonTypeItem.propTypes = {
  imageKey: PropTypes.string.isRequired,
  defenceScalar: PropTypes.number.isRequired,
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
