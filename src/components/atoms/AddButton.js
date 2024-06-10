import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Apptheme from '../../assets/theme/apptheme';
import FontStyle from '../../assets/theme/FontStyle';
import Images from '../../assets/images';
import ButtonLoader from './ButtonLoader';

const AddButton = ({
  label,
  image,
  backgroundColor = Apptheme.color.black,
  onPress,
  disabled = false,
  loader = false,
}) => {
  return (
    <TouchableOpacity
      disabled={loader ? true : disabled}
      onPress={onPress}
      style={[styles.buttonContainer, {backgroundColor: backgroundColor}]}>
      <Text style={[FontStyle.label, {color: Apptheme.color.background}]}>
        {label}
      </Text>
      {image ? (
        loader ? (
          <View>
            <ButtonLoader />
          </View>
        ) : (
          <View>
            <Image
              source={image}
              style={{height: 17, width: 17, resizeMode: 'contain'}}
              tintColor={Apptheme.color.background}
            />
          </View>
        )
      ) : (
        <View />
      )}
    </TouchableOpacity>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  buttonContainer: {
    height: Apptheme.spacing.buttonHeight,

    paddingHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 17,
  },
});
