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
import React, {useEffect, useState} from 'react';
import ProductHeader from '../../../../components/atoms/ProductHeader';
import Apptheme from '../../../../assets/theme/apptheme';
import Divider from '../../../../components/atoms/Divider';
import Gap from '../../../../components/atoms/Gap';
import FontStyle from '../../../../assets/theme/FontStyle';
import Images from '../../../../assets/images';
import {useNavigation} from '@react-navigation/native';
import RouteName from '../../../../navigation/RouteName';
import {OrderListing} from '../../../../apiServices/apiHelper';
import AxiosInstance from '../../../../apiServices/AxiosInstance';
import {FlashList} from 'react-native-collapsible-tab-view';
import moment from 'moment';
import Loader from '../../../../components/atoms/Loader';

const OrderHistory = () => {
  const navigation = useNavigation();
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ListingOrder();
  }, []);

  const ListingOrder = async () => {
    setLoading(true);
    const url = OrderListing();

    console.log(AxiosInstance);

    console.log('ListingOrder', url);
    try {
      const response = await AxiosInstance.get(url);
      console.log('ListingOrder response', response.data);
      if (response.data.status) {
        setListing(response.data?.object);
      }
      setLoading(false);
    } catch (err) {
      console.log('@ ListingOrder error', err);
      setLoading(false);
    }
  };

  console.log('listing', JSON.stringify(listing));

  const RenderItem = ({item, index}) => {
    const orderDetail = () => {
      navigation.navigate(RouteName.ORDER_DETAIL, {orderId: item?.id});
    };
    return (
      <>
        <Gap m6 />
        <View>
          <TouchableOpacity onPress={orderDetail} style={styles.itemContainer}>
            <View>
              <Text style={[FontStyle.labelMedium, {fontSize: 13}]}>
                Ordered on :
                <Text style={[FontStyle.titleSmall, {fontSize: 13}]}>
                  {' '}
                  {moment(item?.onDate).format('DD/MM/YYYY')}
                </Text>
              </Text>
              <Gap ms />
              <Text style={[FontStyle.titleSmall, {fontSize: 13}]}>
                Order: {item.id}
              </Text>
              <Gap ms />

              <Text style={[FontStyle.titleSmall, {fontSize: 13}]}>
                Items: {item?.cartProducts.length}
              </Text>
              <Gap ms />

              <Text style={[FontStyle.titleSmall, {fontSize: 13}]}>
                Total: ₹ {item?.cartTotal.toFixed(2)}
              </Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              <Image
                source={Images.pngImages.arrowNext}
                style={{height: 22, width: 22}}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
          <Gap m6 />

          <Divider />
        </View>
        {listing.length - 1 == index ? (
          <>
            <Gap m9 />
            <Gap m9 />
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
          <View style={styles.loaderContainer}>
            <Loader />
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={[FontStyle.heading]}>NO ORDER PLACED </Text>
          </View>
        )}
      </>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: Apptheme.color.background}}>
      <ProductHeader
        secondOnpress={() => navigation.navigate(RouteName.PROFILE_SECTION)}
        name={'ORDERS'}
      />
      <Divider />
      <Gap m7 />
      <View style={{flex: 1, paddingLeft: Apptheme.spacing.innerContainer}}>
        <Text style={[FontStyle.labelMedium]}>YOUR PAST ORDERS</Text>
        {/* <Gap m6 /> */}
        <View style={{flex: 1}}>
          {/* <View
            style={{
              height: 30,
              backgroundColor: Apptheme.color.containerBackground,
              paddingRight: Apptheme.spacing.innerContainer,
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}>
            <Text style={[FontStyle.labelMedium]}>OCTOBER 2023</Text>
          </View> */}
          <Gap m3 />
          <Divider />
          <View style={{flex: 1}}>
            <FlatList
              data={listing}
              renderItem={({item, index}) => (
                <RenderItem item={item} index={index} />
              )}
              ListEmptyComponent={ListEmptyComponent}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  loaderContainer: {
    height: Dimensions.get('screen').height - 220,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    height: Dimensions.get('screen').height - 220,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: Apptheme.spacing.innerContainer,
  },
});
