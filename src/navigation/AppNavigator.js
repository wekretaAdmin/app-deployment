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
import AuthNavigation from './AuthNavigation';
import Search from '../screens/search';
import LoginScreen from '../screens/loginScreen';
import MobileNumberScreen from '../screens/loginScreen/components/MobileNumberScreen';
import OtpScreen from '../screens/loginScreen/components/OtpScreen';
import ProductFilter from '../screens/product/components/ProductFilter';
import ModalNavigator from './ModalNavigator';
import SuccessScreen from '../screens/SuccessScreen';
import Review from '../screens/profileScreen/components/orderHistory/Review';
import Rating from '../screens/profileScreen/components/orderHistory/Review/Rating';
import SubCategoryList from '../screens/homeScreen/components/SubCategoryList';
import WalletScreen from '../screens/profileScreen/components/walletScreen';
import NeedHelpScreen from '../screens/profileScreen/components/needHelp';
import TopUpScreen from '../screens/profileScreen/components/walletScreen/TopUpScreen';
import ChatNow from '../screens/profileScreen/components/needHelp/ChatNow';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        animationTypeForReplace: 'push',
        // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        name={RouteName.BOTTOM_TAB}
        component={BottomTabNavigation}
      />
      <Stack.Screen
        name={RouteName.AUTH_NAVIGATION}
        component={AuthNavigation}
      />
      <Stack.Screen
        name={RouteName.MODAL_NAVIGATOR}
        component={ModalNavigator}
      />
      <Stack.Screen name={RouteName.PRODUCT_DETAIL} component={ProductDetail} />
      <Stack.Screen name={RouteName.SUB_CATEGORY} component={SubCategory} />
      <Stack.Screen name={RouteName.ADD_ADDRESS} component={AddAdress} />
      <Stack.Screen name={RouteName.ORDER_HISTORY} component={OrderHistory} />
      <Stack.Screen name={RouteName.ORDER_DETAIL} component={OrderDetail} />
      <Stack.Screen name={RouteName.GIFT_CARD} component={GiftCard} />
      <Stack.Screen name={RouteName.VOUCHER_DETAIL} component={VoucherDetail} />
      <Stack.Screen name={RouteName.MY_ACCOUNT} component={MyAccount} />
      <Stack.Screen name={RouteName.ADDRESS_BOOK} component={AddressBook} />
      <Stack.Screen name={RouteName.SEARCH} component={Search} />
      <Stack.Screen name={RouteName.LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen name={RouteName.SUCCESS_SCREEN} component={SuccessScreen} />
      <Stack.Screen name={RouteName.REVIEW_SCREEN} component={Review} />
      <Stack.Screen name={RouteName.RATING_SCREEN} component={Rating} />
      <Stack.Screen name={RouteName.WALLET_SCREEN} component={WalletScreen} />
      <Stack.Screen name={RouteName.NEED_HELP} component={NeedHelpScreen} />
      <Stack.Screen name={RouteName.TOPUP_SCREEN} component={TopUpScreen} />
      <Stack.Screen name={RouteName.CHAT_NOW} component={ChatNow} />
      <Stack.Screen
        name={RouteName.SUBCATEGORYLIST}
        component={SubCategoryList}
      />
      <Stack.Screen
        name={RouteName.MOBILE_NUMBER_SCREEN}
        component={MobileNumberScreen}
      />
      <Stack.Screen name={RouteName.OTP_SCREEN} component={OtpScreen} />
      {/* <Stack.Screen name={RouteName.PRODUCT} component={Product} /> */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
