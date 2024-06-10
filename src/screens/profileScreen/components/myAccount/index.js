import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ProductHeader from '../../../../components/atoms/ProductHeader';
import Apptheme from '../../../../assets/theme/apptheme';
import Divider from '../../../../components/atoms/Divider';
import Gap from '../../../../components/atoms/Gap';
import InputField from '../../../../components/atoms/inputField';
import FontStyle from '../../../../assets/theme/FontStyle';
import AddButton from '../../../../components/atoms/AddButton';
import Images from '../../../../assets/images';
import {GetCustomer, updateCustomer} from '../../../../apiServices/apiHelper';
import AxiosInstance from '../../../../apiServices/AxiosInstance';
import {Controller, useForm} from 'react-hook-form';
import {Checkbox} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import moment from 'moment';
import RouteName from '../../../../navigation/RouteName';
import {Calendar} from 'react-native-calendars';

const MyAccount = () => {
  const [genderSelection, setGenderSelection] = useState();

  const route = useRoute();
  const customerdata = route.params?.Data;
  const navigation = useNavigation();
  const [gender, setGender] = useState(customerdata?.gender ?? '');
  const [checked, setChecked] = useState(
    customerdata?.isBusinessCustomer ? true : false,
  );
  const [CalendarVisible, setCalendarVisible] = useState(false);
  const [selected, setSelected] = useState('');

  const toggleCalendar = () => {
    setCalendarVisible(true);
  };

  const [date, setDate] = useState('');
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const EditAddressData = async data => {
    console.log('data', data);
    const url = updateCustomer();

    try {
      const body = {
        firstName: data?.firstName,
        lastName: data?.lastName,
        phone: customerdata?.phone,
        profileImgUrl: null,
        gender: gender ?? '',
        email: data?.email,
        gstn: data?.gstNumber,
        businessName: data?.businessName,
        isBusinessCustomer: checked ? 1 : 0,
        updatedDate: null,
        createdDate: null,
        // dob: moment(data?.DOB, 'YYYY-MM-DD').format('YYYY-MM-DD'),
        dob: data?.DOB ?? '',
        lastActivity: 1713950304000,
      };

      const response = await AxiosInstance.put(url, body);
      console.log('editAddress response', response.data);
      if (response.data.status) {
        console.log(response.data?.object);
        console.log('success');
        navigation.navigate(RouteName.PROFILE_SECTION, {from: 'account'});
      }
    } catch (err) {
      console.log('@ HomePageCategoryListing error', err);
    }
  };

  console.log('customerdata', customerdata);

  const data = [
    {
      label: 'Male',
    },
    {
      label: 'Female',
    },
    {
      label: 'Other',
    },
  ];
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setGender(item.label);
        }}
        style={{flexDirection: 'row'}}>
        <View
          style={{
            borderWidth: 0.8,
            borderColor: Apptheme.color.text,
            height: 18,
            aspectRatio: 1,
            borderRadius: 360,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {gender == item?.label ? (
            <View
              style={{
                height: 13,
                aspectRatio: 1,
                borderRadius: 360,
                backgroundColor: Apptheme.color.black,
              }}
            />
          ) : null}
        </View>
        <Gap row m4 />
        <Text style={[FontStyle.titleSmall]}>{item?.label}</Text>
      </TouchableOpacity>
    );
  };

  const onSubmit = async data => {
    console.log('customerdata.firstName', customerdata.firstName);
    EditAddressData(data);
  };
  return (
    <View style={{flex: 1, backgroundColor: Apptheme.color.background}}>
      <ProductHeader name={'EDIT PROFILE INFO'} />
      <Gap m9 />
      <ScrollView
        style={{flex: 1, paddingHorizontal: Apptheme.spacing.innerContainer}}>
        <>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <InputField
                label="FIRST NAME"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                type="email"
                autoCapitalize="none"
              />
            )}
            name="firstName"
            rules={{required: 'First Name is required'}}
            defaultValue={customerdata?.firstName ?? ''}
          />
          {errors.firstName && (
            <Text style={(FontStyle.label, styles.errorText)}>
              {errors.firstName.message}
            </Text>
          )}
        </>

        <Gap m5 />
        <>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <InputField
                label="LAST NAME"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                type="email"
                autoCapitalize="none"
              />
            )}
            name="lastName"
            defaultValue={customerdata?.lastName ?? ''}
          />
        </>
        <Gap m5 />

        <>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <InputField
                label="PHONE NO."
                onBlur={onBlur}
                onChangeText={onChange}
                value={customerdata?.phone}
                type="phone"
                autoCapitalize="none"
                disabled={true}
              />
            )}
            name="phoneNo"
            defaultValue={customerdata?.phone ?? ''}
          />
        </>
        <Gap m5 />
        <>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <InputField
                label="EMAIL ADDRESS"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                type="email"
                autoCapitalize="none"
              />
            )}
            name="email"
            rules={{
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: 'Invalid email address',
              },
            }}
            defaultValue={customerdata?.email ?? ''}
          />
          {errors.email && (
            <Text style={(FontStyle.label, styles.errorText)}>
              {errors.email.message}
            </Text>
          )}
        </>
        <Gap m5 />
        <>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TouchableOpacity
                onPress={() => {
                  console.log('hello');
                  setCalendarVisible(true);
                }}>
                <InputField
                  label="DOB"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  // onChangeText={onChange}
                  placeholder={'DD/MM/YYYY'}
                  value={value}
                  type="email"
                  autoCapitalize="none"
                  readOnly={true}
                />
              </TouchableOpacity>
            )}
            name="DOB"
            rules={{
              pattern: {
                value: /^\d{4}-\d{2}-\d{2}$/,
                message: 'Invalid DOB format. Use YYYY-MM-DD format.',
              },
            }}
            defaultValue={moment(customerdata?.dob).format('YYYY-MM-DD') ?? ''}
          />
          {errors.DOB && (
            <Text style={(FontStyle.label, styles.errorText)}>
              {errors.DOB.message}
            </Text>
          )}
        </>
        <Gap m5 />

        <Text style={[FontStyle.labelMedium, {fontSize: 14}]}>GENDER</Text>
        <Gap m7 />
        <View>
          <FlatList
            data={data}
            contentContainerStyle={{
              width: '100%',
              justifyContent: 'space-between',

              paddingHorizontal: 10,
            }}
            horizontal
            renderItem={(item, index) => renderItem(item, index)}
          />
        </View>
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
                defaultValue={customerdata?.businessName ?? ''}
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
                defaultValue={customerdata?.gstn ?? ''}
              />
              {errors.gstNumber && (
                <Text style={(FontStyle.label, styles.errorText)}>
                  {errors.gstNumber.message}
                </Text>
              )}
            </>
          </>
        ) : null}
        <Gap m9 />
        <Gap m9 />
      </ScrollView>
      <View style={{paddingHorizontal: Apptheme.spacing.innerContainer}}>
        <AddButton
          label="Save"
          image={Images.pngImages.longArrowNext}
          onPress={handleSubmit(onSubmit)}
        />
        <Gap m6 />
      </View>
      {CalendarVisible && (
        <View style={{height: 200, width: 500, backgroundColor: 'yellow'}}>
          <Calendar
            onDayPress={day => {
              setSelected(day.dateString);
            }}
            markedDates={{
              [selected]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: 'orange',
              },
            }}
          />
        </View>
      )}
    </View>
  );
};

export default MyAccount;

const styles = StyleSheet.create({
  errorText: {color: Apptheme.color.red, fontSize: 10},
});
