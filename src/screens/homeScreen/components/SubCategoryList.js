/* eslint-disable react/no-unstable-nested-components */
import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import ProductHeader from '../../../components/atoms/ProductHeader';
import Apptheme from '../../../assets/theme/apptheme';
import CategoryTextContainer from '../../../components/atoms/CategoryTextContainer';
import RouteName from '../../../navigation/RouteName';
import Divider from '../../../components/atoms/Divider';
import Gap from '../../../components/atoms/Gap';

const SubCategoryList = () => {
  const route = useRoute();
  const data = route.params?.data;
  console.log('data', data);

  const RenderItem = ({item, index}) => {
    return (
      <>
        <CategoryTextContainer
          label={item?.name}
          icon={item?.mediaUrl}
          screenName={RouteName.SUB_CATEGORY}
          data={item?.subSubCategories}
        />
        {data.length - 1 == index ? (
          <>
            <Divider />
            <Gap m9 />
            <Gap m9 />
          </>
        ) : null}
      </>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: Apptheme.color.background}}>
      <ProductHeader name={'Category'} />
      <Divider />
      <FlatList
        data={data}
        renderItem={({item, index}) => <RenderItem item={item} index={index} />}
        ItemSeparatorComponent={<Divider />}
      />
    </View>
  );
};

export default SubCategoryList;

const styles = StyleSheet.create({});
