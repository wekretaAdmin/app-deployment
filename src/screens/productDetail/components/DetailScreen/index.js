/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Tabs} from 'react-native-collapsible-tab-view';
import Gap from '../../../../components/atoms/Gap';
import Apptheme from '../../../../assets/theme/apptheme';
import FontStyle from '../../../../assets/theme/FontStyle';
import Images from '../../../../assets/images';
import Divider from '../../../../components/atoms/Divider';
import HomeProductList from '../../../../components/molecules/HomeProductList';
import AddButton from '../../../../components/atoms/AddButton';
import DeliveryDetails from '../../../../components/atoms/DeliveryDetails';
import {AddToCart} from '../../../../apiServices/apiHelper';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {cardId} from '../../../../redux/Reducer/login/LoginSlice';
import {store} from '../../../../redux/Store';
import WebView from 'react-native-webview';
import AutoHeightWebView from 'react-native-autoheight-webview';

const DetailScreen = ({
  data,
  similarQuery,
  onPress,
  ScrollRef,
  errorMessage,
  firstVarient,
  setFirstVarient,
  secondVarient,
  setSecondVarient,
  setSelectVarient,
  buttonLoading,
}) => {
  const [activeChart, setActiveChart] = useState();

  const sizeItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => setActiveChart(index)}
        style={[
          styles.activeSize,
          {borderBottomWidth: index == activeChart ? 2 : 0},
        ]}
        hitSlop={10}>
        <Text style={FontStyle.label}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const onClick = () => {
    onPress();
  };

  console.log('data123', JSON.stringify(data));

  const renderFirstVariant = ({item}) => {
    console.log('firstVarient?.value', firstVarient);
    const onFirstVarient = () => {
      setFirstVarient(prev => ({...prev, value: item}));
    };
    return (
      <TouchableOpacity
        onPress={onFirstVarient}
        style={{
          paddingHorizontal: 14,
          paddingVertical: 6,
          borderWidth: 1,
          borderColor:
            firstVarient?.value == item
              ? Apptheme.color.black
              : Apptheme.color.boxOutline,
          backgroundColor:
            firstVarient?.value == item ? Apptheme.color.black : null,
        }}>
        <Text
          style={[
            FontStyle.label,
            {
              color:
                firstVarient?.value == item
                  ? Apptheme.color.background
                  : Apptheme.color.subText,
            },
          ]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderSecondVariant = ({item}) => {
    const onSecondVarient = () => {
      setSecondVarient(prev => ({...prev, value: item}));
    };
    return (
      <TouchableOpacity
        onPress={onSecondVarient}
        style={{
          paddingHorizontal: 14,
          paddingVertical: 6,
          borderWidth: 1,
          borderColor:
            secondVarient?.value == item
              ? Apptheme.color.black
              : Apptheme.color.boxOutline,
          backgroundColor:
            secondVarient?.value == item ? Apptheme.color.black : null,
        }}>
        <Text
          style={[
            FontStyle.label,
            {
              color:
                secondVarient?.value == item
                  ? Apptheme.color.background
                  : Apptheme.color.subText,
            },
          ]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const filteredProducts = data?.productListings.filter(product => {
    const firstVarientIndex = product?.variantValues?.findIndex(
      elem => elem.variantType == firstVarient?.variantType,
    );
    const secondVarientIndex = product?.variantValues?.findIndex(
      elem => elem.variantType == secondVarient?.variantType,
    );
    console.log('index of varients', firstVarientIndex, secondVarientIndex);
    if (firstVarient?.value != '' && secondVarient?.value != '') {
      if (
        product.variantValues[firstVarientIndex]?.variantValue ==
          firstVarient?.value &&
        product.variantValues[secondVarientIndex]?.variantValue ==
          secondVarient?.value
      ) {
        setSelectVarient(product);
        return product;
      }
    } else {
      if (
        product.variantValues[firstVarientIndex]?.variantValue ==
        firstVarient?.value
      ) {
        setSelectVarient(product);
        return product;
      }
    }
  });

  console.log('filteredProducts', JSON.stringify(filteredProducts));

  return (
    <Tabs.ScrollView
      onScrollAnimationEnd
      ref={ScrollRef}
      style={{
        backgroundColor: 'white',
      }}>
      <Gap m5 />
      {data?.variantMatrix.length ? (
        <>
          <View style={styles.containerWrap}>
            <Text style={[FontStyle.headingSmall]}>
              {data?.variantMatrix[0]?.variantType}
            </Text>
            <Gap m3 />
            <FlatList
              data={data?.variantMatrix[0]?.variantValues}
              scrollEnabled={false}
              horizontal
              renderItem={renderFirstVariant}
              ItemSeparatorComponent={<Gap row m4 />}
            />
            {data?.variantMatrix[1]?.variantType ? (
              <>
                <Gap m6 />
                <Text style={[FontStyle.headingSmall]}>
                  {data?.variantMatrix[1]?.variantType}
                </Text>
                <Gap m3 />
                <FlatList
                  data={data?.variantMatrix[1]?.variantValues}
                  renderItem={renderSecondVariant}
                  horizontal
                  scrollEnabled={false}
                  ItemSeparatorComponent={<Gap row m4 />}
                />
              </>
            ) : null}
          </View>
          <Gap m8 />

          <Divider />
        </>
      ) : null}
      <Gap m7 />

      <View style={styles.containerWrap}>
        <AddButton
          image={Images.pngImages.addbag}
          label={'ADD TO BAG'}
          onPress={onClick}
          loader={buttonLoading}
        />
      </View>
      {errorMessage == '' ? null : (
        <View style={{paddingHorizontal: Apptheme.spacing.innerContainer}}>
          <Gap m2 />
          <Text style={[FontStyle.label, {color: Apptheme.color.red}]}>
            {errorMessage}
          </Text>
        </View>
      )}
      <Gap m9 />
      <View style={styles.containerWrap}>
        {data?.shippingRate == 0 ? (
          <>
            <DeliveryDetails
              label={'Free Delivery, Free Returns'}
              image={Images.pngImages.delivery}
            />
            <Gap m1 />
          </>
        ) : null}

        <DeliveryDetails
          label={'Delivery within: Metro cities:2-3 days , Others: 4-5 days'}
          image={Images.pngImages.box}
        />

        <Gap m1 />
        <DeliveryDetails
          label={'COD available for orders below ₹5000'}
          image={Images.pngImages.dollar}
        />
        {data?.coolingPeriod == 0 ? null : (
          <>
            <Gap m1 />

            <DeliveryDetails
              label={`Secure transactions with hassle free ${data?.coolingPeriod} days Exchange and Returns`}
              image={Images.pngImages.lock}
            />
          </>
        )}
      </View>
      <Gap m9 />

      {data?.description ? (
        <View
          style={{
            paddingHorizontal: Apptheme.spacing.innerContainer,
            flex: 1,
          }}>
          <AutoHeightWebView
            source={{html: transformHTML(data?.description ?? '')}}
            style={{flex: 1, width: Dimensions.get('window').width - 15}}
          />
        </View>
      ) : null}
      <Gap m8 />

      {similarQuery ? (
        <>
          <View style={{paddingHorizontal: Apptheme.spacing.innerContainer}}>
            <Text style={[FontStyle.headingLarge]}>SIMILAR PRODUCT</Text>
            <Gap m4 />
          </View>
          <HomeProductList
            title={'SAMBA'}
            header={false}
            paddingHorizontal={Apptheme.spacing.innerContainer}
            products={similarQuery}
          />
        </>
      ) : null}
      <Gap m8 />
    </Tabs.ScrollView>
  );
};

export default DetailScreen;

const transformHTML = (content = '') => {
  console.log('content', content);
  return `
		<html>
		<head>
		<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1" />
		<style media="screen" type="text/css">
			* {
				margin: 0
			}
		</style>
		<script>
			function sendHeight() {
				const height = document.getElementById("root").scrollHeight
				window.ReactNativeWebView.postMessage(height);
			}
		</script>
		</head>
		<body>
		<div style="background-color: "#F2F4FC;">
				${content}
			</div>
		</body>
		</html>
	`;
};

const styles = StyleSheet.create({
  sizeContainer: {
    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 0.9,
    borderColor: Apptheme.color.text,
    width: 32,

    height: 17,
  },
  activeSize: {
    paddingHorizontal: 25,
    paddingVertical: 10,

    borderColor: Apptheme.color.text,
  },
  containerWrap: {
    paddingHorizontal: Apptheme.spacing.innerContainer,
  },
});
