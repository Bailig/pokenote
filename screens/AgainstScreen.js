import React from 'react';
import { View } from 'react-native';

import { Header } from './components';

export default () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Header text="Pokemons to fight against" />
  </View>
);
