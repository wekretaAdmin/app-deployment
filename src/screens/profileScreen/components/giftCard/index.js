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
import Divider from '../../../../components/atoms/Divider';
import Apptheme from '../../../../assets/theme/apptheme';
import FontStyle from '../../../../assets/theme/FontStyle';
import Gap from '../../../../components/atoms/Gap';
import Images from '../../../../assets/images';
import {useNavigation} from '@react-navigation/native';
import RouteName from '../../../../navigation/RouteName';
import {GetGiftCard, couponList} from '../../../../apiServices/apiHelper';
import AxiosInstance from '../../../../apiServices/AxiosInstance';

const GiftCard = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [giftlist, setGiftList] = useState([]);

  useEffect(() => {
    getCoupon();
  }, []);

  const getCoupon = async () => {
    setLoading(true);
    console.log('abcd');
    const url = couponList();
    console.log('getCoupon', url);
    try {
      const response = await AxiosInstance.get(url);
      console.log('setCardAddress response', response.data);
      if (response.data.status) {
        setGiftList(response.data?.object);
      }
      setLoading(false);
    } catch (err) {
      console.log('@ setCardAddress error', err);
      setLoading(false);
    }
  };

  console.log('giftList', giftlist);

  const renderItem = ({item}) => {
    const onPress = () => {
      navigation.navigate(RouteName.VOUCHER_DETAIL, {item});
    };
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          padding: Apptheme.spacing.innerContainer,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: 44,
            borderRadius: 4,
            width: 70,
            backgroundColor: Apptheme.color.containerBackground,
          }}>
          <Image
            source={{uri: item?.appBannerUrl}}
            style={{height: '100%', width: '100%'}}
          />
        </View>
        <Gap row m5 />
        <View style={{flex: 1}}>
          <Text style={[FontStyle.headingSmall]}>{item?.couponCode}</Text>
          <Gap m2 />
          <Text style={[FontStyle.label, {color: Apptheme.color.subText}]}>
            CouponType : {item?.couponType}
          </Text>
        </View>
        <View>
          <Image
            source={Images.pngImages.arrowNext}
            style={{height: 20, aspectRatio: 1}}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const emptyComponent = () => {
    return (
      <View
        style={{
          height: Dimensions.get('screen').height - 220,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={[FontStyle.labelMedium]}>NO VOUCHERS</Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: Apptheme.color.background}}>
      <ProductHeader name={'VOUCHERS'} />
      <Divider backgroundColor={'#d7d7d7'} />
      <View style={{flex: 1}}>
        <FlatList
          data={giftlist}
          // data={[]}
          renderItem={renderItem}
          ItemSeparatorComponent={<Divider />}
          ListEmptyComponent={emptyComponent}
        />
      </View>

      <Divider />
    </View>
  );
};

export default GiftCard;

const styles = StyleSheet.create({});
