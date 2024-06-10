import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Apptheme from '../../../../assets/theme/apptheme';
import ProductHeader from '../../../../components/atoms/ProductHeader';
import Divider from '../../../../components/atoms/Divider';
import AddButton from '../../../../components/atoms/AddButton';
import Images from '../../../../assets/images';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import RouteName from '../../../../navigation/RouteName';
import FontStyle from '../../../../assets/theme/FontStyle';
import Gap from '../../../../components/atoms/Gap';
import VectorIcon from '../../../../assets/vectorIcon';
import {DeleteAddress, fetchAddress} from '../../../../apiServices/apiHelper';
import AxiosInstance from '../../../../apiServices/AxiosInstance';

const AddressBook = () => {
  const navigation = useNavigation();
  const [addressLoading, setAddressLoading] = useState(true);
  const [addressData, setAddressData] = useState([]);
  const isFocus = useIsFocused();

  useEffect(() => {
    getAddress();
  }, [isFocus]);

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

  const AddressDelete = async addressId => {
    const url = DeleteAddress(addressId);

    console.log('getAddress', url);
    try {
      const response = await AxiosInstance.delete(url);
      console.log('getAdress response', response.data);
      if (response.data.status) {
        getAddress();
      }
    } catch (err) {
      console.log('@ HomePageCategoryListing error', err);
    }
  };

  const renderItem = ({item}) => {
    const toAddress = () => {
      navigation.navigate(RouteName.ADD_ADDRESS, {data: item, from: 'Profile'});
    };
    const onDelete = () => {
      AddressDelete(item.id);
    };
    return (
      <View
        style={{
          flexDirection: 'row',
          borderWidth: 1,
          borderColor: Apptheme.color.boxOutline,
        }}>
        <View style={{padding: Apptheme.spacing.innerContainer, flex: 1}}>
          <Text style={[FontStyle.label]}>{item?.customerName}</Text>
          <Text style={[FontStyle.label]}>{item?.addressLine1}</Text>
          <Text style={[FontStyle.label]}>{item?.pincode}</Text>
          <Text style={[FontStyle.label]}>
            {item?.state} {item?.country}
          </Text>
        </View>
        <TouchableOpacity
          onPress={toAddress}
          style={{
            width: 54,

            borderLeftWidth: 1,
            borderColor: Apptheme.color.line,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <VectorIcon material-community-icon name="pencil" size={18} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDelete}
          style={{
            width: 54,

            borderLeftWidth: 1,
            borderColor: Apptheme.color.line,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <VectorIcon material-community-icon name="delete" size={18} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: Apptheme.color.background}}>
      <ProductHeader name={'ADDRESS BOOK'} />
      {/* <Divider backgroundColor={'#d7d7d7'} /> */}
      <View
        style={{flex: 1, paddingHorizontal: Apptheme.spacing.innerContainer}}>
        <Gap m3 />
        <FlatList
          data={addressData}
          renderItem={renderItem}
          ItemSeparatorComponent={<Gap m6 />}
        />
      </View>
      <View style={{padding: Apptheme.spacing.innerContainer}}>
        <AddButton
          label={'ADD NEW ADDRESS'}
          image={Images.pngImages.longArrowNext}
          onPress={() =>
            navigation.navigate(RouteName.ADD_ADDRESS, {from: 'Profile'})
          }
        />
      </View>
    </View>
  );
};

export default AddressBook;

const styles = StyleSheet.create({});
