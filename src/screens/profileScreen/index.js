/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/atoms/Header';
import Images from '../../assets/images';
import Apptheme from '../../assets/theme/apptheme';
import Divider from '../../components/atoms/Divider';
import FontStyle from '../../assets/theme/FontStyle';
import Gap from '../../components/atoms/Gap';
import RouteName from '../../navigation/RouteName';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../../redux/Reducer/login/LoginSlice';
import {GetCustomer} from '../../apiServices/apiHelper';
import AxiosInstance from '../../apiServices/AxiosInstance';

const ProfileSection = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.loginReducer.user);
  const isFocus = useIsFocused();
  const dispatch = useDispatch();
  const route = useRoute();

  const from = route.params?.from;

  const [customerData, setCustomerData] = useState();
  useEffect(() => {
    if (!user.isLogin) {
      navigation.navigate(RouteName.LOGIN_SCREEN, {from: 'register'});
    }
    GetCustomerDetail();
  }, [isFocus, from]);

  // useEffect(() => {
  //   GetCustomerDetail();
  // }, [from]);

  const data = [
    {
      title: 'ORDER HISTORY',
      subTitle: 'View all your orders, past and present',
      image: Images.pngImages.orderHistory,
      onPress: () => navigation.navigate(RouteName.ORDER_HISTORY),
    },
    {
      title: 'VOUCHER & GIFT CARDS',
      subTitle: 'Easily add, view or redeem',
      image: Images.pngImages.giftCard,
      onPress: () => navigation.navigate(RouteName.GIFT_CARD),
    },
    {
      title: 'MY ACCOUNT',
      subTitle: 'Manage your personal details and settings',
      image: Images.pngImages.myAccount,
      onPress: () =>
        navigation.navigate(RouteName.MY_ACCOUNT, {
          Data: customerData,
        }),
    },
    {
      title: 'ADDRESS BOOK',
      subTitle: 'Add or edit your shipping address',
      image: Images.pngImages.addressBook,
      onPress: () => navigation.navigate(RouteName.ADDRESS_BOOK),
    },
    {
      title: 'NEED HELP?',
      subTitle: 'Find FAQs or connect with our support team',
      image: Images.pngImages.faq,
      onPress: () => navigation.navigate(RouteName.NEED_HELP),
    },
    {
      title: 'WALLET',
      subTitle: 'Fast and Secure Wallet Transaction',
      image: Images.pngImages.profileWallet,
      onPress: () => navigation.navigate(RouteName.WALLET_SCREEN),
    },
  ];

  const GetCustomerDetail = async () => {
    const url = GetCustomer();

    console.log('getAddress', url);
    try {
      const response = await AxiosInstance.get(url);
      console.log('getAdress response', response.data);
      if (response.data.status) {
        setCustomerData(response.data?.object);
      }
    } catch (err) {
      console.log('@ HomePageCategoryListing error', err);
    }
  };

  console.log('customerData123', customerData);

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          height: 170,
          width: '50%',
          // backgroundColor: 'yellow',
          borderWidth: 1,
          borderLeftWidth: index % 2 == 0 ? 1 : 0,
          borderBottomWidth: 0,
          borderColor: Apptheme.color.containerBackground,
          paddingHorizontal: Apptheme.spacing.innerContainer,
          paddingVertical: 25,
        }}>
        <TouchableOpacity onPress={item?.onPress}>
          {item?.image ? (
            <Image
              source={item?.image}
              style={{height: 27, width: 35}}
              resizeMode="contain"
            />
          ) : (
            <View style={{height: 27, width: 27}} />
          )}
          <Gap m7 />
          <Text style={[FontStyle.headingSmall, {fontSize: 15, width: '90%'}]}>
            {item?.title}
          </Text>
          <Gap m1 />
          <Text style={[FontStyle.label, {fontSize: 11, width: '90%'}]}>
            {item?.subTitle}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="#fff" />
      <Header label={'PROFILE'} onPress={''} />
      <Divider />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#fff',
          padding: Apptheme.spacing.innerContainer,
        }}>
        {/* <View style={{height: 170, backgroundColor: 'yellow',border}}></View> */}
        <View
          style={{
            height: 100,
            borderWidth: 1,
            borderColor: Apptheme.color.containerBackground,
            padding: Apptheme.spacing.innerContainer,

            flexDirection: 'row',
          }}>
          <View
            style={{
              height: 60,
              aspectRatio: 1,
              borderRadius: 360,
              backgroundColor: 'yellow',
              overflow: 'hidden',
            }}>
            {/* <Image
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWRy9rvA4ybNUm7EUvEfeQi-PwUNWf7IRWag&s',
              }}
              style={{height: '100%', width: '100%'}}
            /> */}
            <Image
              source={Images.pngImages.user1}
              style={{height: '100%', width: '100%'}}
            />
          </View>
          <Gap row m6 />
          <View style={{paddingTop: 3}}>
            <Text style={[FontStyle.labelMedium]}>
              {customerData?.firstName ? customerData?.firstName : 'USER'}{' '}
              {customerData?.lastName ?? ''}
            </Text>

            <Gap m1 />
            <Text style={[FontStyle.label]}>
              {customerData?.email == '' || customerData?.email == null
                ? '--------'
                : customerData?.email}
            </Text>
            <Gap m1 />

            <Text style={[FontStyle.label]}>{customerData?.phone}</Text>
          </View>
        </View>

        <Gap m7 />
        <FlatList
          data={data}
          numColumns={2}
          renderItem={(item, index) => renderItem(item, index)}
        />
        <View
          style={{
            height: 1,
            backgroundColor: Apptheme.color.containerBackground,
          }}
        />
        {/* <View
          style={{
            height: 120,
            borderWidth: 1,
            borderColor: Apptheme.color.containerBackground,
            paddingHorizontal: Apptheme.spacing.innerContainer,
            paddingVertical: 25,
          }}>
          <Image
            source={Images.pngImages.faq}
            style={{height: 30, width: 40}}
            resizeMode="contain"
          />
          <Gap m4 />
          <Text style={[FontStyle.headingSmall, {fontSize: 15, width: '90%'}]}>
            NEED HELP?
          </Text>
          <Text style={[FontStyle.label, {fontSize: 11, width: '90%'}]}>
            Find FAQs or connect with our support team
          </Text>
        </View> */}
        <Gap m5 />
        <Gap m8 />
        <TouchableOpacity
          onPress={() => {
            dispatch(logoutUser());
            navigation.navigate(RouteName.LOGIN_SCREEN);
          }}
          style={{
            height: Apptheme.spacing.buttonHeight,
            borderWidth: 1,
            borderColor: Apptheme.color.black,
            paddingHorizontal: 14,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: 17,
          }}>
          <Text style={[FontStyle.labelMedium, {fontSize: 13}]}>LOG OUT</Text>
          <View>
            <Image
              source={Images.pngImages.logout}
              style={{height: 19, width: 20, resizeMode: 'contain'}}
              // tintColor={Apptheme.color.background}
            />
          </View>
        </TouchableOpacity>
        <Gap m8 />
        <Gap m8 />
        <Gap m8 />
      </ScrollView>
    </View>
  );
};

export default ProfileSection;

const styles = StyleSheet.create({});
