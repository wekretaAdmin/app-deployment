import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Apptheme from '../../assets/theme/apptheme';
import Images from '../../assets/images';
import FontStyle from '../../assets/theme/FontStyle';
import Gap from './Gap';
import {useNavigation} from '@react-navigation/native';
import RouteName from '../../navigation/RouteName';

const ProductListHeader = ({totalItems, title}) => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.goBack();
  };
  const onSearch = () => {
    navigation.navigate(RouteName.SEARCH);
  };
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.leftContainer}>
          <Image
            source={Images.pngImages.arrowNext}
            style={{height: '100%', width: '100%'}}
          />
        </View>
      </TouchableOpacity>

      <View style={styles.centreContainer}>
        <Text style={[FontStyle.labelMedium, {fontSize: 12}]}>{title}</Text>
        <Gap m1 />
        <Text style={[FontStyle.label, {fontSize: 10}]}>
          {totalItems} RESULTS
        </Text>
      </View>
      <TouchableOpacity onPress={onSearch} style={styles.rightContainer}>
        <Image
          source={Images.pngImages.search}
          style={{height: 22, width: 22}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProductListHeader;

const styles = StyleSheet.create({
  mainContainer: {
    height: Apptheme.spacing.headerHeight,
    //   backgroundColor: 'yellow',
    paddingHorizontal: Apptheme.spacing.innerContainer,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {height: 22, width: 22, transform: 'rotate(180deg)'},
  centreContainer: {alignItems: 'center'},
  rightContainer: {width: 22, height: 22},
});
