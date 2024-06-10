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
import Gap from '../atoms/Gap';
import FontStyle from '../../assets/theme/FontStyle';
import VectorIcon from '../../assets/vectorIcon';
import Images from '../../assets/images';
import RouteName from '../../navigation/RouteName';
import {useNavigation} from '@react-navigation/native';
import {AddToCart, moveCart} from '../../apiServices/apiHelper';
import axios from 'axios';
import {useSelector} from 'react-redux';
import AxiosInstance from '../../apiServices/AxiosInstance';
import Loader from '../atoms/Loader';

const WishListItem = ({
  data,
  ActionSheet,
  resfreshWishList,
  setActive,
  setActiveId,
  loading,
}) => {
  const navigation = useNavigation();

  const user = useSelector(state => state.loginReducer.user);

  const AddCart = async skuCode => {
    const url = moveCart();
    console.log(url);
    try {
      const body = {
        skuCode: skuCode,
        isAdding: 1,
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
      console.log('productDetail response', response.data);
      if (response.data.status) {
        resfreshWishList();
      }
    } catch (err) {
      console.log('@ HomePageCategoryListing error', err);
    }
  };

  const renderItem = ({item, index}) => {
    console.log('item123e', item);
    const AddBag = () => {
      AddCart(item?.variants[0]?.sku);
    };

    const onPress = () => {
      navigation.navigate(RouteName.PRODUCT_DETAIL, {id: item?.id});
    };
    return (
      <>
        <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
          <View style={styles.imageConatiner}>
            <Image
              source={{
                uri: item?.mediaUrl,
              }}
              style={{height: '100%', width: '100%'}}
            />
          </View>
          <View style={styles.detailContainer}>
            <View style={{flex: 1}}>
              {item?.alert ? (
                <View style={styles.alertContainer}>
                  <Text
                    style={[
                      FontStyle.label,
                      {
                        color: Apptheme.color.background,
                        fontStyle: 'italic',
                        paddingHorizontal: 4,
                        fontSize: 11,
                      },
                    ]}>
                    {item?.alert}
                  </Text>
                </View>
              ) : null}
              <Gap m1 />
              <View style={{flexDirection: 'row'}}>
                <View style={styles.priceContainer}>
                  <Text style={[FontStyle.label]}>
                    ₹ {item?.variants[0]?.sellingPrice?.toFixed(2)}
                  </Text>
                </View>
                <Gap row ms />
                {item?.discount ? (
                  <View style={styles.discountContainer}>
                    <Text
                      style={[
                        FontStyle.label,
                        {fontStyle: 'italic', color: Apptheme.color.background},
                      ]}>
                      {item?.discount}
                    </Text>
                  </View>
                ) : null}
              </View>
              <Gap m2 />
              <Text style={[FontStyle.headingSmall]}>{item?.name}</Text>
              <Gap m7 />

              <TouchableOpacity onPress={AddBag} style={styles.buttonContainer}>
                <Text style={[FontStyle.headingSmall, {fontSize: 11}]}>
                  ADD TO BAG
                </Text>

                <Image
                  source={Images.pngImages.addbag}
                  style={{height: 13, width: 13}}
                  resizeMode="contain"
                  tintColor={Apptheme.color.text}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              hitSlop={20}
              onPress={() => {
                ActionSheet.current.open();
                setActive(item?.variants[0]?.sku);
                setActiveId(item?.id);
              }}
              style={styles.optionContainer}>
              <VectorIcon
                material-community-icon
                name="dots-vertical"
                size={21}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        {index == data.length - 1 ? (
          <>
            <Gap m9 />
            <Gap m9 />
            <Gap m9 />
          </>
        ) : null}
      </>
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
            <Text style={[FontStyle.heading]}>NOTHING SAVED YET</Text>
          </View>
        )}
      </>
    );
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={(item, index) => renderItem(item, index)}
        ListEmptyComponent={ListEmptyComponent}
        ItemSeparatorComponent={
          <View style={styles.ItemSeparatorContainer}>
            <View style={styles.ItemSeparatorComponent} />
          </View>
        }
      />
    </View>
  );
};

export default WishListItem;

const styles = StyleSheet.create({
  ItemSeparatorContainer: {
    height: 1.5,
    backgroundColor: Apptheme.color.containerBackground,
    alignItems: 'flex-end',
  },
  ItemSeparatorComponent: {
    width: '95%',
    backgroundColor: Apptheme.color.background,
    height: '100%',
  },
  itemContainer: {
    height: 150,
    backgroundColor: Apptheme.color.containerBackground,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageConatiner: {
    height: 140,
    aspectRatio: 1,
    backgroundColor: Apptheme.color.containerBackground,
  },
  detailContainer: {
    flex: 1,
    paddingHorizontal: Apptheme.spacing.innerContainer,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alertContainer: {
    backgroundColor: Apptheme.color.alert,
    width: '50%',
    paddingVertical: 3,
  },
  priceContainer: {
    padding: 5,
    backgroundColor: '#fff',
    width: '36%',
  },
  discountContainer: {
    padding: 5,
    backgroundColor: Apptheme.color.red,
    width: '19%',
  },
  buttonContainer: {
    borderWidth: 1,
    borderColor: Apptheme.color.text,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
    paddingVertical: 3,
    width: '52%',
  },
  optionContainer: {justifyContent: 'center', marginRight: -5},
});
