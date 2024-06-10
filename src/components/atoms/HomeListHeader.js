import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Gap from './Gap';
import Apptheme from '../../assets/theme/apptheme';
import FontStyle from '../../assets/theme/FontStyle';
import Images from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import RouteName from '../../navigation/RouteName';

const HomeListHeader = ({title, SeeAll = true}) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate(RouteName.PRODUCT, {categoryName: title});
  };

  return (
    <View style={{paddingHorizontal: Apptheme.spacing.categoryContainer}}>
      <Text style={FontStyle.heading}>{title}</Text>
      <Gap m3 />
      {SeeAll ? (
        <TouchableOpacity onPress={onPress} style={styles.seeAllConatiner}>
          <Text style={FontStyle.label}>SEE ALL</Text>
          <Gap row m3 />
          <View style={{width: 20, height: 10}}>
            <Image
              source={Images.pngImages.longArrowNext}
              style={{height: '100%', width: '100%', resizeMode: 'cover'}}
            />
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default HomeListHeader;

const styles = StyleSheet.create({
  seeAllConatiner: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 0.9,
    borderColor: Apptheme.color.text,
    maxWidth: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
