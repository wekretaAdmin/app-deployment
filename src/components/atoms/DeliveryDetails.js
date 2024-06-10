import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FontStyle from '../../assets/theme/FontStyle';
import Gap from './Gap';

const DeliveryDetails = ({label, image}) => {
  return (
    <View style={styles.mainContainer}>
      <View>
        {image ? (
          <Image
            source={image}
            style={{height: 15, width: 15, resizeMode: 'contain'}}
          />
        ) : null}
      </View>
      <Gap row m3 />
      <Text style={[FontStyle.label, {fontSize: 11}]}>{label}</Text>
    </View>
  );
};

export default DeliveryDetails;

const styles = StyleSheet.create({
  mainContainer: {flexDirection: 'row', alignItems: 'flex-start', width: '90%'},
});
