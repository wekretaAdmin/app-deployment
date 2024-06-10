import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {BottomSheetModal, BottomSheetScrollView} from '@gorhom/bottom-sheet';

const DynamicModal = ({visible, onClose}) => {
  const scrollViewRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  const handleContentSizeChange = (width, height) => {
    setContentHeight(height);
  };

  return (
    <BottomSheetModal
      ref={scrollViewRef}
      snapPoints={['25%', '50%', '75%', contentHeight + 100]}
      index={0}
      animateOnMount={true}
      handleComponent={() => null}
      backgroundComponent={() => (
        <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)'}} />
      )}
      dismissOnPanDown={true}
      handleHeight={30}
      onClose={onClose}>
      <BottomSheetScrollView onContentSizeChange={handleContentSizeChange}>
        {/* Your dynamic content here */}
        <View style={{padding: 16}}>
          <Text>Dynamic Modal Content</Text>
          <TextInput
            style={{borderWidth: 1, borderColor: '#ccc', padding: 8}}
            placeholder="Enter text"
          />
          {/* Add more content as needed */}
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

export default DynamicModal;

const styles = StyleSheet.create({});
