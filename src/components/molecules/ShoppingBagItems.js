/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Apptheme from '../../assets/theme/apptheme';
import FontStyle from '../../assets/theme/FontStyle';
import Gap from '../atoms/Gap';
import VectorIcon from '../../assets/vectorIcon';
import Images from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import RouteName from '../../navigation/RouteName';
import {AddWishlist, moveCart} from '../../apiServices/apiHelper';
import AxiosInstance from '../../apiServices/AxiosInstance';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../atoms/Loader';
import {cardId} from '../../redux/Reducer/login/LoginSlice';

const ShoppingBagItems = ({
  data,
  refereshCart,
  openOptionModal,
  setSKU,
  loading,
  setItemQuantity,
  setQuantity,
  option = true,
  Save = true,
  defaultQuantity,
  setProductId,
  setEditVarient,
  productDetails,
}) => {
  const navigation = useNavigation();
  const user = useSelector(state => state.loginReducer.user);
  const dispatch = useDispatch();
  const AddWishlistItem = async skuCode => {
    const url = moveCart();
    console.log(url);
    try {
      const body = {
        skuCode: skuCode,
        isAdding: 0,
        orderSource: 'WEBSITE',
        deliveryCharges: 0,
        specialDeliveryLocationCharges: 0,
        couponCode: '',
        giftWrap: 0,
        message: '',
        isPromoCodeApplied: 0,
        giftCardCode: '',
        deliveryType: '',
        isFreeShipping: false,
        secondaryKey: user.cardId,
        browser: 'Chrome',
        deviceType: 'Mobile',
        os: 'android',
      };

      const response = await AxiosInstance.put(url, body);
      console.log('AddWishlistItem response', response.data);
      if (response.data.status) {
        refereshCart();
      }
    } catch (err) {
      console.log('@ AddWishlistItem error', err);
    }
  };

  const renderItem = ({item}) => {
    console.log('itembag', item?.varient);
    const onPress = () => {
      navigation.navigate(RouteName.PRODUCT_DETAIL, {id: item?.productId});
    };

    const onSave = () => {
      AddWishlistItem(item.skuCode);
    };

    const truncateText = (text, maxLength) => {
      if (text.length <= maxLength) {
        return text;
      }
      return `${text.substring(0, maxLength)}...`;
    };

    return (
      <TouchableOpacity onPress={onPress} style={styles.mainContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: item?.mediaUrl,
            }}
            style={{height: '100%', width: '100%'}}
          />
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.leftDetailsContainer}>
            <View style={styles.priceContainer}>
              <Text style={[FontStyle.label]}>
                ₹ {item?.sellingPrice.toFixed(2)}
              </Text>
            </View>
            <Gap m2 />
            <Text style={[FontStyle.headingSmall]}>
              {truncateText(item?.name, 55)}
            </Text>

            <Gap m1 />
            <View style={styles.sizeContainer}>
              {item?.varient == '' ? null : (
                <Text style={[FontStyle.label]}>
                  Varient: {item?.varient} {'  '}
                </Text>
              )}
              <Text style={[FontStyle.label]}>Quantity: {item?.quantity}</Text>
            </View>
            <Gap m4 />
            {Save ? (
              <TouchableOpacity onPress={onSave} style={styles.buttonContainer}>
                <Text style={[FontStyle.headingSmall, {fontSize: 12}]}>
                  SAVE
                </Text>

                <Image
                  source={Images.pngImages.heart}
                  style={{height: 15, width: 15}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ) : null}
          </View>
          {option ? (
            <TouchableOpacity
              hitSlop={20}
              onPress={() => {
                openOptionModal();
                setSKU(item.skuCode);
                setItemQuantity(item?.quantity);
                setQuantity(false);
                setEditVarient(false);
                defaultQuantity(item?.quantity);
                // setProductId(item?.productId);
                productDetails(item?.productId);
              }}
              style={styles.rightDetailContainer}>
              <VectorIcon
                material-community-icon
                name="dots-vertical"
                size={20}
              />
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (data?.length == 0) {
      console.log('incardId');
      dispatch(cardId(''));
    }
  }, [data]);

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
            <Text style={[FontStyle.heading]}>NOTHING IN SHOPPING BAG</Text>
          </View>
        )}
      </>
    );
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={
          <View style={styles.itemSeparatorContainer}>
            <View style={styles.ItemSeparatorComponent} />
          </View>
        }
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

export default ShoppingBagItems;

const styles = StyleSheet.create({
  itemSeparatorContainer: {
    height: 1.5,
    backgroundColor: Apptheme.color.containerBackground,
    alignItems: 'flex-end',
  },
  ItemSeparatorComponent: {
    width: '95%',
    backgroundColor: Apptheme.color.background,
    height: '100%',
  },
  mainContainer: {
    height: 135,
    backgroundColor: Apptheme.color.containerBackground,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageContainer: {
    height: 125,
    aspectRatio: 1,
    backgroundColor: Apptheme.color.containerBackground,
  },
  detailsContainer: {
    flex: 1,
    paddingHorizontal: Apptheme.spacing.innerContainer,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftDetailsContainer: {flex: 1},
  rightDetailContainer: {justifyContent: 'center'},
  priceContainer: {padding: 5, backgroundColor: '#fff', width: '36%'},
  sizeContainer: {flexDirection: 'row'},
  buttonContainer: {
    borderWidth: 0.9,
    borderColor: Apptheme.color.text,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
    paddingVertical: 2,
    width: '33%',
  },
});
