import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Apptheme from '../../assets/theme/apptheme';
import Images from '../../assets/images';
import FontStyle from '../../assets/theme/FontStyle';
import {useNavigation} from '@react-navigation/native';

const ProductHeader = ({name, secondOnpress = null}) => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        onPress={() => (secondOnpress ? secondOnpress() : onPress())}>
        <View style={{height: 22, width: 22, transform: 'rotate(180deg)'}}>
          <Image
            source={Images.pngImages.arrowNext}
            style={{height: '100%', width: '100%'}}
          />
        </View>
      </TouchableOpacity>
      <View>
        <Text style={FontStyle.headingSmall}>{name}</Text>
      </View>
      <View style={{width: 22, height: 22}} />
    </View>
  );
};

export default ProductHeader;

const styles = StyleSheet.create({
  mainContainer: {
    height: Apptheme.spacing.headerHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Apptheme.spacing.innerContainer,
    alignItems: 'center',
  },
});
