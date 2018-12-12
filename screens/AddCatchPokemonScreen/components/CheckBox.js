import React from 'react';
import { StyleSheet } from 'react-native';
import { CheckBox as DefaultCheckBox } from 'react-native-elements';

import { COLOR } from '../../commonStyles';

const styles = StyleSheet.create({
  checkboxStyle: {
    backgroundColor: 'transparent',
    padding: 0,
  },
});

export const CheckBox = props => (
  <DefaultCheckBox
    title=""
    center
    checkedIcon="dot-circle-o"
    uncheckedIcon="circle-o"
    checkedColor={COLOR.lowContrastDark}
    uncheckedColor={COLOR.lowContrastLight}
    size={20}
    containerStyle={styles.checkboxStyle}
    {...props}
  />
);
