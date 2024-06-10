import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Divider = ({backgroundColor = '#EFEFEF'}) => {
  return <View style={[styles.Divider, {backgroundColor: backgroundColor}]} />;
};

export default Divider;

const styles = StyleSheet.create({
  Divider: {
    height: 1,
    backgroundColor: '#EFEFEF',
  },
});
