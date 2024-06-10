/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Header from '../../components/atoms/Header';
import Images from '../../assets/images';
import Divider from '../../components/atoms/Divider';
import Apptheme from '../../assets/theme/apptheme';
import FontStyle from '../../assets/theme/FontStyle';

import Gap from '../../components/atoms/Gap';

import FirstScreen from './components/FirstScreen';

import {Tabs} from 'react-native-collapsible-tab-view';
import PagerView from 'react-native-pager-view';
import {useGetAppTemplateQuery} from '../../redux/Reducer/Api';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import RouteName from '../../navigation/RouteName';
import {
  useGetHomePageCategoryDataQuery,
  useGetSomeDataQuery,
  useGetdummydataQuery,
} from '../../redux/Reducer/ComponentsData';
import {ActivityIndicator} from 'react-native-paper';
import {
  ConfigurationStore,
  HomeCategoryProduct,
  HomePageCategoryListing,
  StoreDetail,
  subCategoryWiseList,
} from '../../apiServices/apiHelper';
import axios from 'axios';
import Loader from '../../components/atoms/Loader';
import AxiosInstance from '../../apiServices/AxiosInstance';
import {useDispatch, useSelector} from 'react-redux';
import {addStoreData, addUserData} from '../../redux/Reducer/login/LoginSlice';

const HomeScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const [categoryData, setCategoryData] = useState([]);
  const [subCategoriesData, setSubCategoriesData] = useState([]);
  const [storeData, setStoreData] = useState();
  const isFocused = useIsFocused();
  const user = useSelector(state => state.loginReducer.user);
  const [loading, setLoading] = useState(true);
  const [configurationData, setConfigurationData] = useState();
  const scrollRef = useRef();

  const dispatch = useDispatch();
  useEffect(() => {
    fetchHomeCategory();
    fetchCategory();
    detailStore();
    configuration();
  }, []);

  const fetchHomeCategory = async () => {
    setLoading(true);
    const url = HomePageCategoryListing();
    try {
      const response = await axios.get(url);
      console.log('HomePageCategoryListing response', response.data);
      if (response.data.status) {
        setCategoryData(response.data?.object);
        setLoading(false);
        // fetchHomeSubCategory(response.data.object[activeIndex]?.id);
      }
      setLoading(false);
    } catch (err) {
      console.log('@ HomePageCategoryListing error', err);
      setLoading(false);
    }
  };

  const configuration = async () => {
    setLoading(true);
    const url = ConfigurationStore();
    try {
      const response = await axios.get(url);
      console.log('ConfigurationStore response', JSON.stringify(response.data));
      if (response.data.status) {
        const headerSection = response.data.object?.find(
          section => section?.section?.name === 'Header',
        );
        console.log('header section', headerSection);

        if (headerSection) {
          const logoUrlSubSection = headerSection?.subSectionList?.find(
            subSection => subSection?.name === 'logoUrl',
          );
          setConfigurationData(logoUrlSubSection);
          console.log('LOGO URL', logoUrlSubSection);
          // if (logoUrlSubSection) {
          //   return logoUrlSubSection;
          // }
        }
      }
    } catch (err) {
      console.log('@ ConfigurationStore error', err);
    }
  };

  console.log('categoryData', JSON.stringify(configurationData));

  const fetchCategory = async () => {
    setLoading(true);

    console.log('helloooo');
    const url = HomeCategoryProduct();
    try {
      const response = await (!user.isLogin ? axios : AxiosInstance).get(url);
      console.log('fetchCategory response', response.data);
      if (response.data.status) {
        setSubCategoriesData(response.data?.object);
        setLoading(false);
      }
      setLoading(false);
    } catch (err) {
      console.log('@ subCategoryWiseList error', err);
      setLoading(false);
    }
  };

  const detailStore = async () => {
    console.log('helloooo');
    const url = StoreDetail();
    try {
      const response = await axios.get(url);
      console.log('detailStore response', response.data);
      if (response.data.status) {
        setStoreData(response.data.object);
        console.log('detailStore', response.data.object);
        dispatch(addStoreData(response.data.object));
      }
    } catch (err) {
      console.log('@ subCategoryWiseList error', err);
    }
  };

  // export const storeData = () => storeData?.supplierUuid

  console.log('subCategoriesData', storeData);

  const subCategorydata = Object.entries(subCategoriesData).map(
    ([key, value]) => ({
      name: key,
      products: value.products,
    }),
  );

  console.log('subCategorydata', JSON.stringify(subCategorydata));

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[
          styles.tabContainer,
          {borderBottomWidth: activeIndex == index ? 2 : 0},
        ]}
        onPress={() => {
          // setSubCategoriesData([]);
          scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
          });
          flatListRef.current?.scrollToIndex({
            animated: true,
            index: index == 0 ? index : index - 1,
          });
          setActiveIndex(index);
          // fetchHomeSubCategory(item?.id);
        }}>
        <Text style={[FontStyle.headingSmall, {fontSize: 13}]}>
          {item?.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const RenderHeader = () => (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate(RouteName.SEARCH)}
        style={styles.searchContainer}>
        <Image
          source={Images.pngImages.search}
          style={{height: 23, width: 23}}
        />
        <Gap row m7 />
        <Text style={[FontStyle.label, {color: Apptheme.color.lightColor}]}>
          Find Products...
        </Text>
      </TouchableOpacity>
      <Divider />
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor="#fff" />
      <View style={{position: 'absolute', top: 0, width: '100%', zIndex: 100}}>
        <Header image={configurationData?.value} />
        <Divider />
      </View>

      <View style={{height: 56}}></View>

      <Tabs.Container
        pagerProps={{scrollEnabled: false}}
        headerContainerStyle={{elevation: 0}}
        renderHeader={RenderHeader}
        revealHeaderOnScroll={true}
        renderTabBar={() => (
          <>
            <FlatList
              data={categoryData}
              horizontal
              ref={flatListRef}
              // scrollEnabled={false}
              renderItem={(item, index) => renderItem(item, index)}
              // style={{paddingLeft: Apptheme.spacing.innerContainer}}
            />
          </>
        )}>
        <Tabs.Tab name="MEN">
          <View style={{flex: 1}}>
            {categoryData.length == 0 ? (
              <Tabs.ScrollView
                style={{
                  flex: 1,
                }}
                scrollEnabled={false}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Loader />
                </View>
              </Tabs.ScrollView>
            ) : categoryData[activeIndex]?.bannerUrl == null &&
              categoryData[activeIndex]?.subCategories?.length == 0 ? (
              <Tabs.ScrollView>
                <View
                  style={{
                    height: Dimensions.get('screen').height - 220,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={[FontStyle.heading]}>NO SUBCATEGORY</Text>
                </View>
              </Tabs.ScrollView>
            ) : (
              <FirstScreen
                data={categoryData[activeIndex] ?? undefined}
                subCategoryQuery={subCategorydata}
                scrollRef={scrollRef}
                fetchHomeCategory={fetchHomeCategory}
                fetchCategory={fetchCategory}
                loading={loading}
              />
            )}
          </View>
        </Tabs.Tab>
      </Tabs.Container>
      <Divider />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: '#fff'},
  searchContainer: {
    height: 54,
    paddingHorizontal: Apptheme.spacing.innerContainer,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerContainer: {height: 200},
  tabContainer: {
    paddingHorizontal: 15,
    paddingVertical: 14,

    borderColor: Apptheme.color.text,
  },
});
