import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Apptheme from '../../assets/theme/apptheme';
import {useNavigation} from '@react-navigation/native';
import Images from '../../assets/images';
import FontStyle from '../../assets/theme/FontStyle';
import Divider from '../../components/atoms/Divider';
import Gap from '../../components/atoms/Gap';
import {OpenSearch} from '../../apiServices/apiHelper';
import axios from 'axios';
import VectorIcon from '../../assets/vectorIcon';
import RouteName from '../../navigation/RouteName';

const Search = () => {
  const navigation = useNavigation();
  const [input, setInput] = useState('');
  const [data, setData] = useState();
  const onPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (input?.length > 2) {
      GetSearch(input);
    }
  }, [input]);

  const GetSearch = async tags => {
    console.log('abcdwrd');
    const url = OpenSearch(tags);
    console.log(url);
    try {
      const response = await axios.get(url);
      console.log('HomePageCategoryListing response', response.data);
      if (response.data.status) {
        setData(response.data?.object);
      }
    } catch (err) {
      console.log('@ HomePageCategoryListing error', err);
    }
  };

  const renderItem = ({item}) => {
    return (
      <>
        <TouchableOpacity
          style={{
            height: 44,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',

            paddingHorizontal: Apptheme.spacing.innerContainer,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <VectorIcon material-icon name="search" size={20} />
            <Gap row m3 />
            <Text style={[FontStyle.labelMedium]}>{item}</Text>
          </View>
          <View>
            <VectorIcon name="arrow-forward-ios" material-icon size={20} />
          </View>
        </TouchableOpacity>
        <Divider />
      </>
    );
  };

  const listItem = ({item}) => {
    const onPress = () => {
      navigation.navigate(RouteName.PRODUCT, {search: item});
    };
    return (
      <>
        <TouchableOpacity
          onPress={onPress}
          style={{
            height: 44,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',

            paddingHorizontal: Apptheme.spacing.innerContainer,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <VectorIcon material-icon name="search" size={20} />
            <Gap row m3 />
            <Text style={[FontStyle.labelMedium]}>{item}</Text>
          </View>
          <View>
            <VectorIcon name="arrow-forward-ios" material-icon size={20} />
          </View>
        </TouchableOpacity>
        <Divider />
      </>
    );
  };

  const onSubmit = () => {
    if (input == '') {
      ToastAndroid.show('search input is blank', 200);
    } else {
      navigation.navigate(RouteName.PRODUCT, {search: input});
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={onPress}>
          <View style={{height: 20, width: 20, transform: 'rotate(180deg)'}}>
            <Image
              source={Images.pngImages.arrowNext}
              style={{height: '100%', width: '100%'}}
            />
          </View>
        </TouchableOpacity>
        <Gap row m5 />
        <TextInput
          placeholder="FIND PRODUCTS"
          placeholderTextColor={Apptheme.color.lightColor}
          style={[FontStyle.label, {flex: 1}]}
          autoFocus
          onChangeText={e => setInput(e)}
          cursorColor={Apptheme.color.text}
          onSubmitEditing={onSubmit}
        />
      </View>
      <Divider />
      <View style={{}}>
        <FlatList data={data?.collection} renderItem={renderItem} />
        <FlatList data={data?.keyword} renderItem={listItem} />
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: Apptheme.color.background},
  searchContainer: {
    height: Apptheme.spacing.headerHeight,
    paddingHorizontal: Apptheme.spacing.innerContainer,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
