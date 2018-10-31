import React from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import Screens from './screens';
import reducers from './modules';
import { HIGH_CONTRAST_LIGHT } from './screens/commonStyles';

const store = createStore(
  reducers,
  {},
  compose(applyMiddleware(thunk, logger)),
);

export default () => (
  <Provider store={store}>
    <View style={{ flex: 1, backgroundColor: HIGH_CONTRAST_LIGHT }}>
      <StatusBar
        barStyle="light-content"
      />
      <Screens />
    </View>
  </Provider>
);
