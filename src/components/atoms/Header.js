import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Images from '../../assets/images';
import Apptheme from '../../assets/theme/apptheme';
import Gap from './Gap';
import {useNavigation} from '@react-navigation/native';
import RouteName from '../../navigation/RouteName';

const Header = ({label, search = false, image = ''}) => {
  const navigation = useNavigation();
  const searchPress = () => {
    navigation.navigate(RouteName.SEARCH);
  };
  return (
    <View style={styles.header}>
      {label ? (
        <Text style={styles.headerText}>{label}</Text>
      ) : (
        <View style={{height: 30, width: 80}}>
          <Image
            source={{
              uri: image,
            }}
            style={{height: '100%', width: '100%'}}
            resizeMode="contain"
          />
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: Apptheme.spacing.headerHeight,
    backgroundColor: '#FFF',
    paddingHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerText: {fontSize: 16, fontFamily: 'Roboto-Bold', color: 'black'},
});
