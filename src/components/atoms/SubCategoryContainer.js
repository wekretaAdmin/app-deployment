import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Apptheme from '../../assets/theme/apptheme';
import Gap from './Gap';
import FontStyle from '../../assets/theme/FontStyle';
import Images from '../../assets/images';
import Divider from './Divider';
import {useNavigation} from '@react-navigation/native';
import RouteName from '../../navigation/RouteName';
import FastImage from 'react-native-fast-image';

const SubCategoryContainer = ({data}) => {
  const navigation = useNavigation();

  const renderItem = ({item, index}) => {
    console.log(item?.mediaUrl);
    const onPress = () => {
      navigation.navigate(RouteName.PRODUCT, {name: item?.name});
    };
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.mainContainer}>
          <View style={styles.imageContainer}>
            <FastImage
              source={{uri: item?.mediaUrl}}
              style={{height: '100%', width: '100%'}}
              resizeMode="stretch"
            />
            {/* <Image
              source={{uri: item?.mediaUrl}}
              style={{height: '100%', width: '100%'}}
            /> */}
          </View>
          <Gap row m6 />
          <View style={styles.textContainer}>
            <Text style={[FontStyle.labelMedium, {fontSize: 13}]}>
              {item?.name}
            </Text>
          </View>
          <View style={styles.arrowContainer}>
            <Image
              source={Images.pngImages.arrowNext}
              style={{height: '100%', width: '100%'}}
            />
          </View>
        </View>
        <Divider />
        {index == data.length - 1 ? <View style={{height: 100}} /> : null}
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <FlatList
        data={data}
        renderItem={(item, index) => renderItem(item, index)}
      />
    </View>
  );
};

export default SubCategoryContainer;

const styles = StyleSheet.create({
  mainContainer: {
    height: 95,
    paddingHorizontal: Apptheme.spacing.innerContainer,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    height: 77,
    aspectRatio: 1,
    backgroundColor: Apptheme.color.imageBackground,
  },
  textContainer: {flex: 1},
  arrowContainer: {height: 18, width: 18},
});
