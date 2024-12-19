import {StyleSheet} from 'react-native';
import React from 'react';
import Store from './store';
import {Provider} from 'react-redux';

const Providers = ({children}) => {
  return (
    <Provider store={Store}>
      {children}
    </Provider>
  );
};

export default Providers;

const styles = StyleSheet.create({});
