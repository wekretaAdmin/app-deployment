import {
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ProductHeader from '../../../../components/atoms/ProductHeader';
import Apptheme from '../../../../assets/theme/apptheme';
import Gap from '../../../../components/atoms/Gap';
import FontStyle from '../../../../assets/theme/FontStyle';
import Divider from '../../../../components/atoms/Divider';
import VectorIcon from '../../../../assets/vectorIcon';
import {GetGiftCard} from '../../../../apiServices/apiHelper';
import AxiosInstance from '../../../../apiServices/AxiosInstance';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import Clipboard from '@react-native-clipboard/clipboard';

const VoucherDetail = () => {
  const route = useRoute();
  const data = route.params?.item;

  return (
    <View style={{flex: 1, backgroundColor: Apptheme.color.background}}>
      <ProductHeader name={'VOUCHERS'} />
      <Gap m6 />
      <View style={{flex: 1, paddingLeft: Apptheme.spacing.innerContainer}}>
        <View style={{flex: 1, paddingRight: Apptheme.spacing.innerContainer}}>
          <View
            style={{
              height: 200,
              backgroundColor: 'black',
              borderRadius: 14,
              elevation: 8,
              overflow: 'hidden',
            }}>
            <Image
              source={{uri: data?.appBannerUrl}}
              style={{height: '100%', width: '100%'}}
            />
          </View>
          <Gap m7 />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text
                style={[
                  FontStyle.titleSmall,
                  {color: Apptheme.color.subText, fontSize: 12},
                ]}>
                TYPE
              </Text>
              <Gap m1 />
              <Text style={[FontStyle.headingSmall]}>{data?.couponType}</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text
                style={[
                  FontStyle.titleSmall,
                  {color: Apptheme.color.subText, fontSize: 12},
                ]}>
                START DATE
              </Text>
              <Gap m1 />
              <Text style={[FontStyle.headingSmall]}>
                {moment(data?.startDate).format('DD/MM/YYYY')}
              </Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Text
                style={[
                  FontStyle.titleSmall,
                  {color: Apptheme.color.subText, fontSize: 12},
                ]}>
                EXP. DATE
              </Text>
              <Gap m1 />
              <Text style={[FontStyle.headingSmall]}>
                {moment(data?.expiryDate).format('DD/MM/YYYY')}
              </Text>
            </View>
          </View>
          <Gap m9 />
          <Text style={[FontStyle.titleSmall]}>{data?.description}</Text>
        </View>
        <View>
          <Divider />
          <TouchableOpacity
            onPress={() => {
              Clipboard.setString(data?.couponCode);
              ToastAndroid.show('Copied', 200);
            }}
            style={{
              height: Apptheme.spacing.headerHeight,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <VectorIcon name="credit-card" material-icon size={22} />
            <Gap row m8 />
            <Text style={[FontStyle.headingSmall]}>COPY CODE TO CLIPBOARD</Text>
          </TouchableOpacity>
          <Divider />
        </View>
      </View>
    </View>
  );
};

export default VoucherDetail;

const styles = StyleSheet.create({});
