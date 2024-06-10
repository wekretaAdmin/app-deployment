/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import OtpInputs from 'react-native-otp-inputs';
import {loginStyles} from '../loginScreens/loginScreensStyle';
import {verticalScale} from '../../../utils/styles/responsive';

import Apptheme from '../../assets/theme/apptheme';
import useShakeAnimation from './ShakeAnimation';
function OtpInput({handleChange}) {
  const {handleShake, animatedStyle} = useShakeAnimation();
  //   useEffect(() => {
  //     if (error) {
  //       handleShake();
  //     }
  //   }, [error]);
  return (
    <Animated.View style={{marginTop: 20}}>
      <OtpInputs
        numberOfInputs={6}
        autoFocus
        handleChange={handleChange}
        keyboardType="phone-pad"
        style={{
          flexDirection: 'row',
          gap: 5,
          marginVertical: 15,
        }}
        // inputStyles={loginStyles.otpNumberContainer}
        inputStyles={{
          color: Apptheme.color.black,
          //   fontFamily:
          fontSize: 24,
          textAlign: 'center',
          padding: 0,
          position: 'relative',
          top: 3,
        }}
        focusStyles={{
          borderColor: '#05EB00',
          //   borderColor: error ? '#FF2C2C' : '#05EB00',
          borderBottomWidth: 2,
        }}
        autoCorrect={false}
        selectionColor={Apptheme.color.text}
        textAlign="center"
        textContentType="telephoneNumber"
        inputContainerStyles={[
          {
            borderBottomWidth: 1,
            backgroundColor: '#F9F9F9',
            width: 44,
            height: 44,
            borderRadius: 2,
            alignItems: 'center',
            justifyContent: 'center',
          },
          {
            borderColor: Apptheme.color.boxOutline,
            // borderColor: error ? '#FF2C2C' : Apptheme.color.boxOutline,
          },
        ]}
      />
    </Animated.View>
  );
}
export default OtpInput;
