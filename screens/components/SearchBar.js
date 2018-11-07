import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

import { COLOR, TEXT_STYLE } from '../commonStyles';

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: COLOR.highContrastLight,
    height: 42,
    borderRadius: 21,
    marginHorizontal: 12,
    marginTop: 10,
    paddingHorizontal: 21,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputStyle: {
    flex: 1,
    height: 42,
    paddingLeft: 16,
    color: COLOR.highContrastDark,
    ...TEXT_STYLE.subtitle1,
  },
});

export const SearchBar = props => (
  <View style={styles.containerStyle}>
    <Icon
      name="search"
      type="font-awesome"
      color={COLOR.highContrastDark}
      size={16}
    />
    <TextInput
      style={styles.textInputStyle}
      placeholder="Search by name or type"
      placeholderTextColor={COLOR.highContrastDark}
      {...props}
    />
  </View>
);
