/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Apptheme from '../../../../assets/theme/apptheme';
import ProductHeader from '../../../../components/atoms/ProductHeader';
import Divider from '../../../../components/atoms/Divider';
import Gap from '../../../../components/atoms/Gap';
import FontStyle from '../../../../assets/theme/FontStyle';
import AddButton from '../../../../components/atoms/AddButton';
import Images from '../../../../assets/images';
import VectorIcon from '../../../../assets/vectorIcon';
import InputField from '../../../../components/atoms/inputField';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  GetPayment,
  WalletCheckout,
  WalletPaymentInitiate,
} from '../../../../apiServices/apiHelper';
import AxiosInstance from '../../../../apiServices/AxiosInstance';
import RazorpayCheckout from 'react-native-razorpay';
import RouteName from '../../../../navigation/RouteName';
import {useSelector} from 'react-redux';

const TopUpScreen = () => {
  const [amt, setAmt] = useState(500);
  const [value, setValue] = useState(0);
  const [paymentList, setPaymentList] = useState([]);
  const [topUp, setTopUp] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(0);
  const [paymentName, setPaymentName] = useState();
  const [secretKey, setSecretKey] = useState();
  const route = useRoute();
  const walletAmt = route.params?.walletBalance;
  const user = useSelector(state => state.loginReducer.user);
  const navigation = useNavigation();

  console.log('user234', user);

  const data = [500, 1000, 2000, 'Other'];
  const Notedata = [
    `Wallet Credit can't be cancelled or transferred to another account.`,
    `It can't be withdrawn in the form of cash or transferred to any bank account.`,
    `It can't be used to purchase Gift Cards.`,
    `Net-banking and credit/debit cards issued in India can be used for Wallet Credit top up.`,
    `Credits have an expiry. Check FAQs for more details.`,
  ];

  const getPaymentMethod = async () => {
    const url = GetPayment();
    console.log('getAddress', url);
    try {
      const response = await AxiosInstance.get(url);
      console.log('getPaymentMethod response', response.data);
      if (response.data.status) {
        setPaymentList(response.data.object);
        setTopUp(true);
      }
    } catch (err) {
      console.log('@ HomePageCategoryListing error', err);
    }
  };

  const InitiatePaymentApi = async paymentSource => {
    const url = WalletPaymentInitiate();

    try {
      const body = {
        amount: value == 0 ? amt : value,
        customerName: '',
        senderName: '',
        customerEmail: '',
        customerPhone: '',
        paidVia: paymentName,
        requestType: 'Top Up',
        giftCardId: 0,
        paymentStatus: 'UNPAID',
      };
      const response = await AxiosInstance.post(url, body);
      console.log('setCardAddress response', response.data);
      if (response.data.status) {
        console.log('InitiatePaymentApi', response.data);

        payWithRazorpay(response.data.object);
      } else {
        console.log('InitiatePaymentApi', response.data);
      }
    } catch (err) {
      console.log('@ InitiatePaymentApi', err);
    }
  };

  const payWithRazorpay = async walletId => {
    try {
      const config = {
        description: `Wallet Topup`,
        image:
          'https://1pyq-assets.s3.ap-south-1.amazonaws.com/logo/ic_launcher-playstore.png',
        currency: 'INR',
        key: secretKey,
        amount: value == 0 ? amt * 100 : value * 100,
        name: 'WEKRETA',
        notes: {
          orderId: walletId,
          type: 'topUp',
          orderFrom: 'Krenai : ',
          purchasedBy: user?.phoneNumber,
        },
        prefill: {
          email: '',
          contact: '',
          name: '',
        },
        theme: {color: Apptheme.color.containerBackground},
      };
      const response = await RazorpayCheckout.open(config);
      console.log('payment success', response);
      CheckoutApi(response?.razorpay_payment_id, walletId);
    } catch (error) {
      console.log('razorpay error', error);
    }
  };

  const CheckoutApi = async (transactionId, walletId) => {
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
        userRequestAmount: value == 0 ? amt : value,
        transBy: 'Customer',
        paidVia: paymentName,
        transactionId: transactionId,
        paymentWebhookHelperId: walletId,
      };

      const response = await AxiosInstance.post(url, body);
      console.log('CheckoutApi response', response.data);
      if (response.data.status) {
        navigation.navigate(RouteName.WALLET_SCREEN);
      }
    } catch (err) {
      console.log('@ CheckoutApi error', err);
    }
  };

  console.log('paymentList', paymentList);

  const RenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setAmt(item);
          setValue(0);
        }}
        style={{
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderWidth: 1,
          backgroundColor: amt == item ? Apptheme.color.black : null,
          borderColor:
            amt == item ? Apptheme.color.black : Apptheme.color.boxOutline,
        }}>
        <Text
          style={[
            FontStyle.label,
            {
              color:
                amt == item ? Apptheme.color.background : Apptheme.color.text,
            },
          ]}>
          {index == 3 ? null : '₹ '}
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderNote = ({item}) => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
        <VectorIcon entypo name="dot-single" size={20} />
        <Gap row ms />
        <Text style={[FontStyle.label, {fontSize: 12, flex: 1, paddingTop: 2}]}>
          {item}
        </Text>
      </View>
    );
  };

  const paymentOption = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setPaymentMethod(item?.id);
          setPaymentName(item?.constantName);
          setSecretKey(item?.secretKey);
        }}
        style={{flexDirection: 'row'}}>
        <View style={{justifyContent: 'center'}}>
          <View
            style={{
              height: 18,
              aspectRatio: 1,
              borderRadius: 360,
              borderWidth: 1.5,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor:
                paymentMethod == item?.id
                  ? Apptheme?.color.black
                  : Apptheme.color.boxOutline,
            }}>
            {paymentMethod == item?.id ? (
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
        <Gap row m4 />
        <View style={{flex: 1}}>
          <Text style={[FontStyle.headingSmall]}>{item?.displayName}</Text>
          <Gap m1 />
          <Text style={[FontStyle.label, {flex: 1}]}>{item?.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const thirdPartyPaymentMethods = paymentList?.filter(
    item => item?.isThirdParty === 1,
  );

  return (
    <View style={styles.mainContainer}>
      <ProductHeader name={'TOP UP'} />
      <Divider />
      <View style={{padding: Apptheme.spacing.innerContainer}}>
        <Gap m4 />
        <View
          style={{
            paddingVertical: 25,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: Apptheme.color.boxOutline,
          }}>
          <Text style={[FontStyle.label]}>YOUR WALLET BALANCE</Text>
          <Gap m2 />
          <Text style={[FontStyle.heading]}>₹ {walletAmt}</Text>
        </View>
        <Gap m8 />
        <Text style={[FontStyle.labelMedium]}>Choose an amount*</Text>
        <Gap m4 />
        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <RenderItem item={item} index={index} />
          )}
          horizontal
          ItemSeparatorComponent={<Gap row m5 />}
        />
        {amt == 'Other' ? (
          <>
            <Gap m4 />
            <InputField
              label={'Enter an amt'}
              onChangeText={e => setValue(e)}
              type={'phone'}
              value={value}
            />
          </>
        ) : null}
        {/* <Gap m1 /> */}
      </View>

      {topUp ? (
        <View style={{padding: Apptheme.spacing.innerContainer}}>
          <Text style={[FontStyle.headingSmall]}>Select Payment Method</Text>
          <Gap m4 />
          <FlatList
            data={thirdPartyPaymentMethods}
            renderItem={paymentOption}
            ItemSeparatorComponent={
              <>
                <Gap m5 />
                <Divider />

                <Gap m5 />
              </>
            }
          />
          {paymentMethod == 0 ? null : (
            <>
              <Gap m8 />
              <AddButton
                label={'Proceed'}
                image={Images.pngImages.longArrowNext}
                onPress={() => InitiatePaymentApi()}
              />
            </>
          )}
        </View>
      ) : (
        <View style={{padding: Apptheme.spacing.innerContainer}}>
          <AddButton
            label={'TOP UP'}
            image={Images.pngImages.longArrowNext}
            onPress={() => getPaymentMethod()}
          />
        </View>
      )}

      <Gap m3 />
      <Divider />
      <Gap m3 />
      <View style={{padding: Apptheme.spacing.innerContainer}}>
        <Text style={[FontStyle.headingSmall]}>PLEASE NOTE</Text>
        <Gap m5 />
        <FlatList
          data={Notedata}
          renderItem={renderNote}
          ItemSeparatorComponent={<View style={{height: 2}} />}
        />
      </View>
    </View>
  );
};

export default TopUpScreen;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: Apptheme.color.background},
});
