import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Apptheme from '../../../../../assets/theme/apptheme';
import AddButton from '../../../../../components/atoms/AddButton';
import Images from '../../../../../assets/images';
import FontStyle from '../../../../../assets/theme/FontStyle';
import Gap from '../../../../../components/atoms/Gap';
import {useNavigation, useRoute} from '@react-navigation/native';
import RouteName from '../../../../../navigation/RouteName';
import LinearGradient from 'react-native-linear-gradient';

const Review = () => {
  const route = useRoute();
  const data = route.params?.item;
  const navigation = useNavigation();
  console.log(data);
  return (
    <LinearGradient
      colors={['#ffffff', '#c7c7c7', 'rgba(0,0,0,0.4)']}
      style={styles.maincontainer}>
      <View style={{flex: 1}}>
        <View
          style={{
            paddingTop: 48,
            alignItems: 'center',
            alignSelf: 'center',

            width: 240,
          }}>
          <Text
            style={[
              FontStyle.headingLarge,
              {fontSize: 68, fontStyle: 'italic', fontWeight: '700'},
            ]}>
            RATE & REVIEW
          </Text>
        </View>
        <View
          style={{
            height: 130,
            aspectRatio: 1,
            backgroundColor: Apptheme.color.background,
            zIndex: 3,
            alignSelf: 'center',
            marginTop: -25,
            elevation: 6,
          }}>
          <Image
            source={{uri: data?.mediaUrl}}
            style={{height: '100%', width: '100%'}}
          />
        </View>
        <Gap m9 />
        <Gap m5 />
        <View style={{alignSelf: 'center', width: 250}}>
          <Text style={[FontStyle.heading, {textAlign: 'center'}]}>
            {data?.name}
          </Text>
          <Gap m8 />
          <Text style={[FontStyle.label, {textAlign: 'center', fontSize: 14}]}>
            How do yor like your new gear? Write a review and receive 50 adiClub
            point in return.
          </Text>
        </View>
      </View>
      <View>
        <AddButton
          label={'WRITE A REVIEW'}
          image={Images.pngImages.longArrowNext}
          onPress={() => navigation.navigate(RouteName.RATING_SCREEN, {data})}
        />
      </View>
      <Gap m5 />
    </LinearGradient>
  );
};

export default Review;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: Apptheme.color.background,
    padding: Apptheme.spacing.innerContainer,
  },
});
