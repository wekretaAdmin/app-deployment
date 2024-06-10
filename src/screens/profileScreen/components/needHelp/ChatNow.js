import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import database from '@react-native-firebase/database';
import {useSelector} from 'react-redux';
import Apptheme from '../../../../assets/theme/apptheme';
import ProductHeader from '../../../../components/atoms/ProductHeader';
import Divider from '../../../../components/atoms/Divider';
import FontStyle from '../../../../assets/theme/FontStyle';
import {ChatUpdate, accessKey} from '../../../../apiServices/apiHelper';
import AxiosInstance from '../../../../apiServices/AxiosInstance';

const ChatNow = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState();
  const user = useSelector(state => state.loginReducer.user);

  console.log('user1234', user?.storeData?.supplierUuid);

  useEffect(() => {
    const messagesRef = database().ref(
      `supplier_customer_query/${user?.storeData?.supplierUuid}/${user?.phoneNumber}`,
    );
    // .orderByChild('timeSent');
    messagesRef.on('value', snapshot => {
      console.log('messagesData', snapshot);
      const messagesData = snapshot.val();

      if (messagesData) {
        const messagesList = Object.keys(messagesData).map(key => ({
          ...messagesData[key],
          id: key,
        }));
        setMessages(messagesList);
      } else {
        setMessages([]);
      }
    });

    return () => {
      messagesRef.off('value');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== '') {
      database()
        .ref(
          `supplier_customer_query/${user?.storeData?.supplierUuid}/${user?.phoneNumber}`,
        )
        .push(
          {
            text: message,

            // timestamp: Date.now(),
            timestamp: getTimeStamp(),
            role: 'Customer',
            phone: user?.phoneNumber,
          },
          // chatApi(),
        );
      setMessage('');
    }
  };

  console.log('123412345678', messages);

  const chatApi = async product => {
    const body = {messagePreview: 'hyy ??\n', isRead: 1, customerPhone: ''};

    const url = ChatUpdate();
    try {
      const response = await AxiosInstance.patch(url, body);
      console.log('HomePageCategoryListing response', response.data);

      if (response.data.status) {
        console.log('wishConsole', response.data?.object);
      }
    } catch (err) {
      console.log('@ HomePageCategoryListing error', err);
    }
  };

  const getTimeStamp = () => {
    const now = new Date();
    const date =
      now.getFullYear() + '/' + (1 + +now.getMonth()) + '/' + now.getDate();
    const time =
      now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    return (date + ' ' + time).toString();
  };

  const renderMessage = ({item}) => {
    console.log('renderMessage', item);
    return (
      <View
        style={[
          styles.messageContainer,
          {
            alignSelf: item?.role === 'Customer' ? 'flex-end' : 'flex-start',
          },
        ]}>
        <Text style={[FontStyle.label, styles.messageText]}>{item.text}</Text>
      </View>
    );
  };

  // console.log('messages', messages);

  return (
    <View style={styles.container}>
      <ProductHeader name={'CHAT NOW'} />
      <Divider />
      <View style={{flex: 1}}>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          inverted // to display messages from bottom to top
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message..."
          placeholderTextColor={Apptheme.color.text}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Apptheme.color.background,
  },
  messageContainer: {
    backgroundColor: Apptheme.color.imageBackground,
    borderRadius: 8,
    margin: 8,
    padding: 12,
    maxWidth: '70%',
  },
  messageText: {
    color: Apptheme.color.text,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: Apptheme.spacing.innerContainer,
  },
  input: {
    flex: 1,
    backgroundColor: Apptheme.color.containerBackground,

    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    color: Apptheme.color.text,
  },
  sendButton: {
    backgroundColor: Apptheme.color.black,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default ChatNow;
