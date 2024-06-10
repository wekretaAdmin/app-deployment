import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Gap from '../../../../components/atoms/Gap';
import InputField from '../../../../components/atoms/inputField';

const FirstScreen = () => {
  return (
    <View>
      <View style={{flex: 1}}>
        <Gap m9 />
        <Gap m2 />
        <InputField label="FIRST NAME" type="email" />
        <Gap m7 />
        <InputField label="LAST NAME" type="email" />
      </View>
    </View>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({});
