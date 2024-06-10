/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CategoryTextContainer from '../../../../components/atoms/CategoryTextContainer';
import Divider from '../../../../components/atoms/Divider';
import Images from '../../../../assets/images';
import Gap from '../../../../components/atoms/Gap';
import HomeProductList from '../../../../components/molecules/HomeProductList';
import Apptheme from '../../../../assets/theme/apptheme';
import RouteName from '../../../../navigation/RouteName';
import {Tabs} from 'react-native-collapsible-tab-view';
import FastImage from 'react-native-fast-image';
import FontStyle from '../../../../assets/theme/FontStyle';
import {useNavigation} from '@react-navigation/native';
import VectorIcon from '../../../../assets/vectorIcon';

const FirstScreen = ({
  data,
  subCategoryQuery,
  scrollRef,
  fetchHomeCategory,
  fetchCategory,
  loading,
}) => {
  const navigation = useNavigation();

  const subCategoryList = ({item}) => {
    return (
      <>
        <Gap m9 />
        <HomeProductList title={item.name} products={item.products} />
      </>
    );
  };

  const renderItem = ({item}) => {
    return (
      <CategoryTextContainer
        label={item?.name}
        icon={item?.mediaUrl}
        screenName={RouteName.SUB_CATEGORY}
        data={item?.subSubCategories}
      />
    );
  };

  console.log('mobileBannerUrl', data?.mobileBannerUrl);
  return (
    <View>
      <Tabs.ScrollView
        ref={scrollRef}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              fetchHomeCategory();
              fetchCategory();
            }}
            progressViewOffset={110}
          />
        }
        overScrollMode="never">
        {data?.mobileBannerUrl ? (
          <>
            <View style={styles.bannerContainer}>
              <FastImage
                source={{uri: data?.mobileBannerUrl}}
                style={{height: '100%', width: '100%'}}
                resizeMode="cover"
                onLoadStart={() => {
                  return <ActivityIndicator size={20} />;
                }}
              />
            </View>
            <Gap m5 />
          </>
        ) : null}
        <View style={{height: data?.subCategories.length > 3 ? 300 : null}}>
          <FlatList
            data={data?.subCategories}
            renderItem={renderItem}
            ItemSeparatorComponent={<Divider />}
          />
        </View>

        {data?.subCategories.length ? (
          <>
            <Divider />
            {/* <Gap m4 /> */}
          </>
        ) : null}
        {data?.subCategories.length > 3 ? (
          <>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(RouteName.SUBCATEGORYLIST, {
                  data: data?.subCategories,
                })
              }
              style={{
                height: 50,
                flexDirection: 'row',

                alignItems: 'center',

                paddingHorizontal: Apptheme.spacing.categoryContainer,
              }}>
              <View style={{flex: 1}}>
                <Text style={[FontStyle.heading, {fontStyle: 'italic'}]}>
                  Explore all
                </Text>
              </View>
              <View style={{height: 22, width: 22}}>
                <Image
                  source={Images.pngImages.longArrowNext}
                  style={{height: '100%', width: '100%'}}
                />
              </View>
            </TouchableOpacity>
            <Divider />
          </>
        ) : null}

        <FlatList data={subCategoryQuery} renderItem={subCategoryList} />
      </Tabs.ScrollView>
    </View>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: '#fff'},
  searchContainer: {
    height: Apptheme.spacing.container,
    paddingHorizontal: Apptheme.spacing.innerContainer,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerContainer: {height: 200},
  seeMore: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
