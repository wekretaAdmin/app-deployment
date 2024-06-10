import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Apptheme from '../../assets/theme/apptheme';
import FontStyle from '../../assets/theme/FontStyle';
import Gap from '../atoms/Gap';
import Images from '../../assets/images';
import HomeListHeader from '../atoms/HomeListHeader';
import HomeListContainer from '../atoms/HomeListContainer';

const HomeProductList = ({
  title,
  SeeAll,
  header = true,
  paddingHorizontal,
  products,
}) => {
  return (
    <View>
      {header ? (
        <>
          <HomeListHeader title={title} SeeAll={SeeAll} />
          <Gap m5 />
        </>
      ) : (
        <Gap m3 />
      )}

      <HomeListContainer
        paddingHorizontal={paddingHorizontal}
        products={products}
      />
      <Gap m7 />
    </View>
  );
};

export default HomeProductList;

const styles = StyleSheet.create({});
