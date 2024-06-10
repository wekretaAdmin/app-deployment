/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */

import {
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Gap from '../atoms/Gap';
import Apptheme from '../../assets/theme/apptheme';
import FontStyle from '../../assets/theme/FontStyle';
import Images from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import RouteName from '../../navigation/RouteName';
import {Tabs} from 'react-native-collapsible-tab-view';
import {ActivityIndicator} from 'react-native-paper';
import {AddWishlist} from '../../apiServices/apiHelper';
import AxiosInstance from '../../apiServices/AxiosInstance';
import PaginationLoader from '../atoms/PaginationLoader';
import Loader from '../atoms/Loader';
import {Screen} from 'react-native-screens';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {FlashList} from '@shopify/flash-list';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const ProductListCard = ({
  data,
  productListing,
  loading,
  setLoading,
  productcall,
  setProductData,
  loadmore,
}) => {
  const navigation = useNavigation();
  const user = useSelector(state => state.loginReducer.user);
  const [refresh, setRefresh] = useState(false);

  const AddWishlistItem = async product => {
    const url = AddWishlist(product.id);
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

  console.log('data123', JSON.stringify(data));

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.substring(0, maxLength)}...`;
  };

  const ListItem = ({item, index}) => {
    const [SelectWishlist, setSelectWishLIst] = useState(item?.inWishlist);
    const [imageLoading, setImageLoading] = useState(true);
    const [error, setError] = useState(false);

    const onLoad = () => {
      setImageLoading(false);
    };
    const onError = () => {
      setError(true);
    };
    const onPress = () => {
      navigation.navigate(RouteName.PRODUCT_DETAIL, {id: item?.id});
    };

    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.6}
        style={[
          styles.cardContainer,
          {marginRight: index % 2 == 1 ? null : 2},
        ]}>
        <View style={styles.ImageContainer}>
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
                height: 182,
                width: '100%',
              }}>
              <ShimmerPlaceholder
                style={{height: 180, width: '98%'}}
                LinearGradient={LinearGradient}
              />
              {/* <ActivityIndicator size="small" color="#000" /> */}
            </View>
          )}
          {error && (
            <View
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                justifyContent: 'center',
                alignItems: 'center',
                height: 182,
                width: '100%',
              }}></View>
          )}
          <FastImage
            source={{uri: item?.mediaUrl}}
            style={{height: '100%', width: '100%'}}
            resizeMode="cover"
            onLoad={onLoad}
            onError={onError}
          />
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.discountContainer}>
            <Text
              style={[
                FontStyle.label,
                {
                  fontStyle: 'italic',
                  color: Apptheme.color.background,
                  textDecorationLine: 'line-through',
                  alignSelf: 'auto',
                },
              ]}>
              ₹ {item?.variants[0].mrp.toFixed(2)}
            </Text>
          </View>
          <Gap m1 />
          <View style={styles.amtContainer}>
            <Text style={FontStyle.label}>
              ₹ {item?.variants[0].sellingPrice.toFixed(2)}
            </Text>
          </View>
          <Gap m2 />
          <Text style={[FontStyle.headingSmall, {fontSize: 13}]}>
            {truncateText(item?.name, 55)}
          </Text>
          <Gap ms />
          {item?.promotionalTag ? (
            <Text style={[FontStyle.label, {color: Apptheme.color.text}]}>
              {item?.promotionalTag}
            </Text>
          ) : null}
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
          style={styles.favourite}>
          {!SelectWishlist ? (
            <Image
              source={Images.pngImages.favourite}
              // eslint-disable-next-line react-native/no-inline-styles
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
  const renderFooter = () => {
    // if (!loading) return null;
    return (
      <View>
        {loadmore ? (
          <>
            <Gap m4 />
            <PaginationLoader />
            <Gap m4 />
          </>
        ) : null}
      </View>
    );
  };

  const ListEmptyComponent = () => {
    return (
      <>
        {loading ? (
          <View
            style={{
              height: Dimensions.get('screen').height - 220,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Loader />
          </View>
        ) : (
          <View
            style={{
              height: Dimensions.get('screen').height - 220,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={[FontStyle.heading]}>NO PRODUCT FOUND</Text>
          </View>
        )}
      </>
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlashList
        data={data}
        renderItem={({item, index}) => <ListItem item={item} index={index} />}
        numColumns={2}
        // estimatedItemSize={200}
        // horizontal
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => {
              productcall(1, '', '', '');
              setProductData([]);
            }}
            progressViewOffset={30}
          />
        }
        onEndReached={() => {
          productListing();
        }}
        ListEmptyComponent={ListEmptyComponent}
        // ItemSeparatorComponent={<View />}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default ProductListCard;

const styles = StyleSheet.create({
  cardContainer: {
    height: 280,
    width: '99.5%',
    backgroundColor: Apptheme.color.containerBackground,
    marginBottom: 1,
  },
  ImageContainer: {
    height: '65%',
    backgroundColor: Apptheme.color.imageBackground,
    padding: 1,
  },
  detailContainer: {
    zIndex: 2,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 13,
    paddingBottom: 10,
  },
  discountContainer: {
    backgroundColor: Apptheme.color.red,
    paddingVertical: 5,
    paddingHorizontal: 8,
    width: '44%',
  },
  amtContainer: {
    backgroundColor: Apptheme.color.background,
    paddingVertical: 5,
    paddingHorizontal: 8,
    width: '46%',
  },
  favourite: {
    position: 'absolute',
    height: 22,
    width: 22,
    right: 10,
    top: 10,
  },
});
