/* eslint-disable react/no-unstable-nested-components */
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Apptheme from '../../assets/theme/apptheme';
import Gap from './Gap';
import FontStyle from '../../assets/theme/FontStyle';
import Images from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import RouteName from '../../navigation/RouteName';
import AxiosInstance from '../../apiServices/AxiosInstance';
import {AddWishlist} from '../../apiServices/apiHelper';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const HomeListContainer = ({paddingHorizontal, products}) => {
  const navigation = useNavigation();
  const user = useSelector(state => state.loginReducer.user);

  const AddWishlistItem = async productId => {
    console.log('productId', productId);
    const url = AddWishlist(productId.id);
    try {
      const response = await AxiosInstance.post(url);

      console.log('HomePageCategoryListing response', response.data);
      return response.data;
      if (response.data.status) {
        console.log('wishConsole', response.data?.object);
      }
    } catch (err) {
      console.log('@ HomePageCategoryListing error', err);
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.substring(0, maxLength)}...`;
  };

  const RenderItem = ({item}) => {
    const [SelectWishlist, setSelectWishLIst] = useState(item?.inWishlist);
    const [imageLoading, setImageLoading] = useState(true);

    const onLoad = () => {
      setImageLoading(false);
    };

    console.log('item1234', item);

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(RouteName.PRODUCT_DETAIL, {id: item?.id})
        }
        style={styles.productContainer}>
        <View style={styles.imageContainer}>
          {imageLoading && (
            <View
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                justifyContent: 'center',
                alignItems: 'center',
                height: 180,
                width: '100%',
              }}>
              <ShimmerPlaceholder
                style={{height: 180, width: '98%'}}
                LinearGradient={LinearGradient}
              />
              {/* <ActivityIndicator size="small" color="#000" /> */}
            </View>
          )}
          <FastImage
            source={{uri: item?.mediaUrl}}
            style={{height: '100%', width: '100%'}}
            resizeMode="cover"
            onLoad={onLoad}
          />
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.amtContainer}>
            <Text style={FontStyle.label}>
              ₹{' '}
              {item?.variants
                ? item?.variants[0]?.sellingPrice
                : item?.sellingPrice}
            </Text>
          </View>
          <Gap m3 />
          <Text style={[FontStyle.headingSmall, {fontSize: 12}]}>
            {truncateText(item?.name, 46)}
          </Text>
          <Gap m1 />
          <Text style={[FontStyle.label, {color: Apptheme.color.subText}]}>
            {item?.categoryName}
          </Text>
        </View>
        <TouchableOpacity
          hitSlop={20}
          onPress={async () => {
            if (!user.isLogin) {
              navigation.navigate(RouteName.LOGIN_SCREEN, {from: 'register'});
            } else {
              const result = await AddWishlistItem(item);
              if (result.status) {
                setSelectWishLIst(!SelectWishlist);
              } else {
                setSelectWishLIst(!SelectWishlist);
              }
            }
          }}
          style={styles.favouriteContainer}>
          {!SelectWishlist ? (
            <Image
              source={Images.pngImages.favourite}
              style={{height: '100%', width: '100%', resizeMode: 'contain'}}
            />
          ) : (
            <Image
              source={Images.pngImages.fillHeart}
              style={{height: '100%', width: '100%', resizeMode: 'contain'}}
            />
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <FlatList
        contentContainerStyle={{
          paddingHorizontal:
            paddingHorizontal ?? Apptheme.spacing.categoryContainer,
        }}
        horizontal
        overScrollMode="never"
        data={products}
        scrollEnabled={products?.length > 2 ? true : false}
        renderItem={({item, index}) => <RenderItem item={item} index={index} />}
        ItemSeparatorComponent={<Gap row ms />}
      />
    </View>
  );
};

export default HomeListContainer;

const styles = StyleSheet.create({
  productContainer: {
    height: 270,
    width: 170,
    flex: 1,
    backgroundColor: Apptheme.color.imageBackground,
  },
  imageContainer: {
    height: 180,
    backgroundColor: Apptheme.color.containerBackground,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 1,
  },
  detailContainer: {padding: 6, justifyContent: 'flex-end', flex: 1},
  amtContainer: {
    backgroundColor: Apptheme.color.background,
    width: '46%',
    paddingVertical: 5,
    alignItems: 'center',
  },
  favouriteContainer: {
    position: 'absolute',
    height: 22,
    width: 22,
    right: 10,
    top: 10,
  },
});
