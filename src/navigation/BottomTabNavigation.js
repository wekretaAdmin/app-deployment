/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RouteName from './RouteName';
import HomeScreen from '../screens/homeScreen';
import ProfileSection from '../screens/profileScreen';
import WishListScreen from '../screens/wishListScreen';
import ShoppingBagScreen from '../screens/shoppingBagScreen';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Apptheme from '../assets/theme/apptheme';
import Images from '../assets/images';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SubCategory from '../screens/subCategory';
import Product from '../screens/product';
import Trending from '../screens/trending';
import {useSelector} from 'react-redux';
const Stack = createNativeStackNavigator();
const BottomTabNavigation = () => {
  const Tab = createBottomTabNavigator();
  const user = useSelector(state => state.loginReducer.user);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name={RouteName.HOME}
        component={HomeStackNavigator}
        options={{
          tabBarIcon: tab => (
            <Image
              source={Images.pngImages.home}
              style={{height: 21, width: 21, resizeMode: 'contain'}}
              tintColor={
                tab.focused ? Apptheme.color.text : Apptheme.color.subText
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name={RouteName.TRENDING}
        component={Trending}
        options={{
          tabBarIcon: tab => (
            <Image
              source={Images.pngImages.trending}
              style={{height: 21, width: 21, resizeMode: 'contain'}}
              tintColor={
                tab.focused ? Apptheme.color.text : Apptheme.color.subText
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name={RouteName.WISHLIST_SCREEN}
        component={WishListScreen}
        options={{
          tabBarIcon: tab => (
            <Image
              source={Images.pngImages.heart}
              style={{height: 23, width: 23, resizeMode: 'contain'}}
              tintColor={
                tab.focused ? Apptheme.color.text : Apptheme.color.subText
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name={RouteName.SHOPPING_BAG}
        component={ShoppingBagScreen}
        options={{
          tabBarIcon: tab => (
            <Image
              source={Images.pngImages.bag}
              style={{height: 21, width: 21, resizeMode: 'contain'}}
              tintColor={
                tab.focused ? Apptheme.color.text : Apptheme.color.subText
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name={RouteName.PROFILE_SECTION}
        component={ProfileSection}
        options={{
          tabBarIcon: tab => (
            <Image
              source={Images.pngImages.user}
              style={{height: 21, width: 21, resizeMode: 'contain'}}
              tintColor={
                tab.focused ? Apptheme.color.text : Apptheme.color.subText
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const HomeStackNavigator = () => {
  const screenOptions = {
    headerShown: false,
  };
  return (
    <Stack.Navigator initialRouteName={RouteName.DASHBOARD}>
      <Stack.Group screenOptions={screenOptions}>
        <Stack.Screen name={RouteName.HOME_SCREEN} component={HomeScreen} />
        <Stack.Screen name={RouteName.PRODUCT} component={Product} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
export default BottomTabNavigation;

const styles = StyleSheet.create({});
