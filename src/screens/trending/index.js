import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Apptheme from '../../assets/theme/apptheme';
import Header from '../../components/atoms/Header';
import Images from '../../assets/images';
import Divider from '../../components/atoms/Divider';
import FontStyle from '../../assets/theme/FontStyle';
import {useGetCollectionsQuery} from '../../redux/Reducer/ComponentsData';
import Gap from '../../components/atoms/Gap';
import AddButton from '../../components/atoms/AddButton';
import {CollectionApi} from '../../apiServices/apiHelper';
import axios from 'axios';

const Trending = () => {
  useEffect(() => {
    CollectionList();
  }, []);

  const CollectionList = async () => {
    const url = CollectionApi();

    console.log('CollectionList', url);
    try {
      const response = await axios.get(url);
      console.log('CollectionList response', response.data);
      if (response.data.status) {
        console.log(response.data?.object);
      }
    } catch (err) {
      console.log('@ HomePageCategoryListing error', err);
    }
  };

  const renderItem = ({item}) => {
    return (
      <ImageBackground
        source={{
          uri: item?.mediaUrl,
        }}
        resizeMode="cover"
        style={{
          // width: Dimensions.get('screen').width,
          width: '100%',
          height: 380,
          justifyContent: 'flex-end',
        }}>
        <View style={{padding: Apptheme.spacing.innerContainer}}>
          {/* <AddButton
            label={'SHOP NOW'}
            image={Images.pngImages.longArrowNext}
          /> */}
        </View>
      </ImageBackground>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Apptheme.color.background}}>
      <Header
        label={'SHOP'}
        icon={Images.pngImages.user}
        onPress={''}
        search={true}
      />
      {/* <Divider /> */}

      <View style={{flex: 1, backgroundColor: Apptheme.color.black}}>
        <FlatList
          data={[]}
          renderItem={renderItem}
          style={{flex: 1}}
          ItemSeparatorComponent={<Gap m4 />}
        />
      </View>
    </SafeAreaView>
  );
};

export default Trending;

const styles = StyleSheet.create({});
