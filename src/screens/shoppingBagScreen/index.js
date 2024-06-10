/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Header from '../../components/atoms/Header';
import Images from '../../assets/images';
import Divider from '../../components/atoms/Divider';
import Apptheme from '../../assets/theme/apptheme';
import FontStyle from '../../assets/theme/FontStyle';
import RazorpayCheckout from 'react-native-razorpay';
import Gap from '../../components/atoms/Gap';
import VectorIcon from '../../assets/vectorIcon';
import AddButton from '../../components/atoms/AddButton';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import RouteName from '../../navigation/RouteName';
import InputField from '../../components/atoms/inputField';
import ShoppingBagItems from '../../components/molecules/ShoppingBagItems';
import {
  AddToCart,
  AddWishlist,
  Checkoutcart,
  GetCard,
  GetPayment,
  InitiatePayment,
  ProductDetailApi,
  RemovefromCart,
  WalletCheckout,
  couponList,
  editVarientInCart,
  fetchAddress,
  moveCart,
  setAddress,
  verifyPayment,
  walletSendOtp,
  walletVerifyOtp,
} from '../../apiServices/apiHelper';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../components/atoms/Loader';
import AxiosInstance from '../../apiServices/AxiosInstance';
import moment from 'moment';
import {cardId} from '../../redux/Reducer/login/LoginSlice';
import PaginationLoader from '../../components/atoms/PaginationLoader';
import LottieView from 'lottie-react-native';
import OTPTextView from 'react-native-otp-textinput';

const ShoppingBagScreen = () => {
  const bottomSheetModalRef = useRef(null);
  const bottomSheetOptionModalRef = useRef(null);
  const [shippingmethod, setShippingMethod] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [promoCode, setPromoCode] = useState(false);
  const [addPromeCode, setADDPromoCode] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [cartData, setCartData] = useState([]);
  const [addressData, setAddressData] = useState([]);
  const [coupon, setCoupon] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(false);
  const [itemQuantity, setItemQuantity] = useState();
  const [paymentList, setPaymentList] = useState([]);
  const [paymentName, setPaymentName] = useState();
  const [paymentId, setPaymentId] = useState('');
  const [totalValue, setTotalValue] = useState(false);
  const [addressLoading, setAddressLoading] = useState(true);
  const [paymentConstantName, setPaymentConstantName] = useState();
  const [VerrifyPaymentMessage, setVerrifyPaymentMessage] = useState('Success');
  const [couponCode, setCouponCode] = useState('');
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [invoiceId, setInvoiceId] = useState(0);
  const [secretKey, setSecretKey] = useState();
  const [visible, setVisible] = useState(false);
  const [editVarient, setEditVarient] = useState(false);
  const [otpScreen, setOtpScreen] = useState(false);
  const [addPromoText, setAddPromoText] = useState();
  const [otp, setOtp] = useState();
  const [productDetail, setProductDetail] = useState();
  const [walletPrice, setWalletPrice] = useState(0);
  const [razorPayId, setRazorPayId] = useState();
  const [error, setError] = useState();
  const [otpError, setOtpError] = useState();

  const [Sku, setSku] = useState();

  console.log('itemQuantity', itemQuantity);

  const user = useSelector(state => state.loginReducer.user);
  const secondaryKey = user?.cardId;

  const route = useRoute();

  useEffect(() => {
    if (route.params?.to == 'address123') {
      setShippingMethod(true);
      bottomSheetModalRef.current?.present();
      getAddress();
    }
  }, [route.params]);

  const addAddress = () => {
    // navigation.navigate(RouteName.ADD_ADDRESS);
    navigation.navigate(RouteName.ADD_ADDRESS);
    bottomSheetModalRef.current?.close();
  };

  console.log('sku1234', Sku);

  console.log('user', user.idToken);

  const getAddress = async () => {
    const url = fetchAddress();
    setAddressLoading(true);
    console.log('getAddress', url);
    try {
      const response = await AxiosInstance.get(url);
      console.log('getAdress response', response.data);
      if (response.data.status) {
        setAddressData(response.data?.object);
      }
      setAddressLoading(false);
    } catch (err) {
      console.log('@ HomePageCategoryListing error', err);
      setAddressLoading(false);
    }
  };

  const getPaymentMethod = async () => {
    setAddressLoading(true);
    const url = GetPayment();
    console.log('getAddress', url);
    try {
      const response = await AxiosInstance.get(url);
      console.log('getPaymentMethod response', response.data);
      if (response.data.status) {
        setPaymentList(response.data.object);
        console.log('paymentList', paymentList);
        const findRazorPay = response.data.object?.find(
          elm => elm?.constantName == 'RAZORPAY',
        );
        if (findRazorPay) {
          setSecretKey(findRazorPay?.secretKey);
        }
      }
      setAddressLoading(false);
    } catch (err) {
      console.log('@ HomePageCategoryListing error', err);
      setAddressLoading(false);
    }
  };

  const AddCart = async (isAdding, skuCode) => {
    const url = AddToCart();

    try {
      const body = {
        skuCode: skuCode,
        isAdding: isAdding,
        orderSource: 'APP',
        secondaryKey: user.cardId,
        quantity: Math.abs(defaultValue - itemQuantity),
        browser: '',
        deviceType: 'mobile',
        os: 'android',
      };

      const response = await axios.post(url, body);
      console.log('ADD CART response', body);
      console.log('response.data', response.data);
      if (response.data.status) {
        bottomSheetOptionModalRef.current.close();

        CartProduct();
      }
      if (response.data.message == 'Max quantity exceeds') {
        ToastAndroid.show(response.data.message, 200);
      }
    } catch (err) {
      console.log('@ HomePageCategoryListing error', err);
    }
  };

  const Replacevarient = async skuCode => {
    const url = editVarientInCart();

    try {
      const body = {
        skuCode: Sku,
        replacedSkuCode: skuCode,
        secondaryKey: secondaryKey,
      };

      console.log('ADD CART response', url, body);
      const response = await axios.patch(url, body);
      console.log('response.data', response.data);
      if (response.data.status) {
        console.log('Replacevarient', response.data.object);
        CartProduct();
        bottomSheetOptionModalRef.current?.close();
      }
      if (response.data.message == 'Max quantity exceeds') {
        ToastAndroid.show(response.data.message, 200);
      }
    } catch (err) {
      console.log('@ HomePageCategoryListing error', err);
    }
  };

  const setCardAddress = async (shipTo, billTo) => {
    const url = setAddress(shipTo, billTo);
    console.log('getAddress', url);
    try {
      const response = await AxiosInstance.post(url);
      console.log('setCardAddress response', response.data);
      if (response.data.status) {
        console.log(response.data?.object);
        CartProduct(
          couponCode,
          paymentId,
          response.data?.object?.deliveryCharges,
        );
        setDeliveryCharges(response.data?.object?.deliveryCharges);
      }
    } catch (err) {
      console.log('@ setCardAddress error', err);
    }
  };

  console.log('secondaryKey', secondaryKey, Sku);

  const getCoupon = async () => {
    setAddressLoading(true);
    console.log('abcd');
    const url = couponList();
    console.log('getCoupon', url);
    try {
      const response = await AxiosInstance.get(url);
      console.log('setCardAddress response', response.data);
      if (response.data.status) {
        setCoupon(response.data?.object);
      }
      setAddressLoading(false);
    } catch (err) {
      console.log('@ setCardAddress error', err);
      setAddressLoading(false);
    }
  };

  console.log('paymentConstantName', paymentConstantName);

  const verifyPaymentMode = async paymentServiceId => {
    if (paymentConstantName == 'COD') {
      setVisible(true);
    }
    const url = verifyPayment(paymentServiceId);

    try {
      const response = await AxiosInstance.get(url);
      console.log('setCardAddress response', response.data);
      if (response.data.status) {
        console.log('verifyPaymentMode', response.data);
        if (paymentConstantName == 'WALLET') {
          console.log('testing');
          setVisible(false);
          getwalletOtp();
        } else {
          InitiatePaymentApi(paymentConstantName);
        }
      } else {
        CartProduct();
        console.log('verifyPaymentMode', response.data);
        setVerrifyPaymentMessage(response.data.message);
        setVisible(false);
      }
    } catch (err) {
      console.log('@ verifyPaymentMode1', err);
    }
  };

  const InitiatePaymentApi = async (paymentSource, walletAmt) => {
    console.log('testing1234');
    const url = InitiatePayment(paymentSource);
    console.log('walletPrice23defr', cartData?.netPayable, walletAmt);

    try {
      const response = await AxiosInstance.put(url);
      console.log('InitiatePaymentApi response123', response.data);
      if (response.data.status) {
        console.log('InitiatePaymentApi', response.data);
        if (paymentConstantName == 'RAZORPAY') {
          payWithRazorpay(response.data.object);
          setInvoiceId(response.data.object);
        } else if (paymentConstantName == 'WALLET') {
          if (cartData?.netPayable > walletAmt) {
            console.log('inlopp');
            payWithRazorpay(response.data.object, walletAmt);
            setInvoiceId(response.data.object);
          } else {
            console.log('outlopp');
            setVisible(true);
            setInvoiceId(response.data.object);
            CheckoutApi('', response.data.object);
          }
        } else {
          setInvoiceId(response.data.object);

          CheckoutApi('', response.data.object);
        }
      } else {
        console.log('InitiatePaymentApi', response.data);
      }
    } catch (err) {
      console.log('@ InitiatePaymentApi', err);
    }
  };

  const getwalletOtp = async () => {
    const url = walletSendOtp(cartData?.netPayable);

    try {
      const response = await AxiosInstance.get(url);
      console.log('getwalletOtp response', response.data);
      setOtpScreen(true);
    } catch (err) {
      console.log('@ getwalletOtp', err);
    }
  };

  const walletOtp = async otp => {
    const url = walletVerifyOtp(otp);

    try {
      const response = await AxiosInstance.get(url);
      console.log('walletOtp response', response.data);

      if (response.data.status) {
        // cartData?.netPayable >
        setWalletPrice(response.data.object);

        InitiatePaymentApi('WALLET', response.data.object);
      }
    } catch (err) {
      console.log('@ walletOtp', err);
    }
  };

  console.log('invoiceId', invoiceId);

  const CheckoutApi = async (transactionId, orderId) => {
    const url = Checkoutcart();
    console.log(url);
    try {
      const body = {
        storeUuid: 'c79999bf-c4ae-11ee-abf7-02feba6da81d',
        transactionId: transactionId,
        paymentMode: paymentConstantName,
        paymentSource: paymentConstantName,
        orderType: 'ORDER',
        giftCartCode: '',
      };
      console.log('CheckoutApibeforresponse', url, body);
      const response = await AxiosInstance.patch(url, body);
      console.log('CheckoutApi response', response.data);
      if (response.data.status) {
        bottomSheetModalRef.current?.close();
        navigation.navigate(RouteName.SUCCESS_SCREEN, {
          invoiceId: orderId ?? invoiceId,
        });
      }
      setVisible(false);
    } catch (err) {
      console.log('@ CheckoutApi error', err);
      setVisible(false);
    }
  };

  const RemoveCart = async skuCode => {
    console.log('abcd');
    const url = RemovefromCart(secondaryKey, skuCode);
    console.log('getCoupon', url);
    try {
      const response = await AxiosInstance.delete(url);
      console.log('setCardAddress response', response.data);
      if (response.data.status) {
        CartProduct();
        bottomSheetOptionModalRef.current?.close();
      }
    } catch (err) {
      console.log('@ setCardAddress error', err);
    }
  };

  console.log('addressData', addressData);

  const AddWishlistItem = async skuCode => {
    const url = moveCart();
    console.log(url, skuCode);
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
        CartProduct();
        bottomSheetOptionModalRef.current?.close();
      }
    } catch (err) {
      console.log('@ AddWishlistItem error', err);
    }
  };

  const openModal = () => {
    if (!user.isLogin) {
      navigation.navigate(RouteName.LOGIN_SCREEN, {from: 'register'});
    } else {
      setShippingMethod(false);
      setPaymentMethod(false);
      setPromoCode(false);
      setTotalValue(false);
      setOtpScreen(false);
      setVerrifyPaymentMessage('Success');
      bottomSheetModalRef.current?.present();
    }
  };

  const openOptionModal = () => {
    bottomSheetOptionModalRef.current?.present();
  };

  const dispatch = useDispatch();

  const handleContentSizeChange = (width, height) => {
    setContentHeight(height);
  };

  const listItem = ({item}) => {
    return (
      <View
        style={{
          height: 40,
          aspectRatio: 1,
          backgroundColor: Apptheme.color.containerBackground,
        }}>
        <Image
          style={{height: '100%', width: '100%'}}
          source={{
            uri: item?.mediaUrl,
          }}
        />
      </View>
    );
  };

  const vareintMatrix = ({item}) => {
    console.log(item, 'vareintMatrix', Sku);
    return (
      <TouchableOpacity
        onPress={() => Replacevarient(item?.skuCode)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={[FontStyle.label]}>
          {item?.variantValues[0]?.variantType}-
          {item?.variantValues[0]?.variantValue} ,{' '}
          {item?.variantValues[1]?.variantType}-
          {item?.variantValues[1]?.variantValue}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[FontStyle.label]}>
            ₹ {item?.sellingPrice.toFixed(2)}
          </Text>
          <Gap row m5 />
          <View
            style={{
              height: 18,
              aspectRatio: 1,
              borderWidth: 1,
              borderRadius: 360,
              borderColor: Apptheme.color.black,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {item?.skuCode == Sku ? (
              <View
                style={{
                  height: 12,
                  aspectRatio: 1,
                  borderRadius: 360,
                  backgroundColor: Apptheme.color.black,
                }}
              />
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const isFocus = useIsFocused();

  const BackDrop = useCallback(
    props => (
      <BottomSheetBackdrop {...props} opacity={1} disappearsOnIndex={-1} />
    ),
    [],
  );
  useEffect(() => {
    CartProduct();
    setVerrifyPaymentMessage('Success');
    setPaymentName();
    setCouponCode('');
  }, [isFocus]);

  const productDetails = async productId => {
    const url = ProductDetailApi(productId);
    console.log('url1234', url);
    try {
      const response = await AxiosInstance.get(url);
      console.log(
        'productDetail response',

        response.data.object.productListings.length,
      );
      if (response.data.status) {
        setProductDetail(response.data?.object);
      }
    } catch (err) {
      console.log('@ productDetails error', err);
    }
  };

  console.log('secondaryKey', secondaryKey);

  const CartProduct = async (couponCode, paymentServiceId, deliveryCharges) => {
    setLoading(true);
    const url = GetCard(
      secondaryKey,
      couponCode,
      paymentServiceId,
      deliveryCharges,
    );
    console.log(url);
    try {
      const response = await (!user.isLogin ? axios : AxiosInstance).get(url);
      console.log('CartProduct response', response.data);
      if (response.data.status) {
        setLoading(false);

        if (response.data?.object == null) {
          dispatch(cardId(''));
          setCartData(null);
        }
        if (response.data?.object.couponCodeStatus) {
          setCartData(response.data?.object);
          setPromoCode(false);
        } else {
          setCartData({...response.data?.object, couponCode: null});

          setError(response.data?.object.couponCodeMessage);
        }
      }
    } catch (err) {
      console.log('@ HomePageCategoryListing error', err);

      setLoading(false);
    }
  };
  console.log('cartData12345', cartData);

  const shippingItem = ({item}) => {
    const editAddress = () => {
      bottomSheetModalRef.current?.close();
      navigation.navigate(RouteName.ADD_ADDRESS, {
        data: item,
        from: 'ShoppingBag',
      });
    };

    console.log('adressdata', item);
    return (
      <TouchableOpacity
        onPress={() => {
          setCardAddress(item.id, item.id);
          setShippingMethod(false);
        }}
        style={{flexDirection: 'row'}}>
        <View>
          <Image
            source={Images.pngImages.deliveryTruck}
            style={{height: 20, aspectRatio: 1}}
            resizeMode="contain"
          />
        </View>
        <Gap row m6 />
        <View style={{flex: 1}}>
          <Text style={[FontStyle.headingSmall]}>DELIVERY</Text>
          <Gap m1 />
          <Text style={[FontStyle.label]}>{item?.customerName}</Text>
          {/* <Gap m1 /> */}
          <Text style={[FontStyle.label]}>
            {item?.addressLine1} , {item?.city}
          </Text>
        </View>
        <TouchableOpacity
          onPress={editAddress}
          style={{justifyContent: 'center'}}>
          <VectorIcon material-community-icon name="pencil" size={22} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const couponListItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          CartProduct(item.couponCode, paymentId, deliveryCharges);
          setPromoCode(false);
          setCouponCode(item.couponCode);
        }}>
        <Text style={[FontStyle.headingSmall]}>{item.couponCode}</Text>
        <Gap m1 />
        <Text style={[FontStyle.label]}>
          {item.couponType == 'Fixed' ? `₹ ${item.value}` : `${item.value} %`}
        </Text>
        {/* <Gap m1 /> */}
        <Text style={[FontStyle.label]}>
          Expires: {moment(item.expiryDate).format('DD-MMMM-YYYY')}
        </Text>
      </TouchableOpacity>
    );
  };
  const [data, setData] = useState([
    {
      label: 'Edit Quantity',
      id: 1,
      icon: Images.pngImages.addbag,
    },
    {
      label: 'Move to wishlist',
      id: 2,
      icon: Images.pngImages.heart,
    },
    {
      label: 'Remove from bag',
      id: 3,
      icon: Images.pngImages.bin,
    },
    {
      label: 'Edit Variant',
      id: 4,
      icon: Images.pngImages.size,
    },
  ]);

  console.log(secondaryKey, 'productDetail?.productListings');
  const renderItem = ({item}) => {
    if (item?.id == 4 && productDetail?.productListings?.length < 2) {
      return null;
    }
    return (
      <TouchableOpacity
        onPress={() => {
          if (item.id == 2) {
            if (!user.isLogin) {
              bottomSheetOptionModalRef.current.close();
              navigation.navigate(RouteName.LOGIN_SCREEN, {from: 'register'});
            } else {
              AddWishlistItem(Sku);
            }
          }
          if (item.id == 3) {
            RemoveCart(Sku);
          }
          if (item.id == 1) {
            setQuantity(true);
          }
          if (item.id == 4) {
            // productDetails();
            setEditVarient(true);
          }
        }}
        style={{
          height: Apptheme.spacing.headerHeight,

          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderColor: Apptheme.color.containerBackground,
        }}>
        <Image
          source={item?.icon}
          style={{height: 18, width: 18, resizeMode: 'contain'}}
          tintColor={Apptheme.color.black}
        />
        <Gap row m5 />
        <Text style={[FontStyle.titleSmall]}>{item?.label}</Text>
      </TouchableOpacity>
    );
  };

  console.log('paymentId', paymentId);

  const paymentItem = ({item}) => {
    const onPress = () => {
      setPaymentId(item.id);
      setPaymentName(item.displayName);
      setPaymentMethod(false);
      // setSecretKey(item?.secretKey);
      setPaymentConstantName(item?.constantName);
      CartProduct(couponCode, item?.id, deliveryCharges);
    };
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            height: 35,
            aspectRatio: 1.4,
          }}>
          <Image
            source={
              item?.constantName == 'COD'
                ? Images.pngImages.dollar
                : item?.constantName == 'PAYTM'
                ? Images.pngImages.paytm
                : item?.constantName == 'RAZORPAY'
                ? Images.pngImages.razorPay
                : Images.pngImages.wallet
            }
            style={{height: '100%', width: '100%'}}
            resizeMode="contain"
          />
        </View>
        <Gap row m5 />
        <View style={{justifyContent: 'center', width: '80%'}}>
          <Text style={[FontStyle.headingSmall]}>{item?.displayName}</Text>
          <Gap m1 />
          <Text style={[FontStyle.label, {color: Apptheme.color.subText}]}>
            {item?.instructions}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const productAmtlist = ({item}) => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 20,
          }}>
          <Text style={[FontStyle.label, {width: '60%'}]}>{item.name}</Text>
          <Text style={[FontStyle.headingSmall]}> ₹ {item.sellingPrice}</Text>
        </View>
        {/* <Divider /> */}
      </>
    );
  };

  const AddressEmptyComponent = () => {
    return (
      <>
        {addressLoading ? (
          <View>
            <PaginationLoader />
          </View>
        ) : null}
      </>
    );
  };

  const payWithRazorpay = async (orderId, walletAmt) => {
    console.log(
      'cartData?.netPayable - walletPrice',
      cartData?.netPayable,
      walletAmt,
    );
    const amount = () => {
      if (paymentConstantName == 'WALLET' && cartData?.netPayable > walletAmt) {
        return (cartData?.netPayable - walletAmt) * 100;
      } else {
        return cartData?.netPayable * 100;
      }
    };

    try {
      console.log('razerpay orderid', orderId, amount());
      const config = {
        description:
          paymentConstantName == 'WALLET' ? 'wallet TOP UP' : 'order',
        image:
          'https://1pyq-assets.s3.ap-south-1.amazonaws.com/logo/ic_launcher-playstore.png',
        currency: 'INR',
        key: secretKey,
        amount: amount(),
        name: 'WEKRETA',
        notes: {
          orderId: orderId,
          type: paymentConstantName == 'WALLET' ? 'partial' : 'order',
          orderFrom: 'Krenai : ',
        },
        prefill: {
          email: '',
          contact: '',
          name: 'Ankush',
        },
        theme: {color: Apptheme.color.containerBackground},
      };
      console.log('Razerpay config', config);
      const response = await RazorpayCheckout.open(config);
      console.log('payment success', response);
      if (paymentConstantName == 'WALLET' && cartData?.netPayable > walletAmt) {
        setRazorPayId(response?.razorpay_payment_id);
        setVisible(true);

        CheckoutWalletApi(response?.razorpay_payment_id, walletAmt);
      } else {
        setRazorPayId(response?.razorpay_payment_id);
        setVisible(true);
        verifyPaymentdata();
      }
    } catch (error) {
      console.log('razorpay error', error);
    }
  };

  const CheckoutWalletApi = async (transactionId, walletAmt) => {
    const url = WalletCheckout();
    console.log(url);
    try {
      const body = {
        remark: 'Top Up',
        amount: 0,
        isCredited: 0,
        balancePoint: 0,
        createdDate: '',
        accountingEntryType: 'CREDIT',
        userRequestAmount: cartData?.netPayable - walletAmt,
        transBy: 'Customer',
        paidVia: 'RAZORPAY',
        transactionId: transactionId,
      };
      console.log(
        'CheckoutWalletApi response',
        cartData?.netPayable,
        walletPrice,
        url,
        body,
      );
      const response = await AxiosInstance.post(url, body);
      if (response.data.status) {
        console.log('CheckoutApi response', response.data);

        CheckoutApi(transactionId);
      }
      // verifyPaymentdata();
    } catch (err) {
      console.log('@ CheckoutApi error', err);
    }
  };

  const verifyPaymentdata = async () => {
    const url = verifyPayment(paymentId);

    try {
      const response = await AxiosInstance.get(url);
      console.log('setCardAddress response', response.data);
      if (response.data.status) {
        CheckoutApi(razorPayId);
      } else {
      }
    } catch (err) {
      console.log('@ verifyPaymentMode', err);
    }
  };

  const [defaultValue, setDefaultValue] = useState();
  const defaultQuantity = id => {
    setDefaultValue(id);
  };

  console.log('defaultQuantity', cartData);

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor="#fff" />
      <Header label={'SHOPPING BAG'} onPress={''} />
      <Divider />
      <View style={styles.container}>
        {cartData?.cartProducts?.length == 0 || cartData == null ? null : (
          <View style={styles.shoppingBagItemsContainer}>
            <Text style={[FontStyle.label]}>
              {cartData?.cartProducts?.length} ITEMS
            </Text>
          </View>
        )}
        {/* <View style={styles.bannerContainer}>
          <Image
            source={Images.pngImages.banner}
            style={{height: '100%', width: '101%'}}
            // resizeMode="contain"
          />
        </View> */}

        <View style={styles.listContainer}>
          <ShoppingBagItems
            refereshCart={CartProduct}
            data={cartData?.cartProducts}
            openOptionModal={openOptionModal}
            setSKU={setSku}
            loading={loading}
            setItemQuantity={setItemQuantity}
            setQuantity={setQuantity}
            // setProductId={setProductId}
            defaultQuantity={defaultQuantity}
            setEditVarient={setEditVarient}
            productDetails={productDetails}
          />
        </View>
        {cartData?.cartProducts?.length == 0 ||
        cartData == null ||
        cartData == [] ? null : (
          <View style={styles.totalContainer}>
            <Divider />
            <View style={styles.innerTotalContainer}>
              <View style={styles.totalAmtContainer}>
                <Text style={[FontStyle.labelMedium]}>
                  TOTAL{' '}
                  <Text style={[FontStyle.label]}>(incl. of all taxes )</Text>
                </Text>
                <Text style={[FontStyle.labelMedium]}>
                  ₹ {cartData?.netPayable?.toFixed(2)}
                </Text>
              </View>
              <Gap m5 />
              <AddButton
                label={'CHECKOUT'}
                onPress={openModal}
                image={Images.pngImages.longArrowNext}
              />
            </View>
          </View>
        )}
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
        <BottomSheetView onContentSizeChange={handleContentSizeChange}>
          {otpScreen ? (
            <View>
              <View
                style={{paddingHorizontal: Apptheme.spacing.innerContainer}}>
                <View
                  style={{
                    height: Apptheme.spacing.headerHeight,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity onPress={() => setOtpScreen(false)}>
                    <VectorIcon
                      material-icon
                      name="keyboard-backspace"
                      size={22}
                    />
                  </TouchableOpacity>
                  <Gap row m4 />
                  <Text style={[FontStyle.labelMedium]}>OTP VERIFICATION</Text>
                </View>
                <Gap m5 />
                <Text style={[FontStyle.headingSmall]}>
                  Wallet payment verification OTP
                </Text>
                <Gap m7 />

                <OTPTextView
                  // ref={input}

                  containerStyle={styles.textInputContainer}
                  handleTextChange={setOtp}
                  // handleCellTextChange={handleCellTextChange}
                  inputCount={6}
                  keyboardType="numeric"
                  autoFocus={true}
                  tintColor={Apptheme.color.black}
                />
                <Gap m9 />
                {/* <Text>{}</Text> */}
                <Gap m9 />
                <View>
                  <AddButton
                    onPress={() => walletOtp(otp)}
                    label={'VERIFY AND PLACE ORDER'}
                    image={Images.pngImages.longArrowNext}
                  />
                </View>
                <Gap m5 />
              </View>
            </View>
          ) : shippingmethod ? (
            <View style={{paddingHorizontal: Apptheme.spacing.innerContainer}}>
              <View
                style={{
                  height: Apptheme.spacing.headerHeight,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => setShippingMethod(false)}>
                  <VectorIcon
                    material-icon
                    name="keyboard-backspace"
                    size={22}
                  />
                </TouchableOpacity>
                <Gap row m4 />
                <Text style={[FontStyle.labelMedium]}>SHIPPING</Text>
              </View>
              <Gap m5 />
              <FlatList
                data={addressData}
                renderItem={shippingItem}
                ListEmptyComponent={AddressEmptyComponent}
                ItemSeparatorComponent={
                  <>
                    <Gap m4 />
                    <Divider />
                    <Gap m4 />
                  </>
                }
              />

              <Gap m5 />
              <Gap m5 />
              <View>
                <AddButton
                  onPress={addAddress}
                  label={'ADD NEW ADDRESS'}
                  image={Images.pngImages.longArrowNext}
                />
              </View>
              <Gap m5 />
            </View>
          ) : promoCode ? (
            <View style={{paddingHorizontal: Apptheme.spacing.innerContainer}}>
              <View
                style={{
                  height: Apptheme.spacing.headerHeight,
                  flexDirection: 'row',

                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    addPromeCode ? setADDPromoCode(false) : setPromoCode(false)
                  }>
                  <VectorIcon
                    material-icon
                    name="keyboard-backspace"
                    size={22}
                  />
                </TouchableOpacity>

                <Gap row m4 />
                <Text style={[FontStyle.labelMedium]}>PROMO CODE</Text>
              </View>
              <Gap m4 />
              {addPromeCode ? (
                <View>
                  <BottomSheetTextInput
                    style={{
                      backgroundColor: Apptheme.color.containerBackground,
                      color: Apptheme.color.text,
                      paddingHorizontal: 15,
                    }}
                    onChangeText={e => setCouponCode(e)}
                    value={addPromoText}
                    placeholder="Enter your promo code"
                    cursorColor={Apptheme.color.black}
                    placeholderTextColor={Apptheme.color.text}
                  />
                  <Text style={[FontStyle.label, {color: Apptheme.color.red}]}>
                    {error}
                  </Text>
                  <Gap m5 />
                  <Text style={[FontStyle.label, {fontSize: 11}]}>
                    Some items may be excluded from some promo codes. Check the
                    promo Terms & Conditions{' '}
                  </Text>
                </View>
              ) : (
                <FlatList
                  data={coupon}
                  renderItem={couponListItem}
                  ListEmptyComponent={
                    <View>
                      {addressLoading ? (
                        <View>
                          <PaginationLoader />
                        </View>
                      ) : (
                        <Text style={[FontStyle.title]}>
                          NO PROMO CODE AVAILABLE
                        </Text>
                      )}
                    </View>
                  }
                  ItemSeparatorComponent={
                    <>
                      <Gap m4 />
                      <Divider />
                      <Gap m4 />
                    </>
                  }
                />
              )}
              <Gap m5 />
              <Gap m5 />
              <View>
                <AddButton
                  onPress={() =>
                    addPromeCode
                      ? CartProduct(couponCode, paymentId, deliveryCharges)
                      : setADDPromoCode(true)
                  }
                  label={'ADD PROMO CODE'}
                  image={Images.pngImages.longArrowNext}
                />
              </View>
              <Gap m5 />
            </View>
          ) : paymentMethod ? (
            <View style={{paddingHorizontal: Apptheme.spacing.innerContainer}}>
              <View
                style={{
                  height: Apptheme.spacing.headerHeight,
                  flexDirection: 'row',

                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => setPaymentMethod(false)}>
                  <VectorIcon
                    material-icon
                    name="keyboard-backspace"
                    size={22}
                  />
                </TouchableOpacity>
                <Gap row m4 />
                <Text style={[FontStyle.labelMedium]}>PAYMENT METHOD</Text>
              </View>
              <Gap m4 />
              <FlatList
                data={paymentList}
                renderItem={paymentItem}
                ListEmptyComponent={
                  <View>
                    {addressLoading ? (
                      <View>
                        <PaginationLoader />
                      </View>
                    ) : null}
                  </View>
                }
                ItemSeparatorComponent={
                  <>
                    <Gap m4 />
                    <Divider />
                    <Gap m4 />
                  </>
                }
              />
              <Gap m5 />

              <Gap m5 />
            </View>
          ) : totalValue ? (
            <View style={{paddingHorizontal: Apptheme.spacing.innerContainer}}>
              <View
                style={{
                  height: Apptheme.spacing.headerHeight,
                  flexDirection: 'row',

                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => setTotalValue(false)}>
                  <VectorIcon
                    material-icon
                    name="keyboard-backspace"
                    size={22}
                  />
                </TouchableOpacity>
                <Gap row m4 />
                <Text style={[FontStyle.labelMedium]}>TOTAL</Text>
              </View>
              <Gap m4 />
              <FlatList
                data={cartData?.cartProducts}
                renderItem={productAmtlist}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: 14,
                }}>
                <Text style={[FontStyle.label, {width: '60%'}]}>Shipping</Text>
                <Text style={[FontStyle.headingSmall]}>
                  {cartData?.deliveryCharges == 0
                    ? 'FREE'
                    : cartData?.deliveryCharges}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: 14,
                }}>
                <Text style={[FontStyle.label, {width: '60%'}]}>TAX</Text>
                <Text style={[FontStyle.headingSmall]}>
                  {cartData?.tax == 0 ? '-' : cartData?.tax}
                </Text>
              </View>
              {cartData?.paymentServiceExtraChargesType == null ? null : (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 14,
                  }}>
                  <Text style={[FontStyle.label, {width: '60%'}]}>
                    {paymentName} {cartData?.paymentServiceExtraChargesType}
                  </Text>
                  <Text style={[FontStyle.headingSmall]}>
                    ₹ {cartData?.paymentServiceExtraCharges}
                  </Text>
                </View>
              )}

              <Gap m4 />
              <Divider backgroundColor={Apptheme.color.black} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: 14,
                }}>
                <Text style={[FontStyle.headingSmall, {width: '60%'}]}>
                  TOTAL
                </Text>
                <Text style={[FontStyle.headingSmall]}>
                  {cartData?.netPayable}
                </Text>
              </View>

              <Gap m5 />

              <Gap m5 />
            </View>
          ) : (
            <View style={{padding: Apptheme.spacing.innerContainer}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={[FontStyle.label]}>CHECKOUT</Text>
                <TouchableOpacity
                  onPress={() => bottomSheetModalRef.current?.close()}>
                  <VectorIcon
                    material-community-icon
                    name="window-close"
                    size={24}
                  />
                </TouchableOpacity>
              </View>
              <Gap m3 />
              <FlatList
                data={cartData?.cartProducts}
                horizontal
                ItemSeparatorComponent={<Gap row ms />}
                renderItem={listItem}
              />
              <Gap m7 />
              <Divider />
              <TouchableOpacity
                onPress={() => {
                  setShippingMethod(true);
                  getAddress();
                }}
                style={{
                  height: 46,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={[FontStyle.label, {color: Apptheme.color.subText}]}>
                  SHIPPING
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={[
                      FontStyle.label,
                      {
                        color: cartData?.shippingAddress
                          ? Apptheme.color.text
                          : Apptheme.color.blue,
                        fontSize: 13,
                      },
                    ]}>
                    {cartData?.shippingAddress
                      ? cartData?.shippingAddress.addressLine1
                      : ' Select shipping method'}
                  </Text>
                  <Gap row m4 />
                  <VectorIcon
                    material-icon
                    name="navigate-next"
                    size={24}
                    color={
                      cartData?.shippingAddress
                        ? Apptheme.color.text
                        : Apptheme.color.blue
                    }
                  />
                </View>
              </TouchableOpacity>
              <Divider />
              <TouchableOpacity
                onPress={() => {
                  setPromoCode(true);
                  getCoupon();
                  setADDPromoCode(false);
                }}
                style={{
                  height: 46,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={[FontStyle.label, {color: Apptheme.color.subText}]}>
                  PROMO CODE
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={[
                      FontStyle.label,
                      {
                        color: cartData?.couponCode
                          ? Apptheme.color.text
                          : Apptheme.color.blue,
                        fontSize: 13,
                      },
                    ]}>
                    {cartData?.couponCode
                      ? cartData?.couponCode
                      : 'Pick Discount'}
                  </Text>
                  <Gap row m4 />
                  <VectorIcon
                    material-icon
                    name="navigate-next"
                    size={24}
                    color={
                      cartData?.couponCode
                        ? Apptheme.color.text
                        : Apptheme.color.blue
                    }
                  />
                </View>
              </TouchableOpacity>
              <Divider />
              <TouchableOpacity
                onPress={() => {
                  setPaymentMethod(true);
                  getPaymentMethod();
                }}
                style={{
                  height: 46,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={[FontStyle.label, {color: Apptheme.color.subText}]}>
                  Payment method
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={[
                      FontStyle.label,
                      {
                        color: paymentName
                          ? Apptheme.color.text
                          : Apptheme.color.blue,
                        fontSize: 13,
                      },
                    ]}>
                    {paymentName ? paymentName : 'Payment method'}
                  </Text>
                  <Gap row m4 />
                  <VectorIcon
                    material-icon
                    name="navigate-next"
                    size={24}
                    color={
                      paymentName ? Apptheme.color.text : Apptheme.color.blue
                    }
                  />
                </View>
              </TouchableOpacity>

              <Divider />
              <TouchableOpacity
                onPress={() => setTotalValue(true)}
                style={{
                  height: 46,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={[FontStyle.label, {color: Apptheme.color.subText}]}>
                  TOTAL
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={[
                      FontStyle.label,
                      {color: Apptheme.color.text, fontSize: 13},
                    ]}>
                    ₹ {cartData?.netPayable}
                    <Text
                      style={[
                        FontStyle.label,
                        {
                          color: Apptheme.color.text,
                          fontSize: 13,
                          textDecorationLine: 'line-through',
                        },
                      ]}></Text>
                  </Text>
                  <Gap row m4 />
                  <VectorIcon
                    material-icon
                    name="navigate-next"
                    size={24}
                    color={Apptheme.color.text}
                  />
                </View>
              </TouchableOpacity>
              <Divider />
              <Gap m9 />

              <Text style={[FontStyle.label]}>
                By placing an order you agree to our
              </Text>
              <Gap m2 />
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={[
                    FontStyle.headingSmall,
                    {fontSize: 12, textDecorationLine: 'underline'},
                  ]}>
                  Terms and Conditions
                </Text>
                <Text style={[FontStyle.headingSmall, {fontSize: 12}]}>
                  {' '}
                  -{' '}
                </Text>
                <Text
                  style={[
                    FontStyle.headingSmall,
                    {fontSize: 12, textDecorationLine: 'underline'},
                  ]}>
                  Privacy Policy
                </Text>
              </View>
              <Gap m4 />
              {VerrifyPaymentMessage == 'Success' ? null : (
                <>
                  <Text style={[FontStyle.label, {color: Apptheme.color.red}]}>
                    {VerrifyPaymentMessage}
                  </Text>
                  <Gap m2 />
                </>
              )}
              <AddButton
                label={'PLACE ORDER'}
                backgroundColor={
                  paymentName && cartData?.shippingAddress
                    ? Apptheme.color.black
                    : '#BFBFBF'
                }
                image={Images.pngImages.longArrowNext}
                disabled={
                  paymentName && cartData?.shippingAddress ? false : true
                }
                onPress={() => verifyPaymentMode(paymentId)}
              />
            </View>
          )}
        </BottomSheetView>
      </BottomSheetModal>
      <BottomSheetModal
        ref={bottomSheetOptionModalRef}
        style={{backgroundColor: '#fff'}}
        index={0}
        backdropComponent={BackDrop} // Custom backdrop component
        enableDynamicSizing={true}
        onDismiss={() => bottomSheetOptionModalRef.current?.close()}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize">
        <BottomSheetView onContentSizeChange={handleContentSizeChange}>
          <View
            style={{
              backgroundColor: Apptheme.color.background,
              padding: Apptheme.spacing.innerContainer,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={[FontStyle.heading]}>
                {quantity ? 'QUANTITY' : editVarient ? 'VARIENT' : 'OPTIONS'}
              </Text>

              <TouchableOpacity
                onPress={() =>
                  quantity
                    ? setQuantity(false)
                    : editVarient
                    ? setEditVarient(false)
                    : bottomSheetOptionModalRef.current.close()
                }>
                <VectorIcon
                  material-community-icon
                  name="window-close"
                  size={22}
                />
              </TouchableOpacity>
            </View>
            <Text>OptionModal</Text>
            {/* <Gap m2 /> */}
            {quantity ? (
              <View style={{height: 70}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: 50,
                      width: 130,
                      borderRadius: 2,

                      borderWidth: 1,
                      borderColor: Apptheme.color.black,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingHorizontal: 15,
                    }}>
                    {/* <TouchableOpacity onPress={() => AddCart(0, Sku)}> */}
                    <TouchableOpacity
                      disabled={itemQuantity == 1 ? true : false}
                      onPress={() => setItemQuantity(itemQuantity - 1)}>
                      <VectorIcon
                        name="minus"
                        material-community-icon
                        size={20}
                        color={
                          itemQuantity == 1
                            ? Apptheme.color.subText
                            : Apptheme.color.black
                        }
                      />
                    </TouchableOpacity>
                    <Text style={[FontStyle.headingSmall, {fontSize: 16}]}>
                      {itemQuantity}
                    </Text>
                    {/* <TouchableOpacity onPress={() => AddCart(1, Sku)}> */}
                    <TouchableOpacity
                      onPress={() => setItemQuantity(itemQuantity + 1)}>
                      <VectorIcon
                        name="plus"
                        material-community-icon
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                  <Gap row m3 />
                  <TouchableOpacity
                    onPress={() => {
                      if (defaultValue == itemQuantity) {
                        bottomSheetOptionModalRef.current.close();
                      } else {
                        AddCart(defaultValue > itemQuantity ? 0 : 1, Sku);
                      }
                    }}
                    style={{
                      height: 50,
                      backgroundColor: Apptheme.color.black,
                      flex: 1,
                      borderRadius: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={[
                        FontStyle.headingSmall,
                        {color: Apptheme.color.background},
                      ]}>
                      ADD ITEM
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : editVarient ? (
              <View>
                <FlatList
                  data={productDetail?.productListings}
                  renderItem={vareintMatrix}
                  ItemSeparatorComponent={<Gap m7 />}
                />
              </View>
            ) : (
              <FlatList data={data} renderItem={renderItem} />
            )}
          </View>
        </BottomSheetView>
      </BottomSheetModal>
      <Modal visible={visible} animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: Apptheme.color.background,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LottieView
            source={require('../../assets/json/process.json')}
            autoPlay
            loop
            style={{height: 200, width: 200}}
          />
          <Text style={[FontStyle.heading]}>Processing your order</Text>
          <Gap m1 />
          <Text style={[FontStyle.label, {width: 300, textAlign: 'center'}]}>
            Please wait we are processing your payment. Do not close your App.
          </Text>
        </View>
      </Modal>
    </View>
  );
};

export default ShoppingBagScreen;

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  container: {flex: 1, backgroundColor: '#fff'},
  shoppingBagItemsContainer: {
    height: 46,
    paddingHorizontal: Apptheme.spacing.innerContainer,
    justifyContent: 'center',
  },
  bannerContainer: {height: 140},
  listContainer: {flex: 0.82},
  totalContainer: {flex: 0.18},
  innerTotalContainer: {
    padding: Apptheme.spacing.innerContainer,
    flex: 1,
    justifyContent: 'flex-end',
  },
  totalAmtContainer: {flexDirection: 'row', justifyContent: 'space-between'},
});
