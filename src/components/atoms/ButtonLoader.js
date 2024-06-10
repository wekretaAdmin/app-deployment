import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const ButtonLoader = () => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <LottieView
        source={require('../../assets/json/buttonLoader.json')}
        autoPlay
        loop
        style={{height: 40, width: 40}}
      />
    </View>
  );
};

export default ButtonLoader;

const styles = StyleSheet.create({});
