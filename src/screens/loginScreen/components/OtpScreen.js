import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Gap from '../../../components/atoms/Gap';
import {useNavigation, useRoute} from '@react-navigation/native';
import VectorIcon from '../../../assets/vectorIcon';
import FontStyle from '../../../assets/theme/FontStyle';
import InputField from '../../../components/atoms/inputField';
import AddButton from '../../../components/atoms/AddButton';
import Images from '../../../assets/images';
import Apptheme from '../../../assets/theme/apptheme';
import RouteName from '../../../navigation/RouteName';
import {useGetMobileVerificationQuery} from '../../../redux/Reducer/Api';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {
  addPhonenumber,
  addUserData,
  cardId,
} from '../../../redux/Reducer/login/LoginSlice';
import {GetCard, MergeCart} from '../../../apiServices/apiHelper';
import OTPTextView from 'react-native-otp-textinput';

const OtpScreen = () => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState();
  const route = useRoute();
  const dispatch = useDispatch();
  const user = useSelector(state => state.loginReducer.user);
  const [otpSent, setOtpSent] = useState(false); // State to track whether OTP is sent
  const [resendButtonVisible, setResendButtonVisible] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);

  const [countdown, setCountdown] = useState(30);

  console.log(user?.cardId);
  const secondaryKey = user?.cardId;

  console.log('otp123', otp);

  const handleButtonClick = () => {
    setButtonLoading(true);
    axios
      .get('https://accountstaging.krenai.in/api/v4/customer/login', {
        params: {
          accessKey: 'c79999bf-c4ae-11ee-abf7-02feba6da81d',
          otp: otp,
          phone: route.params?.phone,
        },
      })
      .then(response => {
        dispatch(addUserData(response.data));
        dispatch(addPhonenumber(route.params?.phone));
        // navigation.navigate(RouteName.HOME_SCREEN);
        if (secondaryKey == '') {
          CartProduct(response.data.object?.idToken);
        } else {
          console.log('OTP api Response:', response.data);
          mergeProduct(response.data.object?.idToken);
        }
      })
      .catch(error => {
        console.error('API Error:', error);
      });
  };

  const resendOtp = () => {
    axios
      .get('https://accountstaging.krenai.in/api/v4/customer/otp', {
        params: {
          accessKey: 'c79999bf-c4ae-11ee-abf7-02feba6da81d',
          phone: route.params?.phone,
        },
      })
      .then(response => {
        setResendButtonVisible(false); // Hide the Resend OTP button
        setCountdown(30);
        console.log('API Response:', response.data);
      })
      .catch(error => {
        console.error('API Error:', error);
      });
  };

  const mergeProduct = async token => {
    const url = MergeCart(secondaryKey);
    console.log(url, 'IDTOKEN', token);
    try {
      const response = await axios.patch(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('merge cart api respone', response.data);
      if (response.data.status) {
        console.log('mergeProduct', response.data?.object);
        setButtonLoading(false);

        CartProduct(token);
      }
    } catch (err) {
      setButtonLoading(false);

      console.log('@ merge cart api respone error', err);
    }
  };

  const CartProduct = async token => {
    const url = GetCard();
    console.log(url);
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('login CartProduct api respone', response.data);
      if (response.data.status) {
        console.log('cartProduct', response.data?.object);
        if (response.data?.object?.secondaryKey) {
          dispatch(cardId(response.data?.object?.secondaryKey));
        }
        navigation.navigate(RouteName.HOME_SCREEN);
        setButtonLoading(false);
      }
    } catch (err) {
      setButtonLoading(false);
      ToastAndroid.show('OTP is not Correct', 200);
      console.log('@ login CartProduct api respone error', err);
    }
  };

  useEffect(() => {
    let timer;
    if (!resendButtonVisible && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);
    }
    if (countdown < 1) {
      setResendButtonVisible(true);
    }
    return () => clearInterval(timer);
  }, [resendButtonVisible, countdown]);

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
          <Text style={[FontStyle.heading]}>OTP VERIFICATION</Text>
          <Gap m3 />
          <Text style={[FontStyle.label]}>
            Enter OTP sent to {route.params?.phone}
          </Text>
        </View>
      </View>
      <Gap m9 />
      <View style={{flex: 1}}>
        {/* <InputField
          label={'OTP VEARIFICATION'}
          onChangeText={e => setOtp(e)}
          autoFocus
          type={'phone'}
        /> */}

        <OTPTextView
          // ref={input}

          containerStyle={styles.textInputContainer}
          handleTextChange={setOtp}
          // handleCellTextChange={handleCellTextChange}
          inputCount={6}
          keyboardType="numeric"
          autoFocus={true}
          tintColor={Apptheme.color.black}
        />

        <Gap m9 />
        <Text style={[FontStyle.label]}>
          Didn't you receive OTP?{' '}
          {resendButtonVisible ? (
            <Text
              onPress={resendOtp}
              style={[
                FontStyle.headingSmall,
                {fontSize: 12, textDecorationLine: 'underline'},
              ]}>
              RESEND OTP
            </Text>
          ) : (
            <Text style={[FontStyle.headingSmall]}> {countdown} sec</Text>
          )}
        </Text>
      </View>
      <View>
        <AddButton
          label={'CONFIRM'}
          image={Images.pngImages.longArrowNext}
          onPress={handleButtonClick}
          loader={buttonLoading}
        />
      </View>
    </View>
  );
};

export default OtpScreen;

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
