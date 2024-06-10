import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const PaginationLoader = () => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <LottieView
        source={require('../../assets/json/paginationLoader.json')}
        autoPlay
        loop
        style={{height: 80, width: 180}}
      />
    </View>
  );
};

export default PaginationLoader;

const styles = StyleSheet.create({});
