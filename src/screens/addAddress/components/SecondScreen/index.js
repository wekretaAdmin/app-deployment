import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import InputField from '../../../../components/atoms/inputField';
import Gap from '../../../../components/atoms/Gap';

const SecondScreen = () => {
  return (
    <View>
      <View style={{flex: 1}}>
        <Gap m9 />
        <Gap m2 />
        <InputField label="STREET ADDRESS" type="email" />
        <Gap m7 />
      </View>
    </View>
  );
};

export default SecondScreen;

const styles = StyleSheet.create({});
