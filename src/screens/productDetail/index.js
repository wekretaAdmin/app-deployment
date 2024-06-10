/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import FontStyle from '../../assets/theme/FontStyle';
import Carousel from 'react-native-snap-carousel';
import {FlatList} from 'react-native-gesture-handler';
import Gap from '../../components/atoms/Gap';
import {Tabs} from 'react-native-collapsible-tab-view';
import Apptheme from '../../assets/theme/apptheme';
import Divider from '../../components/atoms/Divider';
import Images from '../../assets/images';
import HomeProductList from '../../components/molecules/HomeProductList';
import {useNavigation, useRoute} from '@react-navigation/native';
import PagerView from 'react-native-pager-view';
import DetailScreen from './components/DetailScreen';
import {
  useGetProductDetailsQuery,
  useGetSimilarProductsQuery,
} from '../../redux/Reducer/ComponentsData';
import {
  AddToCart,
  ProductDetailApi,
  SimilarProductsDetailScreen,
} from '../../apiServices/apiHelper';
import axios from 'axios';
import Loader from '../../components/atoms/Loader';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import VectorIcon from '../../assets/vectorIcon';
import AddButton from '../../components/atoms/AddButton';
import RouteName from '../../navigation/RouteName';
import {useDispatch, useSelector} from 'react-redux';
import {cardId} from '../../redux/Reducer/login/LoginSlice';
import FastImage from 'react-native-fast-image';

const ProductDetail = () => {
  const [active, setActive] = useState();
  const [ProductApi, setProductApi] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [similarProductApi, setSimilarProductsApi] = useState([]);
  const route = useRoute();
  const bottomSheetModalRef = useRef(null);
  const [cartData, setCartData] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.loginReducer.user);
  const ScrollRef = useRef();
  const [firstVarient, setFirstVarient] = useState({
    variantType: '',

    value: '',
  });
  const [secondVarient, setSecondVarient] = useState({
    variantType: '',

    value: '',
  });
  const [selectVarient, setSelectVarient] = useState();

  const productId = route.params?.id;

  const detailQuery = useGetProductDetailsQuery({productId});

  const navigation = useNavigation();
  const onPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    productDetails();
    SimilarProducts();
  }, [productId]);

  const productDetails = async () => {
    const url = ProductDetailApi(productId);
    console.log('url1234', url);
    try {
      const response = await axios.get(url);
      console.log('productDetail response', response.data);
      if (response.data.status) {
        setProductApi(response.data?.object);
        setSelectVarient(response.data?.object?.productListings[0]);
        const firstVarientIndex =
          response.data?.object?.productListings[0]?.variantValues?.findIndex(
            elem =>
              elem?.variantType ==
              response.data?.object?.variantMatrix[0]?.variantType,
          );
        const secondVarientIndex =
          response.data?.object?.productListings[0]?.variantValues?.findIndex(
            elem =>
              elem?.variantType ==
              response.data?.object?.variantMatrix[1]?.variantType,
          );
        if (response.data?.object?.variantMatrix[0]) {
          setFirstVarient({
            variantType:
              response.data?.object?.productListings[0]?.variantValues[
                firstVarientIndex
              ]?.variantType,
            value:
              response.data?.object?.productListings[0]?.variantValues[
                firstVarientIndex
              ]?.variantValue,
          });
        }
        if (response.data?.object?.variantMatrix[1]) {
          setSecondVarient({
            variantType:
              response.data?.object?.productListings[0]?.variantValues[
                secondVarientIndex
              ]?.variantType,
            value:
              response.data?.object?.productListings[0]?.variantValues[
                secondVarientIndex
              ]?.variantValue,
          });
        }
        ScrollRef.current?.scrollTo({y: 0, animated: true});
      }
    } catch (err) {
      console.log('@ productDetails error', err);
    }
  };

  console.log('ProductApiuser.cardId', user);

  const AddCart = async () => {
    const url = AddToCart();
    console.log(url);
    setButtonLoading(true);
    try {
      const body = {
        skuCode: selectVarient?.skuCode,
        isAdding: 1,
        orderSource: 'APP',
        secondaryKey: user.cardId == '' ? '' : user.cardId,
        browser: '',
        deviceType: 'mobile',
        os: 'android',
      };

      const response = await axios.post(url, body);
      console.log('productDetail response', response.data);
      if (response.data.status) {
        setCartData(response.data?.object);
        onAdded();
        if (user.cardId == '' && response.data?.object?.secondaryKey) {
          dispatch(cardId(response.data?.object?.secondaryKey));
        }
        setButtonLoading(false);
      } else {
        setErrorMessage(response.data?.message);
        setButtonLoading(false);
      }
    } catch (err) {
      console.log('@ HomePageCategoryListing error', err);
    }
  };

  console.log('setSimilarProductsApi', JSON.stringify(similarProductApi));

  const SimilarProducts = async () => {
    const url = SimilarProductsDetailScreen(productId);
    console.log(url);
    try {
      const response = await axios.get(url);
      console.log('productDetail response', response.data);
      if (response.data.status) {
        setSimilarProductsApi(response.data?.object);
      }
    } catch (err) {
      console.log('@ HomePageCategoryListing error', err);
    }
  };

  const BackDrop = useCallback(
    props => (
      <BottomSheetBackdrop {...props} opacity={1} disappearsOnIndex={-1} />
    ),
    [],
  );

  const modifiedArray = similarProductApi?.map(item => ({
    id: item.id,
    inWishlist: item.inWishlist,
    mediaUrl: item.mediaUrl,
    mrp: item.variants[0].mrp,
    name: item.name,
    sellingPrice: item.variants[0].sellingPrice,
  }));

  console.log('ProductApi', ProductApi);

  const productQuery = detailQuery.data?.productListings[0];

  const onAdded = () => {
    bottomSheetModalRef.current?.present();
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        {/* <Text style={styles.text}>{item.title}</Text> */}
        <FastImage
          source={{uri: item}}
          style={{height: '100%', width: '100%'}}
          resizeMode="contain"
        />
        {/* <Image source={{uri: item}} style={{height: '100%', width: '100%'}} /> */}
      </View>
    );
  };

  const listItem = ({item, index}) => {
    return (
      <View
        style={[styles.CarouselStatus, {height: active == index ? 10 : 1.3}]}
      />
    );
  };

  const renderTabBar = () => {
    return (
      <>
        <View style={{paddingHorizontal: Apptheme.spacing.innerContainer}}>
          <Gap m4 />
          <Text style={FontStyle.heading}>
            {ProductApi?.name ? ProductApi?.name : null}
          </Text>
          <Gap m4 />
          <View style={{flexDirection: 'row'}}>
            <Text style={[FontStyle.labelMedium, {fontSize: 13}]}>
              ₹ {selectVarient?.sellingPrice.toFixed(2)}
            </Text>
            <Gap row m6 />
            <Text style={[FontStyle.label, {fontSize: 13}]}>
              {ProductApi?.categories.length ? ProductApi?.categories[0] : null}
            </Text>
          </View>
          <Gap m2 />
          {/* <Text style={[FontStyle.label, {fontSize: 12}]}>
            incl. of all taxes
          </Text> */}
        </View>
        <Gap m5 />
        <Divider />
      </>
    );
  };

  if (ProductApi.length == 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Apptheme.color.background,
        }}>
        <Loader />
      </View>
    );
  }
  console.log('selectVarient', selectVarient);

  return (
    <View style={{flex: 1}}>
      {/* <StatusBar translucent backgroundColor="transparent" /> */}
      <Tabs.Container
        pagerProps={{scrollEnabled: false}}
        containerStyle={{backgroundColor: 'white'}}
        headerContainerStyle={{elevation: 0}}
        renderTabBar={renderTabBar}
        headerHeight={400}
        renderHeader={() => (
          <View
            style={{
              height: 400,
              backgroundColor: Apptheme.color.imageBackground,
              justifyContent: 'center',
            }}>
            <Carousel
              data={selectVarient?.mediaUrls}
              renderItem={renderItem}
              sliderHeight={10}
              itemHeight={420}
              sliderWidth={300}
              itemWidth={300}
              vertical={true}
              activeSlideAlignment="start"
              autoplay={false}
              autoplayInterval={3000}
              loop
              onSnapToItem={index => setActive(index)}
            />
            <View style={{position: 'absolute', right: 10, top: 150}}>
              <FlatList
                data={selectVarient?.mediaUrls}
                renderItem={(item, index) => listItem(item, index)}
                ItemSeparatorComponent={<Gap m5 />}
              />
            </View>
            <TouchableOpacity
              onPress={onPress}
              hitSlop={20}
              style={styles.backButtonContainer}>
              <View style={styles.buttonStyles}>
                <Image
                  source={Images.pngImages.arrowNext}
                  style={{height: '100%', width: '100%'}}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
        revealHeaderOnScroll={true}>
        <Tabs.Tab name="-">
          {/* <PagerView style={{flex: 1}} scrollEnabled={false}> */}

          <DetailScreen
            data={ProductApi}
            onPress={AddCart}
            similarQuery={modifiedArray}
            ScrollRef={ScrollRef}
            errorMessage={errorMessage}
            firstVarient={firstVarient}
            secondVarient={secondVarient}
            buttonLoading={buttonLoading}
            setFirstVarient={setFirstVarient}
            setSecondVarient={setSecondVarient}
            setSelectVarient={setSelectVarient}
          />
          {/* </PagerView> */}
        </Tabs.Tab>
      </Tabs.Container>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        style={{backgroundColor: '#fff'}}
        index={0}
        backdropComponent={BackDrop} // Custom backdrop component
        enableDynamicSizing={true}
        onDismiss={() => bottomSheetModalRef.current?.close()}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize">
        <BottomSheetView>
          <View style={{}}>
            <View
              style={{
                // height: 50,
                justifyContent: 'space-between',
                paddingHorizontal: Apptheme.spacing.innerContainer,
                paddingVertical: 15,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={[FontStyle.headingSmall]}>ADDED TO BAG</Text>
              {/* <VectorIcon material-icon name="close" size={22} /> */}
            </View>
            <View
              style={{
                height: 130,
                backgroundColor: Apptheme.color.containerBackground,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{height: 120, aspectRatio: 1}}>
                <Image
                  source={{
                    uri: cartData?.cartProducts[
                      cartData?.cartProducts?.length - 1
                    ].mediaUrl,
                  }}
                  style={{height: '100%', width: '100%'}}
                />
              </View>
              <Gap row m3 />
              <View style={{flex: 1}}>
                <Text style={[FontStyle.headingSmall, {width: '70%'}]}>
                  {
                    cartData?.cartProducts[cartData?.cartProducts?.length - 1]
                      .name
                  }
                </Text>
                <Gap m1 />
                <Text style={[FontStyle.titleSmall]}>
                  ₹ {selectVarient?.sellingPrice.toFixed(2)}
                </Text>
                <Gap m1 />
                <View>
                  <FlatList
                    data={selectVarient?.variantValues}
                    horizontal
                    ItemSeparatorComponent={<Gap row m3 />}
                    renderItem={({item}) => (
                      <Text style={[FontStyle.label]}>
                        {item?.variantType}:{item?.variantValue}
                      </Text>
                    )}
                  />
                </View>
              </View>
            </View>
            <View style={{padding: Apptheme.spacing.innerContainer}}>
              <AddButton
                label={'VIEW BAG'}
                image={Images.pngImages.longArrowNext}
                onPress={() => {
                  navigation.navigate(RouteName.SHOPPING_BAG);
                  bottomSheetModalRef.current?.close();
                }}
              />
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  item: {
    backgroundColor: Apptheme.color.imageBackground,
    justifyContent: 'center',
    alignItems: 'center',
    height: 400, // Adjust as needed
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    color: 'yellow',
  },
  backButtonContainer: {position: 'absolute', top: 20, left: 10},
  buttonStyles: {height: 25, width: 25, transform: 'rotate(180deg)'},
  CarouselStatus: {
    width: 4,
    backgroundColor: 'black',
  },
});
