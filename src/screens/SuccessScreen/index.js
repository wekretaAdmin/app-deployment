import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Apptheme from '../../assets/theme/apptheme';
import FontStyle from '../../assets/theme/FontStyle';
import Gap from '../../components/atoms/Gap';
import ShoppingBagItems from '../../components/molecules/ShoppingBagItems';
import {OrderSuccesDetail} from '../../apiServices/apiHelper';
import AxiosInstance from '../../apiServices/AxiosInstance';
import {useNavigation, useRoute} from '@react-navigation/native';
import RouteName from '../../navigation/RouteName';

const SuccessScreen = () => {
  const route = useRoute();
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  const cartId = route.params?.invoiceId;

  console.log('route', route.params);

  useEffect(() => {
    InvoiceOrderList(cartId);
  }, []);

  const InvoiceOrderList = async cartId => {
    const url = OrderSuccesDetail(cartId);

    console.log('getAddress', url);
    try {
      const response = await AxiosInstance.get(url);
      console.log('InvoiceOrderList', JSON.stringify(response.data));
      if (response.data.status) {
        setData(response.data.object?.cartProducts);
      }
    } catch (err) {
      console.log('@ InvoiceOrderList error', err);
    }
  };

  const onPress = () => {
    navigation.navigate(RouteName.HOME_SCREEN);
  };

  return (
    <View style={styles.mainContainer}>
      <Gap m7 />
      <Gap m7 />

      <Text style={[FontStyle.headingLarge, {fontSize: 26}]}>
        YOUR ORDER WAS PLACED SUCCESSFULLY
      </Text>
      <Gap m7 />
      <Text style={[FontStyle.labelMedium]}>Order Number : {cartId}</Text>
      <Gap m9 />

      <View style={{flex: 1}}>
        <ShoppingBagItems data={data} option={false} Save={false} />
        <Gap m9 />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => navigation.navigate(RouteName.ORDER_HISTORY)}
          style={styles.secondaryButton}>
          <Text style={[FontStyle.labelMedium]}>VIEW ORDER</Text>
        </TouchableOpacity>
        <Gap row m5 />
        <TouchableOpacity onPress={onPress} style={styles.primaryButton}>
          <Text
            style={[FontStyle.labelMedium, {color: Apptheme.color.background}]}>
            SHOP ON
          </Text>
        </TouchableOpacity>
      </View>
      <Gap m8 />
    </View>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Apptheme.color.background,
    paddingHorizontal: Apptheme.spacing.innerContainer,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  secondaryButton: {
    height: 46,
    flex: 1,

    borderRadius: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  primaryButton: {
    height: 46,
    flex: 1,
    backgroundColor: Apptheme.color.black,
    borderRadius: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
