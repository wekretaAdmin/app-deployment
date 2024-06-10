/* eslint-disable react/no-unstable-nested-components */
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import ProductHeader from '../../../../components/atoms/ProductHeader';
import Apptheme from '../../../../assets/theme/apptheme';
import Divider from '../../../../components/atoms/Divider';
import Gap from '../../../../components/atoms/Gap';
import FontStyle from '../../../../assets/theme/FontStyle';
import Images from '../../../../assets/images';
import VectorIcon from '../../../../assets/vectorIcon';
import MyComponent from './MyComponent';
import {OrderDetailApi, TrackOrder} from '../../../../apiServices/apiHelper';
import AxiosInstance from '../../../../apiServices/AxiosInstance';
import {useNavigation, useRoute} from '@react-navigation/native';
import moment from 'moment';
import {transparent} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import RouteName from '../../../../navigation/RouteName';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

const OrderDetail = () => {
  const [delivery, setDelivery] = useState(false);
  const [payment, setPayment] = useState(false);
  const [total, setTotal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState([]);
  const [trackData, setTrackData] = useState();
  const [viewMore, setViewMore] = useState(false);
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef();
  const [data, setData] = useState([
    {label: 'order Placed', time: ''},
    {label: 'Accepted and Ready to ship', time: ''},
    {label: 'Shipped', time: ''},
    {label: 'out For Delivery', time: ''},
    {label: 'Delivered', time: ''},
  ]);
  const BackDrop = useCallback(
    props => (
      <BottomSheetBackdrop {...props} opacity={1} disappearsOnIndex={-1} />
    ),
    [],
  );
  const route = useRoute();

  const orderId = route.params?.orderId;

  useEffect(() => {
    detailApi(orderId);
    TrackPackage();
  }, [orderId]);

  const detailApi = async orderId => {
    setLoading(true);
    const url = OrderDetailApi(orderId);

    console.log('ListingOrder', url);
    try {
      const response = await AxiosInstance.get(url);
      console.log('ListingOrder response', response.data);
      if (response.data.status) {
        setDetail(response.data?.object);
      }
      setLoading(false);
    } catch (err) {
      console.log('@ ListingOrder error', err);
      setLoading(false);
    }
  };

  const TrackPackage = async () => {
    const url = TrackOrder(orderId);

    console.log('ListingOrder', url);
    try {
      const response = await AxiosInstance.get(url);
      console.log('ListingOrder response', response.data);
      if (response.data.status) {
        setTrackData(response?.data.object);

        console.log('TrackPackage', response?.data.object);
      }
    } catch (err) {
      console.log('@ ListingOrder error', err);
    }
  };

  console.log('detail', JSON.stringify(trackData));

  console.log('detail1234', detail);

  const scrollRef = useRef(null);
  const renderItem = ({item}) => {
    const onReview = () => {
      navigation.navigate(RouteName.REVIEW_SCREEN, {item});
    };
    return (
      <View style={styles.itemMainContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: item?.mediaUrl,
            }}
            style={{height: '100%', width: '100%'}}
          />
        </View>
        <View style={styles.detailcontainer}>
          <View style={{flex: 1}}>
            <Gap m1 />
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  padding: 5,
                  backgroundColor: '#fff',
                  width: '33%',
                }}>
                <Text style={[FontStyle.label]}>
                  ₹ {item?.sellingPrice.toFixed(2)}
                </Text>
              </View>
              <Gap row ms />

              <View
                style={{
                  padding: 5,
                  backgroundColor: Apptheme.color.red,
                  width: '27%',
                }}>
                <Text
                  style={[
                    FontStyle.label,
                    {
                      fontStyle: 'italic',
                      color: Apptheme.color.background,
                      textDecorationLine: 'line-through',
                    },
                  ]}>
                  ₹{item?.mrp.toFixed(2)}
                </Text>
              </View>
            </View>
            <Gap m2 />
            <Text style={[FontStyle.headingSmall]}>{item?.name}</Text>
            {item?.varient == '' ? null : (
              <Text style={[FontStyle.label]}>varient: {item?.varient}</Text>
            )}
            <Text style={[FontStyle.label]}>Quantity: {item?.quantity}</Text>
            <Gap m5 />

            <TouchableOpacity onPress={onReview} style={styles.reviewContainer}>
              <Text style={[FontStyle.headingSmall, {fontSize: 11}]}>
                REVIEW
              </Text>

              <Image
                source={Images.pngImages.longArrowNext}
                style={{height: 13, width: 13}}
                resizeMode="contain"
                tintColor={Apptheme.color.text}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  const ItemSeparatorComponent = () => {
    return (
      <View style={styles.ItemSeparatorContainer}>
        <View style={styles.leftSeparatorContainer} />
        <View style={styles.rightSeparatorComponent} />
      </View>
    );
  };

  const ProductItem = ({item}) => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={[
              FontStyle.titleSmall,
              {fontSize: 13, color: Apptheme.color.subText},
            ]}>
            {item?.name}
          </Text>
          <Text style={[FontStyle.titleSmall]}>
            ₹ {item?.sellingPrice.toFixed(2)}
          </Text>
        </View>
        <Gap m3 />
      </>
    );
  };

  const TrackList = ({item, index}) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              height: 14,
              aspectRatio: 1,
              backgroundColor: item?.actedOn
                ? Apptheme.color.green
                : Apptheme.color.boxOutline,
              borderRadius: 360,
              marginTop: index == 0 ? 20 : null,
            }}
          />
          <View
            style={{
              height: trackData.length - 1 == index ? 0 : 80,
              width: 2,
              backgroundColor: item?.actedOn
                ? Apptheme.color.green
                : Apptheme.color.boxOutline,
            }}
          />
        </View>
        <Gap row m9 />
        <View
          style={{flexDirection: 'row', marginTop: index != 0 ? -20 : null}}>
          <View
            style={{
              height: 50,
              aspectRatio: 1,
              borderRadius: 360,
              backgroundColor: Apptheme.color.boxOutline,
            }}
          />
          <Gap row m6 />
          <View
            style={{
              justifyContent: 'center',

              height: 50,
            }}>
            <Text style={[FontStyle.headingSmall]}>{item?.newStatus}</Text>
            {item?.actedOn ? (
              <Text style={[FontStyle.label]}>
                on {moment(item?.actedOn).format('D MMM, YYYY |h:mm A')}
              </Text>
            ) : null}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: Apptheme.color.background}}>
      <ProductHeader name={'ORDERS DETAILS'} />
      <Divider />
      <ScrollView style={{flex: 1}} ref={scrollRef}>
        <Gap m4 />
        <View
          style={{
            padding: Apptheme.spacing.innerContainer,
            flexDirection: 'row',
          }}>
          <View style={{justifyContent: 'center'}}>
            <Image
              source={Images.pngImages.return}
              style={{height: 25, width: 25}}
              resizeMode="contain"
            />
          </View>
          <Gap row m6 />
          <View style={{flex: 1}}>
            <Text style={[FontStyle.labelMedium]}>RETURN & EXCHANGE</Text>
            <Text style={[FontStyle.label]}>
              Not the right fit? Return or Swap for free{' '}
            </Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Image
              source={Images.pngImages.arrowNext}
              style={{height: 20, width: 20}}
            />
          </View>
        </View>
        <View style={styles.trackPackageContainer}>
          <Text style={[FontStyle.labelMedium, {fontSize: 13}]}>
            {detail[0]?.cartProducts?.length} Item
          </Text>
          <Text
            onPress={() => {
              bottomSheetModalRef.current?.present();
            }}
            style={[
              FontStyle.labelMedium,
              {textDecorationLine: 'underline', fontSize: 13},
            ]}>
            TRACK PACKAGE
          </Text>
        </View>
        <View style={styles.whiteDivider} />
        <View
          style={{
            height: viewMore
              ? null
              : detail[0]?.cartProducts.length == 1
              ? 150
              : 300,
          }}>
          <FlatList
            data={detail[0]?.cartProducts}
            renderItem={renderItem}
            ItemSeparatorComponent={ItemSeparatorComponent}
          />
        </View>
        {detail[0]?.cartProducts.length <= 2 ? null : (
          <TouchableOpacity
            onPress={() => setViewMore(!viewMore)}
            style={{
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={[FontStyle.label]}>
              VIEW {viewMore ? 'LESS' : 'MORE'}
            </Text>
          </TouchableOpacity>
        )}

        <Divider />
        <Gap m9 />
        <View style={{paddingHorizontal: Apptheme.spacing.innerContainer}}>
          <Text style={[FontStyle.heading]}>ORDER DETAIL</Text>
          <Gap m3 />
          <View style={styles.OrderDetailContainer}>
            <View style={{flex: 1}}>
              <Text style={[FontStyle.headingSmall]}>Order Number</Text>
            </View>
            <View>
              <Text style={[FontStyle.label]}>{detail[0]?.id}</Text>
            </View>
            <View style={styles.dropDownContainer}></View>
          </View>
          <Divider />
          <View style={styles.OrderDetailContainer}>
            <View style={{flex: 1}}>
              <Text style={[FontStyle.headingSmall]}>Order Date</Text>
            </View>
            <View>
              <Text style={[FontStyle.label]}>
                {moment(detail[0]?.onDate).format('DD/MM/YYYY')}
              </Text>
            </View>
            <View style={styles.dropDownContainer}></View>
          </View>
          <Divider />
          <TouchableOpacity
            onPress={() => setDelivery(!delivery)}
            style={styles.OrderDetailContainer}>
            <View style={{flex: 1}}>
              <Text style={[FontStyle.headingSmall]}>delivery</Text>
            </View>
            <View>
              {delivery ? null : (
                <Text style={[FontStyle.label]}>Standard Delivery</Text>
              )}
            </View>
            <View style={styles.dropDownContainer}>
              {delivery ? (
                <VectorIcon material-icon name="keyboard-arrow-up" size={22} />
              ) : (
                <VectorIcon
                  material-icon
                  name="keyboard-arrow-down"
                  size={22}
                />
              )}
            </View>
          </TouchableOpacity>
          {delivery ? (
            <>
              <Text style={[FontStyle.titleSmall]}>Standard Delivery</Text>
              <Gap m6 />
              <Text
                style={[
                  FontStyle.titleSmall,
                  {fontSize: 13, color: Apptheme.color.subText},
                ]}>
                DELIVERY ADDRESS
              </Text>
              <Gap m4 />
              <Text style={[FontStyle.titleSmall]}>
                {detail[0]?.customerName}
              </Text>
              <Text style={[FontStyle.titleSmall]}>
                {detail[0]?.address?.addressLine1} {detail[0]?.address?.city}
              </Text>
              <Text style={[FontStyle.titleSmall]}>
                {detail[0]?.address?.pincode}
              </Text>
              <Text style={[FontStyle.titleSmall]}>
                {detail[0]?.address?.state} {detail[0]?.address?.country}
              </Text>
              <Gap m8 />
            </>
          ) : null}
          <Divider />

          <TouchableOpacity
            onPress={() => setPayment(!payment)}
            style={styles.OrderDetailContainer}>
            <View style={{flex: 1}}>
              <Text style={[FontStyle.headingSmall]}>Payment</Text>
            </View>
            <View>
              {payment ? null : (
                <Text style={[FontStyle.label]}>{detail[0]?.paymentMode}</Text>
              )}
            </View>
            <View style={styles.dropDownContainer}>
              {payment ? (
                <VectorIcon material-icon name="keyboard-arrow-up" size={22} />
              ) : (
                <VectorIcon
                  material-icon
                  name="keyboard-arrow-down"
                  size={22}
                />
              )}
            </View>
          </TouchableOpacity>
          {payment ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={[
                    FontStyle.titleSmall,
                    {fontSize: 13, color: Apptheme.color.subText},
                  ]}>
                  PAYMENT METHOD
                </Text>
                <Text style={[FontStyle.titleSmall]}>
                  {detail[0]?.paymentMode}
                </Text>
              </View>
              <Gap m2 />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={[
                    FontStyle.titleSmall,
                    {fontSize: 13, color: Apptheme.color.subText},
                  ]}>
                  BILLING ADDRESS
                </Text>
                <Text style={[FontStyle.titleSmall]}>
                  Same as delivery Address
                </Text>
              </View>

              <Gap m8 />
            </>
          ) : null}
          <Divider />

          <TouchableOpacity
            onPress={() => {
              setTotal(!total);
              scrollRef.current?.scrollToEnd({animated: true});
            }}
            style={styles.OrderDetailContainer}>
            <View style={{flex: 1}}>
              <Text style={[FontStyle.headingSmall]}>Total</Text>
            </View>
            <View>
              {total ? null : (
                <Text style={[FontStyle.label]}>
                  ₹ {detail[0]?.netPayable?.toFixed(2)}
                </Text>
              )}
            </View>
            <View style={styles.dropDownContainer}>
              {total ? (
                <VectorIcon material-icon name="keyboard-arrow-up" size={22} />
              ) : (
                <VectorIcon
                  material-icon
                  name="keyboard-arrow-down"
                  size={22}
                />
              )}
            </View>
          </TouchableOpacity>
          {total ? (
            <>
              <View>
                <FlatList
                  data={detail[0]?.cartProducts}
                  renderItem={ProductItem}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={[
                      FontStyle.titleSmall,
                      {fontSize: 13, color: Apptheme.color.subText},
                    ]}>
                    SHIPPING
                  </Text>
                  <Text style={[FontStyle.titleSmall]}>
                    ₹ {detail[0]?.deliveryCharges.toFixed(2)}
                  </Text>
                </View>
                <Gap m3 />

                {/* <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={[
                      FontStyle.titleSmall,
                      {fontSize: 13, color: Apptheme.color.subText},
                    ]}>
                    TAX
                  </Text>
                  <Text style={[FontStyle.titleSmall]}>
                    ₹ {detail[0]?.tax.toFixed(2)}
                  </Text>
                </View> */}
              </View>
              <Gap m7 />
              <View
                style={{height: 1, backgroundColor: Apptheme.color.black}}
              />
              <Gap m7 />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={[FontStyle.headingSmall]}>TOTAL</Text>
                <Text style={[FontStyle.headingSmall]}>
                  {' '}
                  ₹ {detail[0]?.netPayable?.toFixed(2)}
                </Text>
              </View>
              <Gap m8 />
            </>
          ) : null}
          <Divider />
          <Gap m9 />
          <Gap m9 />
        </View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          style={{backgroundColor: '#fff'}}
          index={0}
          backdropComponent={BackDrop} // Custom backdrop component
          enableDynamicSizing={true}
          onDismiss={() => bottomSheetModalRef.current?.close()}
          keyboardBehavior="fillParent"
          keyboardBlurBehavior="restore"
          android_keyboardInputMode="adjustResize">
          <BottomSheetView>
            <View style={{padding: Apptheme.spacing.innerContainer}}>
              <Text style={[FontStyle.headingSmall]}>TRACK ORDER</Text>
              <Gap m9 />
              <View>
                <FlatList
                  data={trackData}
                  renderItem={({item, index}) => (
                    <TrackList item={item} index={index} />
                  )}
                />
              </View>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </ScrollView>
    </View>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  whiteDivider: {height: 3},
  OrderDetailContainer: {
    flexDirection: 'row',
    paddingVertical: Apptheme.spacing.innerContainer,
    alignItems: 'center',
  },
  dropDownContainer: {
    height: 45,
    width: 70,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  ItemSeparatorContainer: {
    height: 1,
    flexDirection: 'row',
  },
  leftSeparatorContainer: {
    height: '100%',
    width: '10%',
    backgroundColor: Apptheme.color.containerBackground,
  },
  rightSeparatorComponent: {
    height: '100%',
    flex: 1,
    backgroundColor: Apptheme.color.background,
  },
  itemMainContainer: {
    height: 150,
    backgroundColor: Apptheme.color.containerBackground,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageContainer: {
    height: 140,
    aspectRatio: 1,
    backgroundColor: Apptheme.color.containerBackground,
  },
  detailcontainer: {
    flex: 1,
    paddingHorizontal: Apptheme.spacing.innerContainer,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewContainer: {
    borderWidth: 1,
    borderColor: Apptheme.color.text,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
    paddingVertical: 4,
    width: '38%',
  },
  trackPackageContainer: {
    padding: Apptheme.spacing.categoryContainer,
    backgroundColor: Apptheme.color.containerBackground,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingVertical: 25,
  },
});
