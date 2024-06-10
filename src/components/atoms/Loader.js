import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const Loader = () => {
  return (
    <View>
      <LottieView
        source={require('../../assets/json/loader.json')}
        autoPlay
        loop
        style={{height: 80, width: 150}}
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({});
