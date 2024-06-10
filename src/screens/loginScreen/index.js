/* eslint-disable react-native/no-inline-styles */
import {
  BackHandler,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Apptheme from '../../assets/theme/apptheme';
import FontStyle from '../../assets/theme/FontStyle';
import Gap from '../../components/atoms/Gap';
import Divider from '../../components/atoms/Divider';
import VectorIcon from '../../assets/vectorIcon';
import Images from '../../assets/images';
import {useNavigation, useRoute} from '@react-navigation/native';
import PagerView from 'react-native-pager-view';
import RouteName from '../../navigation/RouteName';

const LoginScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );

    return () => backHandler.remove();
  }, []);

  const handleBackButton = () => {
    if (route.params?.from == 'register') {
      navigation.navigate(RouteName.HOME);
      return true;
    } else {
      navigation.goBack();
      return false;
    }
  };

  const onPress = () => {
    navigation.navigate(RouteName.MOBILE_NUMBER_SCREEN);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Apptheme.color.background,
        padding: Apptheme.spacing.innerContainer,
      }}>
      <>
        <Gap m7 />

        <Text
          style={[
            FontStyle.heading,
            {paddingLeft: Apptheme.spacing.innerContainer},
          ]}>
          LOG IN
        </Text>

        <Gap m8 />
        <View style={{flex: 1}}>
          <Divider />
          <TouchableOpacity
            onPress={onPress}
            style={{
              height: Apptheme.spacing.headerHeight,

              paddingHorizontal: Apptheme.spacing.innerContainer,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={Images.pngImages.mobile}
              style={{height: 24, width: 24}}
              resizeMode="contain"
            />
            <Gap row m5 />
            <Text style={[FontStyle.titleSmall]}>Mobile Number</Text>
          </TouchableOpacity>
          <Divider />
        </View>
        <View>
          <Text style={[FontStyle.label]}>
            By signing up you agree to our{' '}
            <Text
              style={[
                FontStyle.labelMedium,
                {fontSize: 12, textDecorationLine: 'underline'},
              ]}>
              Terms And Conditions
            </Text>{' '}
            and our{' '}
            <Text
              style={[
                FontStyle.labelMedium,
                {fontSize: 12, textDecorationLine: 'underline'},
              ]}>
              Privacy Policy
            </Text>
          </Text>
        </View>
        <Gap m4 />
      </>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
