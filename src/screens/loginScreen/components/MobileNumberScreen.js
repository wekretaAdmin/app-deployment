import {
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Apptheme from '../../../assets/theme/apptheme';
import Gap from '../../../components/atoms/Gap';
import FontStyle from '../../../assets/theme/FontStyle';
import Images from '../../../assets/images';
import VectorIcon from '../../../assets/vectorIcon';
import {useNavigation} from '@react-navigation/native';
import InputField from '../../../components/atoms/inputField';
import AddButton from '../../../components/atoms/AddButton';
import RouteName from '../../../navigation/RouteName';
import {useGetMobileOtpQuery} from '../../../redux/Reducer/Api';
import axios from 'axios';

const MobileNumberScreen = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState();
  const [disabled, setDisabled] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [error, setError] = useState();

  const handleButtonClick = () => {
    if (phone?.length != 10) {
      setError('invalid Phone number');
      // ToastAndroid.show('invalid Phone number', 200);
    } else {
      setDisabled(true);
      setButtonLoading(true);
      axios
        .get('https://accountstaging.krenai.in/api/v4/customer/otp', {
          params: {
            accessKey: 'c79999bf-c4ae-11ee-abf7-02feba6da81d',
            phone: phone,
          },
        })
        .then(response => {
          navigation.navigate(RouteName.OTP_SCREEN, {phone});
          console.log('API Response:', response.data);
          setDisabled(false);
          setButtonLoading(false);
        })
        .catch(error => {
          console.error('API Error:', error);
          setError(error);
          setDisabled(false);
          setButtonLoading(false);
        });
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Gap m7 />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <VectorIcon material-icon name="keyboard-backspace" size={24} />
        </TouchableOpacity>
        <Gap row m5 />
        <View>
          <Gap ms />
          <Text style={[FontStyle.heading]}>LOG IN</Text>
        </View>
      </View>
      <Gap m9 />
      <View style={{flex: 1}}>
        <InputField
          label={'MOBILE NUMBER'}
          autoFocus
          onChangeText={e => setPhone(e)}
          type="phone"
          maxLength={10}
        />
        {error ? (
          <Text style={[FontStyle.label, {color: Apptheme.color.red}]}>
            {error}
          </Text>
        ) : null}
      </View>
      <View>
        <AddButton
          disabled={disabled}
          label={'NEXT'}
          image={Images.pngImages.longArrowNext}
          onPress={handleButtonClick}
          loader={buttonLoading}
        />
      </View>
    </View>
  );
};

export default MobileNumberScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Apptheme.color.background,
    padding: Apptheme.spacing.innerContainer,
  },
  headerContainer: {
    // height: Apptheme.spacing.headerHeight,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});
