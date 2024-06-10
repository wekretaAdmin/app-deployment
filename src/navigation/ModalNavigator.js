import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import ProductFilter from '../screens/product/components/ProductFilter';
import RouteName from './RouteName';

const Stack = createStackNavigator();

const ModalNavigator = () => {
  return (
    <Stack.Navigator mode="modal" initialRouteName={RouteName.PRODUCT_FILTER}>
      <Stack.Screen
        name={RouteName.PRODUCT_FILTER}
        component={ProductFilter}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ModalNavigator;

const styles = StyleSheet.create({});
