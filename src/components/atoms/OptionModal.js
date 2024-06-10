import {
  FlatList,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Apptheme from '../../assets/theme/apptheme';
import FontStyle from '../../assets/theme/FontStyle';
import VectorIcon from '../../assets/vectorIcon';
import Gap from './Gap';
import {AddWishlist, moveCart} from '../../apiServices/apiHelper';
import AxiosInstance from '../../apiServices/AxiosInstance';
import {useSelector} from 'react-redux';

const OptionModal = ({
  ActionSheet,
  active,
  setActive,
  resfreshWishList,
  activeId,
  setLoading,
}) => {
  const user = useSelector(state => state.loginReducer.user);
  const data = [
    {
      label: 'Add to bag',
    },
    {
      label: 'Remove from Wishist',
    },
  ];

  const AddWishlistItem = async product => {
    const url = AddWishlist(product);
    try {
      const response = await AxiosInstance.post(url);
      console.log('HomePageCategoryListing response', response.data);

      if (response.data.status) {
        resfreshWishList();
        ActionSheet.current.close();
      }
    } catch (err) {
      console.log('@ HomePageCategoryListing error', err);
    }
  };

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
        ActionSheet.current.close();
      } else {
        ToastAndroid.show(response.data.message, 200);
      }
    } catch (err) {
      console.log('@ HomePageCategoryListing error', err);
    }
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (item.label == 'Add to bag') {
            AddCart(active);
          }
          if (item.label == 'Remove from Wishist') {
            AddWishlistItem(activeId);
          }
        }}
        style={{
          height: Apptheme.spacing.headerHeight,

          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderColor: Apptheme.color.containerBackground,
        }}>
        <Text style={[FontStyle.titleSmall]}>{item?.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Apptheme.color.background,
        padding: Apptheme.spacing.innerContainer,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={[FontStyle.heading]}>OPTIONS</Text>
        <TouchableOpacity onPress={() => ActionSheet.current.close()}>
          <VectorIcon material-community-icon name="window-close" size={22} />
        </TouchableOpacity>
      </View>
      <Text>OptionModal</Text>
      {/* <Gap m2 /> */}
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
};

export default OptionModal;

const styles = StyleSheet.create({});
