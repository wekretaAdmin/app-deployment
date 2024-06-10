import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Apptheme from '../../../../../assets/theme/apptheme';
import {useNavigation, useRoute} from '@react-navigation/native';
import VectorIcon from '../../../../../assets/vectorIcon';
import Gap from '../../../../../components/atoms/Gap';
import FontStyle from '../../../../../assets/theme/FontStyle';
import StarRating from 'react-native-star-rating-widget';
import AddButton from '../../../../../components/atoms/AddButton';
import Images from '../../../../../assets/images';
import {ProductReview} from '../../../../../apiServices/apiHelper';
import AxiosInstance from '../../../../../apiServices/AxiosInstance';
import RouteName from '../../../../../navigation/RouteName';

const Rating = () => {
  const route = useRoute();
  const data = route.params?.data;
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  console.log(rating, data);

  const ReviewApi = async () => {
    const url = ProductReview();
    console.log(url);
    try {
      const body = {
        id: 293,
        productId: data?.productId,
        review: text,
        rating: rating,
        cartProductId: data?.id,
        sku: data?.skuCode,
      };

      const response = await AxiosInstance.post(url, body);
      console.log('productDetail response', response.data);
      if (response.data.status) {
        ToastAndroid.show('Review submitted successfully', 200);
        navigation.navigate(RouteName.ORDER_DETAIL);
      }
    } catch (err) {
      console.log('@ HomePageCategoryListing error', err);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={{flex: 1}}>
        <View style={styles.top}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <VectorIcon
                name="arrow-back-ios"
                material-icon
                size={20}
                color="#fff"
              />
            </TouchableOpacity>
            <VectorIcon
              name="close"
              material-community-icon
              size={20}
              color="#fff"
            />
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: data?.mediaUrl}}
              style={{height: '100%', width: '100%'}}
            />
          </View>
        </View>
        <View style={styles.bottom}>
          <Gap m9 />
          <Gap m9 />
          <Gap m5 />
          <View style={{width: 180, alignSelf: 'center'}}>
            <Text style={[FontStyle.headingSmall, {textAlign: 'center'}]}>
              How woukd you rate this product overall?
            </Text>
          </View>
          <Gap m9 />
          <View style={{alignSelf: 'center'}}>
            <StarRating
              rating={rating}
              onChange={setRating}
              enableHalfStar={false}
            />
          </View>
          <Gap m9 />
          {rating == 0 ? null : (
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="Write a review"
                placeholderTextColor={Apptheme.color.text}
                value={text}
                onChangeText={e => setText(e)}
                maxLength={1500}
                cursorColor={'#444'}
                multiline
                style={{
                  color: Apptheme.color.text,
                }}
              />
            </View>
          )}
        </View>
      </ScrollView>
      {rating == 0 ? null : (
        <View style={styles.buttonContainer}>
          <AddButton
            label={'SAVE'}
            image={Images.pngImages.longArrowNext}
            onPress={() => ReviewApi()}
          />
        </View>
      )}
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  headerContainer: {
    height: Apptheme.spacing.headerHeight,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Apptheme.spacing.innerContainer,
  },
  mainContainer: {flex: 1, backgroundColor: Apptheme.color.background},
  top: {flex: 0.25, backgroundColor: Apptheme.color.black},
  bottom: {flex: 0.8},

  buttonContainer: {padding: Apptheme.spacing.innerContainer},
  textInputContainer: {
    minHeight: 140,
    borderWidth: 1,
    borderColor: Apptheme.color.black,
    margin: Apptheme.spacing.innerContainer,
  },

  imageContainer: {
    height: 110,
    aspectRatio: 1,
    backgroundColor: Apptheme.color.background,
    alignSelf: 'center',
    marginBottom: -18,
    elevation: 5,
  },
});
