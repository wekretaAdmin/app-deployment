/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Apptheme from '../../../../assets/theme/apptheme';
import ProductHeader from '../../../../components/atoms/ProductHeader';
import Divider from '../../../../components/atoms/Divider';
import Gap from '../../../../components/atoms/Gap';
import FontStyle from '../../../../assets/theme/FontStyle';
import InputField from '../../../../components/atoms/inputField';
import AddButton from '../../../../components/atoms/AddButton';
import Images from '../../../../assets/images';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import RouteName from '../../../../navigation/RouteName';
import {Controller, useForm} from 'react-hook-form';
import {ContactPublic, accessKey} from '../../../../apiServices/apiHelper';
import AxiosInstance from '../../../../apiServices/AxiosInstance';

const NeedHelpScreen = () => {
  const [query, setQuery] = useState('Submit your Query');
  const data = ['Submit your Query', 'Chat now'];
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const navigation = useNavigation();
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => setQuery(item)}
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <View>
          <View
            style={{
              height: 18,
              aspectRatio: 1,
              borderRadius: 360,
              borderWidth: 1.5,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor:
                query == item
                  ? Apptheme.color.black
                  : Apptheme.color.boxOutline,
            }}>
            {query == item ? (
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
        </View>
        <Gap row m2 />
        <Text style={[FontStyle.labelMedium]}>{item}</Text>
      </TouchableOpacity>
    );
  };
  const isFocus = useIsFocused();

  useEffect(() => {
    setQuery('Submit your Query');
  }, [isFocus]);

  if (query == 'Chat now') {
    navigation.navigate(RouteName.CHAT_NOW);
  }

  const onSubmit = async data => {
    console.log('customerdata.firstName', data);
    PublicContact(data);
  };

  const PublicContact = async data => {
    console.log('data', data);
    const url = ContactPublic();

    try {
      const body = {
        firstName: data?.firstName,
        lastName: data?.lastName,
        email: data?.email,
        phone: data?.mobileNumber,
        subject: data?.Subject,
        description: data?.description,
        storeUuid: accessKey,
      };

      const response = await AxiosInstance.post(url, body);
      console.log('PublicContact response', response.data);
      if (response.data.status) {
        console.log(response.data?.object);
        ToastAndroid.show('submit', 200);
        navigation.goBack();
      }
    } catch (err) {
      console.log('@ PublicContact error', err);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ProductHeader name={'NEED HELP  '} />
      <Divider />
      <ScrollView style={{padding: Apptheme.spacing.innerContainer, flex: 1}}>
        <Gap m5 />
        <Text style={[FontStyle.heading]}>Got Any Questions</Text>
        <Gap m1 />
        <Text style={[FontStyle.label]}>
          Select the option below get in touch with the team
        </Text>
        <Gap m7 />
        <FlatList
          data={data}
          renderItem={renderItem}
          scrollEnabled={false}
          horizontal
          ItemSeparatorComponent={<Gap row m8 />}
        />
        <Gap m9 />
        <View>
          <Text style={[FontStyle.labelMedium]}>
            Fill the details
            <Text style={[FontStyle.label]}> (all fields are mandatory)</Text>
          </Text>
          <Gap m8 />
          <View>
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
              defaultValue={''}
            />
            {errors.firstName && (
              <Text style={(FontStyle.label, styles.errorText)}>
                {errors.firstName.message}
              </Text>
            )}

            <Gap m5 />
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
              defaultValue={''}
            />

            <Gap m5 />
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <InputField
                  label="MOBILE NUMBER"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  type="phone"
                  autoCapitalize="none"
                />
              )}
              name="mobileNumber"
              rules={{required: 'Mobile Number is required'}}
              defaultValue={''}
            />
            {errors.mobileNumber && (
              <Text style={(FontStyle.label, styles.errorText)}>
                {errors.mobileNumber.message}
              </Text>
            )}

            <Gap m5 />
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <InputField
                  label="EMAIL"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  type="email"
                  autoCapitalize="none"
                />
              )}
              name="email"
              rules={{required: 'Email  is required'}}
              defaultValue={''}
            />
            {errors.email && (
              <Text style={(FontStyle.label, styles.errorText)}>
                {errors.email.message}
              </Text>
            )}

            <Gap m5 />
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <InputField
                  label="Subject"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  type="email"
                  autoCapitalize="none"
                />
              )}
              name="Subject"
              rules={{required: 'Subject  is required'}}
              defaultValue={''}
            />
            {errors.Subject && (
              <Text style={(FontStyle.label, styles.errorText)}>
                {errors.Subject.message}
              </Text>
            )}
            <Gap m5 />
            <View style={styles.textInputContainer}>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    placeholder="MESSAGE"
                    placeholderTextColor={Apptheme.color.text}
                    maxLength={1500}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    cursorColor={'#444'}
                    multiline
                    style={{
                      color: Apptheme.color.text,
                    }}
                  />
                )}
                name="description"
                rules={{required: 'message  is required'}}
                defaultValue={''}
              />
            </View>
            <Gap ms />
            <View
              style={{
                alignItems: 'flex-end',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              {errors.description && (
                <Text style={(FontStyle.label, styles.errorText)}>
                  {errors.description.message}
                </Text>
              )}
              <Text style={[FontStyle.label]}>0 of 1000 characters used</Text>
            </View>
          </View>
        </View>
        <Gap m9 />
        <Gap m3 />
      </ScrollView>

      <View style={{padding: Apptheme.spacing.innerContainer}}>
        <AddButton
          label={'SUBMIT'}
          image={Images.pngImages.longArrowNext}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

export default NeedHelpScreen;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: Apptheme.color.background},
  textInputContainer: {
    minHeight: 110,
    borderWidth: 1,
    borderColor: Apptheme.color.black,
    paddingHorizontal: 8,
  },
  errorText: {color: Apptheme.color.red, fontSize: 10},
});
