import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RouteName from './RouteName';

import BottomTabNavigation from './BottomTabNavigation';
import SubCategory from '../screens/subCategory';
import Product from '../screens/product';
import ProductDetail from '../screens/productDetail';
import AddAdress from '../screens/addAddress';
import OrderHistory from '../screens/profileScreen/components/orderHistory';
import OrderDetail from '../screens/profileScreen/components/orderHistory/OrderDetail';
import GiftCard from '../screens/profileScreen/components/giftCard';
import VoucherDetail from '../screens/profileScreen/components/giftCard/VoucherDetail';
import MyAccount from '../screens/profileScreen/components/myAccount';
import AddButton from '../components/atoms/AddButton';
import AddressBook from '../screens/profileScreen/components/addressBook';
import LoginScreen from '../screens/loginScreen';
import MobileNumberScreen from '../screens/loginScreen/components/MobileNumberScreen';
import OtpScreen from '../screens/loginScreen/components/OtpScreen';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        animationTypeForReplace: 'push',
        // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      {/* <Stack.Screen name={RouteName.LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen
        name={RouteName.MOBILE_NUMBER_SCREEN}
        component={MobileNumberScreen}
      />
      <Stack.Screen name={RouteName.OTP_SCREEN} component={OtpScreen} /> */}
    </Stack.Navigator>
  );
};

export default AuthNavigation;
