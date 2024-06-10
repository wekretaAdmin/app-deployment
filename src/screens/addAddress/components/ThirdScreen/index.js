import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import InputField from '../../../../components/atoms/inputField';
import Gap from '../../../../components/atoms/Gap';

const ThirdScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Gap m7 />
      <ScrollView style={{flex: 1}}>
        <Gap m7 />
        <InputField label="FIRST NAME" type="email" />
        <Gap m7 />
        <InputField label="LAST NAME" type="email" />
        <Gap m7 />
        <InputField label="STREET ADDRESS" type="email" />
        <Gap m7 />
        <InputField label="LANDMARK" type="email" />
        <Gap m7 />
        <InputField label="ADDITIONAL INFO" type="email" />
        <Gap m7 />
        <InputField label="CITY" type="email" />
        <Gap m7 />
        <InputField label="STATE" type="email" />
        <Gap m7 />
        <InputField label="ZIP CODE" type="email" />
        <Gap m7 />
        <InputField label="PHONE" type="email" />
        <Gap m7 />
        <Gap m7 />
        <Gap m7 />
      </ScrollView>
    </View>
  );
};

export default ThirdScreen;

const styles = StyleSheet.create({});
