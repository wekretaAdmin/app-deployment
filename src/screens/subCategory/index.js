import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Apptheme from '../../assets/theme/apptheme';
import Divider from '../../components/atoms/Divider';
import {useRoute} from '@react-navigation/native';
import FontStyle from '../../assets/theme/FontStyle';
import Images from '../../assets/images';
import ProductHeader from '../../components/atoms/ProductHeader';
import Gap from '../../components/atoms/Gap';
import SubCategoryContainer from '../../components/atoms/SubCategoryContainer';

const SubCategory = () => {
  const route = useRoute();

  const data = route.params?.data;
  const title = route.params?.label;

  return (
    <View style={{flex: 1, backgroundColor: Apptheme.color.background}}>
      <ProductHeader name={title} />

      <SubCategoryContainer data={data} />
    </View>
  );
};

export default SubCategory;

const styles = StyleSheet.create({});
