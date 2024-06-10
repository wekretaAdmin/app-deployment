import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Header from '../../components/atoms/Header';
import Images from '../../assets/images';
import Divider from '../../components/atoms/Divider';
import Apptheme from '../../assets/theme/apptheme';
import FontStyle from '../../assets/theme/FontStyle';
import Gap from '../../components/atoms/Gap';
import VectorIcon from '../../assets/vectorIcon';
import RBSheet from 'react-native-raw-bottom-sheet';
import OptionModal from '../../components/atoms/OptionModal';
import WishListItem from '../../components/molecules/WishListItem';
import {useSelector} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import RouteName from '../../navigation/RouteName';
import AxiosInstance from '../../apiServices/AxiosInstance';
import {AddWishlist, GetWishlist} from '../../apiServices/apiHelper';
const WishListScreen = () => {
  const ActionSheet = useRef();
  const navigation = useNavigation();
  const isFocus = useIsFocused();
  const [data, setData] = useState([]);
  const [active, setActive] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(true);

  const abc = [
    {
      image:
        'https://assets.adidas.com/images/w_600,f_auto,q_auto/66bd545925584cbbb2cc8c639764847d_9366/3_STRIPES_PIQUE_POLO_SHIRT_Black_IL6572_21_model.jpg',
      price: '₹ 11999.00',
      label: 'Stan Smith Shoes',
      alert: 'FEW ITEMS LEFT',
      discount: '- 45%',
    },

    {
      image:
        'https://assets.adidas.com/images/w_280,h_280,f_auto,q_auto:sensitive/138c68d541fb4b509abcca776d1f8ba0_9366/IF6495_580_IF6495_01_standard.jpg.jpg?sh=364&strip=false&sw=364',
      price: '₹ 11999.00',
      label: 'Stan Smith Shoes',
      alert: 'FEW ITEMS LEFT',
    },
    {
      image:
        'https://assets.adidas.com/images/w_600,f_auto,q_auto/24420a7eba514de08891b5f4795c3d9b_9366/T20_INTERNATIONAL_CRICKET_JERSEY_Blue_JE0093_21_model.jpg',
      price: '₹ 3799.00',
      label: 'Germany Adicolor Classics',
      alert: 'FEW ITEMS LEFT',
    },
    {
      image:
        'https://assets.adidas.com/images/w_600,f_auto,q_auto/6bb5938881ff428b88f487ba92eb968d_9366/Stan_Smith_CS_Shoes_Blue_IG2901_01_standard.jpg',
      price: '₹ 11999.00',
      label: 'Melange Tee',
      alert: 'FEW ITEMS LEFT',
    },
    {
      image:
        'https://assets.adidas.com/images/w_600,f_auto,q_auto/bfac4aab68ec4ddb82dcad2c0074a997_9366/Manchester_United_21-22_Home_Jersey_Red_H31447_21_model.jpg',
      price: '₹ 11999.00',
      label: 'Superstar XLG Shoes',
      // alert: 'FEW ITEMS LEFT',
      discount: '- 45%',
    },
    {
      image:
        'https://assets.adidas.com/images/w_600,f_auto,q_auto/6268a07e6f884995b9dc9145d88380b0_9366/Samba_OG_Shoes_Brown_IG6174_01_standard.jpg',
      price: '₹ 11999.00',
      label: 'Stan Smith Shoes',
      alert: 'FEW ITEMS LEFT',
    },
  ];
  const user = useSelector(state => state.loginReducer.user);

  useEffect(() => {
    if (!user.isLogin) {
      navigation.navigate(RouteName.LOGIN_SCREEN, {from: 'register'});
    }
    getWishlistDetail();
  }, [isFocus]);

  const getWishlistDetail = async () => {
    setLoading(true);
    const url = GetWishlist();
    try {
      const response = await AxiosInstance.get(url);
      console.log(
        'HomePageCategoryListing response',
        JSON.stringify(response.data),
      );
      if (response.data.status) {
        setData(response.data?.object);
        setLoading(false);
      }
    } catch (err) {
      console.log('@ HomePageCategoryListing error', err);
      setLoading(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor="#fff" />
      <Header label={'WISHLIST'} icon={Images.pngImages.user} onPress={''} />
      <Divider />
      <View style={{flex: 1}}>
        {data == null || data.length == 0 ? null : (
          <>
            <View style={styles.wishlistItemContainer}>
              <Text style={[FontStyle.label]}>{data?.length} ITEMS</Text>
            </View>
            <Divider />
          </>
        )}
        <View style={{flex: 1}}>
          <WishListItem
            resfreshWishList={getWishlistDetail}
            data={data}
            loading={loading}
            ActionSheet={ActionSheet}
            setActiveId={setActiveId}
            setActive={setActive}
          />
        </View>
        <RBSheet
          ref={ActionSheet}
          height={210}
          closeOnDragDown={true}
          closeOnPressMask={true}
          closeOnPressBack={true}
          animationType="fade"
          customStyles={{
            wrapper: {
              flex: 1,
            },
            container: styles.rbSheetContainer,
            draggableIcon: {
              backgroundColor: '#000',
              width: '25%',
            },
          }}>
          <OptionModal
            ActionSheet={ActionSheet}
            active={active}
            setActive={setActive}
            activeId={activeId}
            resfreshWishList={getWishlistDetail}
            setLoading={setLoading}
          />
        </RBSheet>
      </View>
    </View>
  );
};

export default WishListScreen;

const styles = StyleSheet.create({
  rbSheetContainer: {
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    width: '100%',
    backgroundColor: '#fff',
  },
  mainContainer: {flex: 1, backgroundColor: Apptheme.color.background},
  wishlistItemContainer: {
    height: 46,
    paddingHorizontal: Apptheme.spacing.innerContainer,
    justifyContent: 'center',
  },
});
