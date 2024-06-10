/* eslint-disable react/no-unstable-nested-components */
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Apptheme from '../../../../assets/theme/apptheme';
import ProductHeader from '../../../../components/atoms/ProductHeader';
import Divider from '../../../../components/atoms/Divider';
import Gap from '../../../../components/atoms/Gap';
import FontStyle from '../../../../assets/theme/FontStyle';
import Images from '../../../../assets/images';
import AddButton from '../../../../components/atoms/AddButton';
import VectorIcon from '../../../../assets/vectorIcon';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import RouteName from '../../../../navigation/RouteName';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import InputField from '../../../../components/atoms/inputField';
import AxiosInstance from '../../../../apiServices/AxiosInstance';
import {
  ReedemGiftCard,
  getMainWallet,
  getPromoWallet,
} from '../../../../apiServices/apiHelper';
import moment from 'moment';

const WalletScreen = () => {
  const navigation = useNavigation();
  const [mainWalletData, setMainWalletData] = useState();
  const [promoWalletData, setPromoWalletData] = useState();
  const [walletType, setWalletType] = useState('Main wallet');
  const [value, setValue] = useState();
  const [error, setError] = useState();

  const OnTopUp = () => {
    navigation.navigate(RouteName.TOPUP_SCREEN, {
      walletBalance: mainWalletData?.currentBalance,
    });
  };
  const bottomSheetModalRef = useRef(null);
  const walletModalRef = useRef(null);
  const BackDrop = useCallback(
    props => (
      <BottomSheetBackdrop {...props} opacity={1} disappearsOnIndex={-1} />
    ),
    [],
  );

  const isFocused = useIsFocused();
  useEffect(() => {
    getWallet();
    PromoWalletList();
  }, [isFocused]);

  const getWallet = async () => {
    const url = getMainWallet();

    console.log('getAddress', url);
    try {
      const response = await AxiosInstance.get(url);
      console.log('getWallet response', JSON.stringify(response.data));
      if (response.data.status) {
        setMainWalletData(response?.data?.object);
      }
    } catch (err) {
      console.log('@ HomePageCategoryListing error', err);
    }
  };

  const PromoWalletList = async () => {
    const url = getPromoWallet();

    console.log('getAddress', url);
    try {
      const response = await AxiosInstance.get(url);
      console.log(
        'PromoWalletList response',
        JSON.stringify(response.data?.object),
      );
      if (response.data.status) {
        setPromoWalletData(response?.data?.object);
      }
    } catch (err) {
      console.log('@ HomePageCategoryListing error', err);
    }
  };

  const GiftCardReedem = async value => {
    const url = ReedemGiftCard(value);

    console.log('getAddress', url);
    try {
      const response = await AxiosInstance.post(url);
      console.log(
        'GiftCardReedem response',
        JSON.stringify(response.data?.object),
      );
      if (response.data.status) {
        getWallet();
        bottomSheetModalRef.current?.close();
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.log('@ HomePageCategoryListing error', err);
    }
  };

  const walletData = ['Main wallet', 'Promo wallet'];

  const RenderItem = ({item, index}) => {
    return (
      <>
        <Gap m6 />
        <View>
          <TouchableOpacity style={styles.itemContainer}>
            <View>
              <Text style={[FontStyle.labelMedium, {fontSize: 13}]}>
                Remark:
                <Text style={[FontStyle.titleSmall, {fontSize: 13}]}>
                  {' '}
                  {item?.remark}
                </Text>
              </Text>
              <Gap ms />
              <Text style={[FontStyle.titleSmall, {fontSize: 13}]}>
                CartId: {item?.cartId}
              </Text>
              <Gap ms />

              <Text style={[FontStyle.titleSmall, {fontSize: 13}]}>
                Date:{' '}
                {moment(item?.transactionDate).format('MMM DD, YYYY h:mma')}
              </Text>
              <Gap ms />

              <Text style={[FontStyle.titleSmall, {fontSize: 13}]}>
                Points :{' '}
                <Text
                  style={[
                    FontStyle.titleSmall,
                    {
                      fontSize: 13,
                      color:
                        item?.amount > 0
                          ? Apptheme.color.green
                          : Apptheme.color.red,
                    },
                  ]}>
                  {item?.amount}
                </Text>
              </Text>
            </View>
          </TouchableOpacity>
          <Gap m6 />

          <Divider />
        </View>
      </>
    );
  };

  const walletRender = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setWalletType(item);
          walletModalRef.current?.close();
        }}
        style={{flexDirection: 'row', alignItems: 'center', height: 30}}>
        <View
          style={{
            height: 18,
            aspectRatio: 1,
            borderRadius: 360,
            borderWidth: 1.5,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor:
              walletType == item
                ? Apptheme?.color?.black
                : Apptheme.color.boxOutline,
          }}>
          {walletType == item ? (
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
        <Gap row m5 />
        <Text style={[FontStyle.labelMedium, {fontSize: 16}]}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <ProductHeader name={'WALLET'} />
      <Divider />
      <View
        style={{paddingHorizontal: Apptheme.spacing.innerContainer, flex: 1}}>
        <Gap m6 />
        <View style={styles.walletContainer}>
          <View>
            <Image
              source={Images.pngImages.mainWallet}
              style={{height: 22, width: 22}}
              tintColor={Apptheme.color.background}
            />
            <Gap m5 />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={[FontStyle.label, {color: Apptheme.color.background}]}>
                MAIN WALLET BALANCE
              </Text>
            </View>
          </View>

          <Gap m5 />
          <View style={{justifyContent: 'center'}}>
            <Text
              style={[
                FontStyle.headingLarge,
                {fontSize: 22, color: Apptheme.color.background},
              ]}>
              ₹ {mainWalletData?.currentBalance}
            </Text>
          </View>
        </View>
        <Gap m6 />
        <View style={styles.walletContainer}>
          <View>
            <Image
              source={Images.pngImages.promoWallet}
              style={{height: 22, width: 22}}
              tintColor={Apptheme.color.background}
            />
            <Gap m5 />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={[FontStyle.label, {color: Apptheme.color.background}]}>
                YOUR PROMO WALLET BALANCE
              </Text>
            </View>
          </View>

          <Gap m5 />
          <View style={{justifyContent: 'center'}}>
            <Text
              style={[
                FontStyle.headingLarge,
                {fontSize: 22, color: Apptheme.color.background},
              ]}>
              ₹ {mainWalletData?.currentPromoBalance}
            </Text>
          </View>
        </View>
        <Gap m7 />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.topContainer}>
            <TouchableOpacity onPress={OnTopUp}>
              <Image
                source={Images.pngImages.topUp}
                style={{height: 30, width: 30}}
              />

              <Gap m5 />
              <Text
                style={[FontStyle.headingSmall, {fontSize: 15, width: '90%'}]}>
                TOP UP
              </Text>
              <Gap m1 />
              <Text style={[FontStyle.label, {fontSize: 11, width: '90%'}]}>
                For a Quick checkout
              </Text>
              <Gap m2 />
              <Image
                source={Images.pngImages.longArrowNext}
                style={{height: 10, width: 30}}
              />
            </TouchableOpacity>
          </View>
          <Gap row m4 />
          <View style={styles.topContainer}>
            <TouchableOpacity
              onPress={() => bottomSheetModalRef.current?.present()}>
              <Image
                source={Images.pngImages.giftCart}
                style={{height: 30, width: 30}}
              />

              <Gap m5 />
              <Text
                style={[FontStyle.headingSmall, {fontSize: 15, width: '90%'}]}>
                ADD GIFT CARD
              </Text>
              <Gap m1 />
              <Text style={[FontStyle.label, {fontSize: 11, width: '90%'}]}>
                Have a gift card?
              </Text>
              <Gap m2 />
              <Image
                source={Images.pngImages.longArrowNext}
                style={{height: 10, width: 30}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Gap m7 />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[FontStyle.headingSmall]}>Transaction Log</Text>
          <View style={{flex: 1}} />
          <TouchableOpacity
            onPress={() => walletModalRef.current?.present()}
            style={{
              height: 30,
              borderWidth: 1,
              borderColor: Apptheme.color.boxOutline,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 5,
            }}>
            <Text style={[FontStyle.label]}>{walletType}</Text>
            <Gap row m3 />
            <VectorIcon material-icon name="keyboard-arrow-down" size={20} />
          </TouchableOpacity>
        </View>
        <Gap m5 />
        <View style={{flex: 1}}>
          <FlatList
            data={
              walletType == 'Main wallet'
                ? mainWalletData?.transactions
                : promoWalletData
            }
            renderItem={({item, index}) => (
              <RenderItem item={item} index={index} />
            )}
          />
        </View>
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
            <Text style={[FontStyle.heading]}>Reedem Gift Card</Text>
            <Gap m4 />
            <Text style={[FontStyle.label, {color: Apptheme.color.subText}]}>
              To redeem your gift card, simply enter the unique gift card code
              here
            </Text>
            <Gap m5 />

            <BottomSheetTextInput
              style={{
                backgroundColor: Apptheme.color.containerBackground,
                color: Apptheme.color.text,
                paddingHorizontal: 15,
              }}
              onChangeText={e => setValue(e)}
              value={value}
              placeholder="Enter your gift card here"
              cursorColor={Apptheme.color.black}
              placeholderTextColor={Apptheme.color.text}
            />
            {error ? (
              <Text style={[FontStyle.label, {color: Apptheme.color.red}]}>
                {error}
              </Text>
            ) : null}
            <Gap m8 />
            <AddButton
              label={'APPLY'}
              image={Images.pngImages.longArrowNext}
              onPress={() => GiftCardReedem(value)}
            />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
      <BottomSheetModal
        ref={walletModalRef}
        style={{backgroundColor: '#fff'}}
        index={0}
        backdropComponent={BackDrop} // Custom backdrop component
        enableDynamicSizing={true}
        onDismiss={() => walletModalRef.current?.close()}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize">
        <BottomSheetView>
          <View style={{padding: Apptheme.spacing.innerContainer}}>
            <Text style={[FontStyle.heading]}>Select Wallet Type</Text>
            <Gap m6 />
            <FlatList
              data={walletData}
              renderItem={walletRender}
              ItemSeparatorComponent={<Gap m2 />}
            />
            <Gap m4 />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: Apptheme.color.background},
  walletContainer: {
    borderWidth: 0.7,
    borderColor: Apptheme.color.containerBackground,
    backgroundColor: Apptheme.color.black,

    padding: Apptheme.spacing.innerContainer,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topContainer: {
    height: 140,
    flex: 1,
    borderWidth: 1,
    borderColor: Apptheme.color.containerBackground,
    paddingHorizontal: Apptheme.spacing.innerContainer,
    paddingVertical: 25,
  },
});
