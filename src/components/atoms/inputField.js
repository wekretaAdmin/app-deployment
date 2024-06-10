import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {Icons} from '../utils/styles/globalStyles';

// import svg from '../utils/styles/Svg/Index';

import VectorIcon from '../../assets/vectorIcon';
import Apptheme from '../../assets/theme/apptheme';

const InputField = ({
  image,
  label,
  type,
  onChangeText,
  value,
  onPressIcon,
  rightIcon,
  leftIcon,
  error,
  inputStyles,
  autoFocus,
  gstView,
  disabled = false,
  placeholder,
  readOnly = false,

  maxLength,
}) => {
  const [isFocused, setIsFocused] = useState(!!value);
  const [secure, setSecure] = useState(true);
  const [inputFocus, setInputFocus] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const handleClear = () => {
    setInputValue('');
    onChangeText('');
  };
  return (
    <View style={[style.container, inputStyles]}>
      <View style={{flex: 1}}>
        <TextInput
          label={
            <Text
              style={[
                style.inputLabelStyle,
                {
                  color:
                    isFocused || inputFocus
                      ? Apptheme.color.black
                      : Apptheme.color.black,
                },
              ]}>
              {label}
            </Text>
          }
          value={value ?? inputValue}
          onChangeText={val => {
            setInputValue(val);
            onChangeText(val);
          }}
          disabled={disabled}
          textColor={Apptheme.color.black}
          autoFocus={autoFocus}
          right={
            rightIcon ? (
              rightIcon()
            ) : type === 'password' ? (
              <TextInput.Icon
                onPress={() => setSecure(!secure)}
                icon={!secure ? 'eye-outline' : 'eye-off-outline'}
                color={() => Apptheme.color.text}
                style={{marginTop: 14}}
                forceTextInputFocus={false}
                size={18}
              />
            ) : // secure ? (
            //   <svg.eye width="16" height="16" />
            // ) : (
            //   <svg.eyeSlash width="16" height="16" />
            // )
            inputValue && isFocused ? (
              <TextInput.Icon
                onPress={handleClear}
                icon="close"
                size={16}
                style={{marginRight: -10, marginTop: 14}}
                color={error ? '#FF2C2C' : '#727272'}
              />
            ) : (
              <TextInput.Icon
                onPress={() => {
                  setInputValue('');
                  onPressIcon();
                }}
                icon="close"
                size={16}
                style={{
                  display: `${error ? '' : 'none'}`,
                  marginRight: -10,
                  marginTop: 14,
                }}
                color="#FF2C2C"
              />
            )
          }
          readOnly={readOnly}
          placeholder={placeholder}
          maxLength={maxLength}
          secureTextEntry={type === 'password' ? secure : false}
          keyboardType={type === 'phone' ? 'number-pad' : 'default'}
          onFocus={() => {
            setInputFocus(true);
            setIsFocused(true);
          }}
          onBlur={() => {
            setInputFocus(false);
            setIsFocused(false);
          }}
          style={{
            flex: 1,
            backgroundColor: '#f1f1f190',
            textTransform: gstView ? 'capitalize' : 'none',
          }}
          underlineStyle={{height: isFocused ? 0.7 : 2}}
          cursorColor={Apptheme.color.black}
          placeholderTextColor={Apptheme.color.subText}
          underlineColor="#fff"
          activeUnderlineColor={Apptheme.color.black}
        />
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {flexDirection: 'row', height: 60},
  imagestyle: {width: 20, height: 20, resizeMode: 'contain', padding: 6},
  imagepressStyle: {
    width: 64,
    // height: horizontalScale(54),
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  inputLabelStyle: {
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    lineHeight: 24,
    // color: Apptheme.color.textLight,
  },
});
export default InputField;
