import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Apptheme from '../../assets/theme/apptheme';
import FontStyle from '../../assets/theme/FontStyle';
import MatrialIcons from 'react-native-vector-icons/MaterialIcons';
import VectorIcon from '../../assets/vectorIcon';
import {assets} from '../../../react-native.config';
import Images from '../../assets/images';
import Gap from './Gap';
import {useNavigation} from '@react-navigation/native';
import RouteName from '../../navigation/RouteName';
import FastImage from 'react-native-fast-image';

const CategoryTextContainer = ({
  label,
  icon,
  imageContainerStyle,
  screenName,
  categoryName,

  data,
}) => {
  const navigation = useNavigation();

  const onPress = () => {
    if (data.length == 0) {
      navigation.navigate(RouteName.PRODUCT, {subCategoryName: label});
    } else {
      navigation.navigate(screenName, {data, label});
    }
  };

  console.log('icon', icon);
  const [error, setError] = useState(false);

  const onError = () => {
    setError(true);
  };
  console.log('hello', icon);

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View
        style={{
          height: 42,
          width: 42,
          ...imageContainerStyle,
          // backgroundColor: Apptheme.color.imageBackground,
        }}>
        {icon ? (
          <FastImage
            source={{uri: icon}}
            style={{height: '100%', width: '100%'}}
            resizeMode="cover"
            onLoadEnd={onError}
          />
        ) : (
          <View
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: Apptheme.color.imageBackground,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={Images.pngImages.emptyImage}
              style={{height: 17, width: 25}}
              resizeMode="contain"
            />
          </View>
        )}
      </View>
      <Gap row m7 />
      <View style={styles.textContainer}>
        <Text style={[FontStyle.heading, {textTransform: 'uppercase'}]}>
          {label}
        </Text>
      </View>
      <View style={{height: 22, width: 22}}>
        <Image
          source={Images.pngImages.arrowNext}
          style={{height: '100%', width: '100%'}}
        />
      </View>
      {/* <VectorIcon material-icon name="home" size={24} /> */}
    </TouchableOpacity>
  );
};

export default CategoryTextContainer;

const styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: Apptheme.spacing.categoryContainer,
    paddingHorizontal: 24,
  },
  textContainer: {
    flex: 1,
  },
});
