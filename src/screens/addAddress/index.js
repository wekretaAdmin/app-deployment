import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Apptheme from '../../assets/theme/apptheme';
import FontStyle from '../../assets/theme/FontStyle';
import Gap from '../../components/atoms/Gap';
import VectorIcon from '../../assets/vectorIcon';
import InputField from '../../components/atoms/inputField';
import AddButton from '../../components/atoms/AddButton';
import Images from '../../assets/images';
import PagerView from 'react-native-pager-view';
import {useNavigation, useRoute} from '@react-navigation/native';
import FirstScreen from './components/FirstScreen';
import SecondScreen from './components/SecondScreen';
import ThirdScreen from './components/ThirdScreen';
import {CreateAddress, EditAddress} from '../../apiServices/apiHelper';
import axios from 'axios';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import AxiosInstance from '../../apiServices/AxiosInstance';
import {useSelector} from 'react-redux';
import {Controller, useForm} from 'react-hook-form';
import RouteName from '../../navigation/RouteName';
import {Checkbox} from 'react-native-paper';

const AddAdress = () => {
  const pagerRef = useRef(null);
  const navigation = useNavigation();

  const [addressError, setAddressError] = useState(false);
  const user = useSelector(state => state.loginReducer.user);

  const route = useRoute();

  const editData = route.params?.data;
  const from = route.params?.from;
  console.log(from);
  const [addressType, setAddressType] = useState(editData?.addressOf ?? '');
  const [checked, setChecked] = useState(editData?.isBusinessCustomer ?? false);
  console.log('editData', editData);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const AddAddress = async data => {
    console.log('data', data);
    const url = CreateAddress();

    try {
      const body = {
        id: 0,
        customer: '',
        customerId: '',
        customerUUID: '',
        customerName: data.Name,
        addressLine1: data.ADDRESS,
        addressLine2: data.LOCALITY,
        addressOf: addressType,
        city: data.CITY,
        country: 'India',
        pincode: data.PINCODE,
        latitude: '',
        longitude: '',
        landmark: data.LANDMARK,
        email: '',
        checked: false,
        isPrimary: 1,
        phone: data.Phone,
        isSelected: false,
        isRestricted: false,
        isBusinessCustomer: checked ? 1 : 0,
        businessName: data?.businessName,
        gstNumber: data.gstNumber,
        state: data.STATE,
      };

      const response = await AxiosInstance.post(url, body);
      console.log('productDetail response', response.data);
      if (response.data.status) {
        console.log(response.data?.object);

        if (from == 'Profile') {
          navigation.navigate(RouteName.ADDRESS_BOOK);
        } else {
          navigation.navigate(RouteName.SHOPPING_BAG, {from: 'address123'});
        }
      }
    } catch (err) {
      console.log('@ HomePageCategoryListing error', err);
    }
  };

  const EditAddressData = async data => {
    console.log('data', data);
    const url = EditAddress(editData?.id);

    try {
      const body = {
        createdDate: '',
        updatedDate: '',
        isFlag: 1,
        id: editData?.id,
        addressLine1: data.ADDRESS,
        addressLine2: data.LOCALITY,
        city: data.CITY,
        country: 'India',
        email: '',
        state: 'Bihar',
        stateCode: null,
        pincode: data.PINCODE,
        landmark: data.LANDMARK,
        addressOf: 'Home',
        phone: data.Phone,
        customerName: data.Name,
        gstNumber: data.gstNumber,
        isPrimary: 1,
        isBusinessCustomer: checked ? 1 : 0,
        businessName: data?.businessName ?? '',
        status: null,
        latitude: '',
        longitude: '',
      };

      const response = await AxiosInstance.put(url, body);
      console.log('editAddress response', response.data);
      if (response.data.status) {
        console.log(response.data?.object);
        if (from == 'Profile') {
          navigation.navigate(RouteName.ADDRESS_BOOK);
        } else {
          navigation.navigate(RouteName.SHOPPING_BAG, {from: 'address123'});
        }
      }
    } catch (err) {
      console.log('@ HomePageCategoryListing error', err);
    }
  };

  const data = [
    {lable: 'Home', id: 1},
    {lable: 'Office', id: 2},
    {lable: 'Others', id: 3},
  ];

  const onSubmit = async data => {
    if (addressType == '') {
      setAddressError(true);
    } else {
      if (editData) {
        EditAddressData(data);
      } else {
        AddAddress(data);
      }
    }
  };

  const renderItem = ({item}) => {
    const onPress = () => {
      setAddressType(item?.lable);
    };
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor:
            addressType == item?.lable ? Apptheme.color.black : null,
          padding: 8,
          paddingHorizontal: 16,
          borderWidth: 1,
          borderColor: Apptheme.color.black,
          borderRadius: 1,
        }}>
        <Text
          style={[
            FontStyle.titleSmall,
            {
              color:
                item?.lable == addressType
                  ? Apptheme.color.background
                  : Apptheme.color.black,
            },
          ]}>
          {item?.lable}
        </Text>
      </TouchableOpacity>
    );
  };

  const onBack = () => {
    if (from == 'Profile') {
      return navigation.navigate(RouteName.ADDRESS_BOOK);
    } else {
      return navigation.navigate(RouteName.SHOPPING_BAG, {to: 'address123'});
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View>
        <Gap m7 />
        <View style={styles.headerHeight}>
          <TouchableOpacity onPress={onBack}>
            <VectorIcon name="keyboard-backspace" material-icon size={22} />
          </TouchableOpacity>
          <Gap row m5 />
          <Text style={[FontStyle.heading]}>ADD NEW ADDRESS</Text>
        </View>
      </View>

      <Gap m7 />
      <ScrollView style={{flex: 1}}>
        <Gap m7 />
        <>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <InputField
                label="Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                type="email"
                autoCapitalize="none"
              />
            )}
            name="Name"
            rules={{required: 'name is required'}}
            defaultValue={editData?.customerName ?? ''}
          />
          {errors.Name && (
            <Text style={(FontStyle.label, styles.errorText)}>
              {errors.Name.message}
            </Text>
          )}
        </>
        <Gap m7 />
        <>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <InputField
                label="Phone"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                type="phone"
              />
            )}
            name="Phone"
            rules={{
              required: 'Phone is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Invalid phone number',
              },
            }}
            defaultValue={editData?.phone ?? ''}
          />
          {errors.Phone && (
            <Text style={(FontStyle.label, styles.errorText)}>
              {errors.Phone.message}
            </Text>
          )}
        </>

        <Gap m7 />
        <>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <InputField
                label="LANDMARK"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                type="email"
                autoCapitalize="none"
              />
            )}
            name="LANDMARK"
            defaultValue={editData?.landmark ?? ''}
          />
        </>

        <Gap m7 />
        <>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <InputField
                label="PINCODE"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                type="phone"
                maxLength={6}
              />
            )}
            name="PINCODE"
            rules={{
              required: 'Pincode is required',
              pattern: {
                value: /^[0-9]{6}$/,
                message: 'Invalid PIN code',
              },
            }}
            defaultValue={editData?.pincode ?? ''}
          />
          {errors.PINCODE && (
            <Text style={(FontStyle.label, styles.errorText)}>
              {errors.PINCODE.message}
            </Text>
          )}
        </>

        <Gap m7 />
        <>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <InputField
                label="STATE"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                type="email"
              />
            )}
            name="STATE"
            rules={{required: 'State is required'}}
            defaultValue={editData?.state ?? ''}
          />
          {errors.STATE && (
            <Text style={(FontStyle.label, styles.errorText)}>
              {errors.STATE.message}
            </Text>
          )}
        </>

        <Gap m7 />
        <>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <InputField
                label="ADDRESS"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                type="email"
              />
            )}
            name="ADDRESS"
            rules={{required: 'Address is required'}}
            defaultValue={editData?.addressLine1 ?? ''}
          />
          {errors.ADDRESS && (
            <Text style={(FontStyle.label, styles.errorText)}>
              {errors.ADDRESS.message}
            </Text>
          )}
        </>

        <Gap m7 />
        <>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <InputField
                label="LOCALITY"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                type="email"
              />
            )}
            name="LOCALITY"
            defaultValue={editData?.addressLine2 ?? ''}
          />
        </>

        <Gap m7 />
        <>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <InputField
                label="CITY"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                type="email"
              />
            )}
            name="CITY"
            rules={{required: 'City is required'}}
            defaultValue={editData?.city ?? ''}
          />
          {errors.CITY && (
            <Text style={(FontStyle.label, styles.errorText)}>
              {errors.CITY.message}
            </Text>
          )}
        </>

        <Gap m7 />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
            uncheckedColor="#444"
            color="#444"
          />
          <Gap row m2 />
          <Text style={[FontStyle.labelMedium]}>
            This is a business customer?
          </Text>
        </View>
        {checked ? (
          <>
            <Gap m4 />
            <>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <InputField
                    label="BUSINESS NAME"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    autoCapitalize="none"
                    type="email"
                  />
                )}
                name="businessName"
                rules={checked ? {required: 'Business Name is required'} : null}
                defaultValue={editData?.businessName ?? ''}
              />
              {errors.businessName && (
                <Text style={(FontStyle.label, styles.errorText)}>
                  {errors.businessName.message}
                </Text>
              )}
            </>

            <Gap m7 />
            <>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <InputField
                    label="GST NUMBER"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    autoCapitalize="none"
                    type="email"
                  />
                )}
                name="gstNumber"
                rules={
                  checked
                    ? {
                        required: 'Gst number is required',
                        pattern: {
                          value:
                            /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/,
                          message: 'Invalid GST number',
                        },
                      }
                    : null
                }
                defaultValue={editData?.gstNumber ?? ''}
              />
              {errors.gstNumber && (
                <Text style={(FontStyle.label, styles.errorText)}>
                  {errors.gstNumber.message}
                </Text>
              )}
            </>
          </>
        ) : null}

        <Gap m7 />
        <Text style={[FontStyle.labelMedium]}>
          Type of address{' '}
          {addressError ? (
            <Text style={[FontStyle.heading, {color: Apptheme.color.red}]}>
              *
            </Text>
          ) : null}
        </Text>
        <Gap m5 />
        <FlatList
          data={data}
          renderItem={renderItem}
          horizontal
          ItemSeparatorComponent={<Gap row m4 />}
          // style={{heig}}
        />
        <Gap m7 />
        <Gap m7 />
      </ScrollView>

      <View style={{paddingVertical: Apptheme.spacing.innerContainer}}>
        <AddButton
          label={'SAVE'}
          image={Images.pngImages.longArrowNext}
          // onPress={AddAddress}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

export default AddAdress;

const styles = StyleSheet.create({
  errorText: {color: Apptheme.color.red, fontSize: 10},
  mainContainer: {
    flex: 1,
    backgroundColor: Apptheme.color.background,
    padding: Apptheme.spacing.innerContainer,
  },
  headerHeight: {
    flexDirection: 'row',

    alignItems: 'center',
  },
});
