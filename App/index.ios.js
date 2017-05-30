import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';
import configureStore from './Src/Store/ConfigureStore';
import Router from './Src/Containers/Router';

const store = configureStore({});

const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

AppRegistry.registerComponent('App', () => App);
