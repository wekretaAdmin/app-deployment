/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Apptheme from '../../assets/theme/apptheme';
import Images from '../../assets/images';
import Gap from './Gap';
import FontStyle from '../../assets/theme/FontStyle';
import {useNavigation} from '@react-navigation/native';
import RouteName from '../../navigation/RouteName';
import Loader from './Loader';

const ProductListFilter = ({
  data,
  setVisible,
  brandId,
  setBrandId,
  filterByBrand,
  setProductData,
}) => {
  const navigation = useNavigation();
  const onFilterPress = () => {
    navigation.navigate(RouteName.MODAL_NAVIGATOR);
  };
  const renderItem = ({item}) => {
    console.log('brandId', brandId, item?.id);
    return (
      <TouchableOpacity
        onPress={() => {
          if (brandId == item?.id) {
            filterByBrand('');
            setBrandId();
          } else {
            filterByBrand(item?.name);
            setBrandId(item?.id);
          }
          setProductData([]);
        }}
        style={[
          styles.itemContainer,
          {
            borderColor:
              brandId == item.id
                ? Apptheme.color.black
                : Apptheme.color.boxOutline,
          },
        ]}>
        <Text
          style={[
            FontStyle.label,
            {
              fontSize: 10,
              color:
                brandId == item.id
                  ? Apptheme.color.black
                  : Apptheme.color.lightColor,
            },
          ]}>
          {item?.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{height: Apptheme.spacing.headerHeight, flexDirection: 'row'}}>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={styles.filterContainer}>
        <Image
          source={Images.pngImages.filter}
          style={{height: 23, width: 23, resizeMode: 'contain'}}
        />
        {brandId ? (
          <View
            style={{
              height: 15,
              aspectRatio: 1,
              backgroundColor: Apptheme.color.black,
              position: 'absolute',
              right: 10,
              top: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={[
                FontStyle.label,
                {color: Apptheme.color.background, fontSize: 10},
              ]}>
              1
            </Text>
          </View>
        ) : null}
      </TouchableOpacity>
      <FlatList
        data={data}
        horizontal
        renderItem={renderItem}
        ItemSeparatorComponent={<Gap row m3 />}
        style={{marginVertical: 14}}
        contentContainerStyle={{paddingHorizontal: 4}}
      />
    </View>
  );
};

export default ProductListFilter;

const styles = StyleSheet.create({
  filterContainer: {
    height: Apptheme.spacing.headerHeight,
    aspectRatio: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: Apptheme.color.boxOutline,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
});
