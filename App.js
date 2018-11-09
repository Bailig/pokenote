import React from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import * as firebase from 'firebase';

import Screens from './screens';
import reducers from './modules';
import { COLOR } from './screens/commonStyles';
import { firebaseConfig } from './util/config';

firebase.initializeApp(firebaseConfig);

const store = createStore(
  reducers,
  {},
  compose(applyMiddleware(thunk, logger)),
);

export default () => (
  <Provider store={store}>
    <View style={{ flex: 1, backgroundColor: COLOR.highContrastLight }}>
      <StatusBar
        barStyle="light-content"
      />
      <Screens />
    </View>
  </Provider>
);
