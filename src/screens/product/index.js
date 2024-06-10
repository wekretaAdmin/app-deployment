/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontStyle from '../../assets/theme/FontStyle';
import Apptheme from '../../assets/theme/apptheme';
import Images from '../../assets/images';
import Divider from '../../components/atoms/Divider';
import Gap from '../../components/atoms/Gap';
import ProductListHeader from '../../components/atoms/ProductListHeader';
import ProductListFilter from '../../components/atoms/ProductListFilter';
import ProductListCard from '../../components/molecules/ProductListCard';
import {Tab, Tabs} from 'react-native-collapsible-tab-view';
import {ActivityIndicator, shadow} from 'react-native-paper';
import {useGetProductListQuery} from '../../redux/Reducer/ComponentsData';
import {useRoute} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import Loader from '../../components/atoms/Loader';
import VectorIcon from '../../assets/vectorIcon';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import AddButton from '../../components/atoms/AddButton';
import {ProductListApi, brand} from '../../apiServices/apiHelper';
import axios from 'axios';
import {useSelector} from 'react-redux';
import AxiosInstance from '../../apiServices/AxiosInstance';

const Product = ({}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [brandData, setBrandData] = useState([]);
  const [totalItems, setTotalItem] = useState();
  const [loadmore, setLoadmore] = useState(false);
  const [sortBySelect, setSortBySelect] = useState();
  const [sortByItem, setSortByItem] = useState('');
  const [sortOrderItem, setSortOrderItem] = useState('');
  const [brandSelect, setBrandSelect] = useState();
  const [brandId, setBrandId] = useState();

  const user = useSelector(state => state.loginReducer.user);

  const [productdata, setProductData] = useState([]);
  const SortBy = [
    {
      label: 'Product - Newest First',
      sortBy: 'createdDate',
      sortOrder: 'desc',
      id: 1,
    },
    {
      label: 'Product - Last First',
      sortBy: 'createdDate',
      sortOrder: 'desc',
      id: 2,
    },
    {
      label: 'Price: Low to High',
      sortBy: 'sellingPrice',
      sortOrder: 'asc',
      id: 3,
    },
    {
      label: 'Price: High to Low',
      sortBy: 'sellingPrice',
      sortOrder: 'desc',
      id: 4,
    },
    {
      label: 'Product: A to Z',
      sortBy: 'name',
      sortOrder: 'asc',
      id: 5,
    },
    {
      label: 'Product: Z to A',
      sortBy: 'name',
      sortOrder: 'desc',
      id: 6,
    },
  ];

  const route = useRoute();
  const search = route.params?.search ?? '';
  const subSubCategoryName = route.params?.name ? route.params?.name : '';
  const categoryName = route.params?.categoryName
    ? route.params?.categoryName
    : '';
  const subCategoryName = route.params?.subCategoryName
    ? route.params?.subCategoryName
    : '';

  const headerTitle = search
    ? search
    : subCategoryName
    ? subCategoryName
    : subSubCategoryName
    ? subSubCategoryName
    : categoryName
    ? categoryName
    : '';

  useEffect(() => {
    productListing(1);
    brandListing();
  }, []);

  const itemsPerPage = 26;
  const productListing = async (currentPage, sortBy, sortOrder, brandName) => {
    console.log('dataaaaaaa', sortBy, sortOrder);
    const itemsPerPage = currentPage == 1 ? 20 : 12;
    setLoading(true);
    const url = ProductListApi(
      subCategoryName,
      subSubCategoryName,
      categoryName,
      currentPage,
      itemsPerPage,
      search,
      sortBy,
      sortOrder,
      brandName,
    );
    console.log('productListing url', url);
    try {
      let response;
      if (user?.isLogin) {
        response = await AxiosInstance.get(url);
      } else {
        response = await axios.get(url);
      }
      console.log('productListing response', response.data);
      if (response.data.status) {
        setTotalItem(response.data?.totalItems);
        if (currentPage == 1) {
          setProductData(response.data?.object);
        } else {
          setProductData(prevData => [...prevData, ...response.data?.object]);
        }
        if (response.data?.object?.length == itemsPerPage) {
          setLoadmore(true);
        } else {
          setLoadmore(false);
        }
        setCurrentPage(currentPage);
      }
      setLoading(false);
    } catch (err) {
      console.log('@ HomePageCategoryListing error', err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const brandListing = async () => {
    const url = brand();
    console.log(url);
    try {
      const response = await axios.get(url);
      console.log('brandListing response', response.data);
      if (response.data.status) {
        setBrandData(response.data.object);
      }
    } catch (err) {
      console.log('@ brand error', err);
    }
  };

  const filterByBrand = brandName => {
    productListing(1, sortByItem, sortOrderItem, brandName);
  };

  console.log('brandData', brandData);

  const [visible, setVisible] = useState(false);

  const SortItem = ({item, index}) => {
    console.log('sortBySelect', sortBySelect);
    return (
      <TouchableOpacity
        onPress={() => {
          console.log('sortBy');
          productListing(1, item.sortBy, item.sortOrder);
          setSortByItem(item.sortBy);

          setSortOrderItem(item.sortOrder);

          setSortBySelect(item.id);
        }}
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            height: 20,
            aspectRatio: 1,
            borderRadius: 360,
            borderWidth: 1,
            borderColor: Apptheme.color.lightColor,
            backgroundColor:
              sortBySelect == item?.id ? Apptheme.color.black : '',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: 8,
              aspectRatio: 1,

              borderRadius: 360,
              backgroundColor: Apptheme.color.background,
            }}
          />
        </View>
        <Gap row m5 />
        <Text
          style={[
            FontStyle.label,
            {color: Apptheme.color.black, fontSize: 14},
          ]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const DiscountList = ({item}) => {
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: Apptheme.color.boxOutline,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 10,
        }}>
        <Text
          style={[
            FontStyle.label,
            {color: Apptheme.color.lightColor, padding: 7},
          ]}>
          {item}%
        </Text>
      </View>
    );
  };
  const BrandList = ({item}) => {
    console.log('BrandList', item);
    const onBrandPress = () => {
      productListing(1, sortByItem, sortOrderItem, item?.name);
      setBrandSelect(item?.name);
      setBrandId(item?.id);
    };
    return (
      <TouchableOpacity
        onPress={onBrandPress}
        style={{
          borderWidth: 1,
          borderColor:
            brandId == item.id
              ? Apptheme.color.black
              : Apptheme.color.boxOutline,

          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 10,
          padding: 7,
          marginBottom: 10,
        }}>
        <Text
          style={[
            FontStyle.label,
            {
              color:
                brandId == item.id
                  ? Apptheme.color.text
                  : Apptheme.color.lightColor,
            },
          ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const clearAll = () => {
    setBrandId('');
    productListing(1, '', '', '');
    setBrandSelect('');
    setSortBySelect('');
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <ProductListHeader title={headerTitle} totalItems={totalItems} />
        <Divider />
      </View>
      <View style={{height: Apptheme.spacing.headerHeight}}></View>

      <ProductListFilter
        data={brandData}
        setVisible={setVisible}
        brandId={brandId}
        setBrandId={setBrandId}
        filterByBrand={filterByBrand}
        setProductData={setProductData}
      />

      {/* <Tabs.Container
        renderHeader={() => (
          <ProductListFilter data={data} setVisible={setVisible} />
        )}
        revealHeaderOnScroll={true}
        headerContainerStyle={{elevation: 0}}
        renderTabBar={() => null}>
        <Tabs.Tab name="n"> */}
      {/* <Divider /> */}

      <ProductListCard
        data={productdata}
        productListing={() => {
          if (loadmore) {
            productListing(currentPage + 1);
          }
        }}
        loading={loading}
        loadmore={loadmore}
        setLoading={setLoading}
        productcall={productListing}
        setProductData={setProductData}
      />

      {/* </Tabs.Tab>
      </Tabs.Container> */}
      <Modal visible={visible} animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: Apptheme.color.background,
            opacity: loading ? 0.4 : 1,
          }}>
          <View style={{flex: 1}}>
            <View
              style={{
                height: Apptheme.spacing.headerHeight,
                flexDirection: 'row',
                paddingHorizontal: Apptheme.spacing.innerContainer,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={clearAll} style={{width: 60}}>
                <Text
                  style={[
                    FontStyle.labelMedium,
                    {textDecorationLine: 'underline'},
                  ]}>
                  Clear All
                </Text>
              </TouchableOpacity>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={[FontStyle.labelMedium, {fontSize: 12}]}>
                  REFINE
                </Text>
                <Gap ms />
                <Text style={[FontStyle.labelMedium, {fontSize: 12}]}>
                  RESULTS{' '}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setVisible(false)}
                style={{
                  width: 60,

                  alignItems: 'flex-end',
                }}>
                <VectorIcon material-icon name="close" size={24} />
              </TouchableOpacity>
            </View>
            <Divider />
            <View style={{padding: 27, paddingVertical: 20}}>
              <Text style={[FontStyle.headingSmall]}>Sort by</Text>
              <Gap m6 />
              <FlatList
                data={SortBy}
                renderItem={({item, index}) => (
                  <SortItem item={item} index={index} />
                )}
                ItemSeparatorComponent={<Gap m5 />}
              />
            </View>
            <Divider />
            <View style={{padding: 27, paddingVertical: 20}}>
              <Text style={[FontStyle.headingSmall]}>Discount</Text>
              <Gap m6 />
              <FlatList
                data={[10, 20, 30, 40, 50, 60, 70, 80]}
                renderItem={DiscountList}
                numColumns={6}
                ItemSeparatorComponent={<Gap m5 />}
              />
            </View>
            <Divider />
            <Divider />
            <View style={{padding: 27, paddingVertical: 20}}>
              <Text style={[FontStyle.headingSmall]}>Brand</Text>
              <Gap m6 />
              {/* <FlatList
                data={brandData}
                renderItem={BrandList}
                // numColumns={6}
                horizontal
                style={{flexWrap: 'wrap'}}
                ItemSeparatorComponent={<Gap m5 />}
              /> */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}>
                {brandData?.map((item, index) => (
                  <BrandList item={item} index={index} />
                ))}
              </View>
            </View>
            <Divider />
          </View>
          <View style={{padding: Apptheme.spacing.innerContainer}}>
            <AddButton
              label={`${totalItems} RSULTS`}
              image={Images.pngImages.longArrowNext}
              onPress={() => setVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {flex: 1, backgroundColor: Apptheme.color.background},
  headerContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 100,
    backgroundColor: Apptheme.color.background,
  },
});
