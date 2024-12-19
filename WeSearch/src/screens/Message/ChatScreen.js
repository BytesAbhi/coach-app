import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Tick from '../../assets/images/Tick.png';
import BlueTick from '../../assets/images/BlueTick.png';
import CoachDp from '../../assets/images/Rishav.jpg';
import UserDp from '../../assets/images/CoachDp.webp';
import Back from '../../assets/images/LeftArrow.png';

const {width} = Dimensions.get('window');

const ChatScreen = ({route}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCoachImage, setSelectedCoachImage] = useState(null);
  const navigation = useNavigation();

  const {coach} = route.params;

  const [messages, setMessages] = useState([
    {id: '1', text: 'Hi, how are you?', isSender: false, seen: true},
    {
      id: '2',
      text: 'I am good, thank you! How about you?',
      isSender: true,
      seen: true,
    },
    {
      id: '3',
      text: 'I’m doing well! Let’s discuss the project.',
      isSender: false,
      seen: false,
    },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          text: newMessage,
          isSender: true,
          seen: false,
        },
      ]);
      setNewMessage('');
    }
  };

  const handleImageClick = image => {
    setSelectedCoachImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCoachImage(null);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const renderMessage = ({item}) => (
    <View
      style={[styles.message, item.isSender ? styles.sender : styles.receiver]}>
      {!item.isSender && <Image source={CoachDp} style={styles.avatar} />}
      <View style={styles.messageContent}>
        <Text
          style={[
            styles.text,
            item.isSender ? styles.Textsender : styles.Textreceiver,
          ]}>
          {item.text}
        </Text>
        {item.isSender && (
          <Image source={item.seen ? BlueTick : Tick} style={styles.tickIcon} />
        )}
      </View>
      {item.isSender && <Image source={UserDp} style={styles.avatar} />}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerssection}>
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={handleBackPress}>
          <Image source={Back} style={styles.backButtonIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleImageClick(coach.image)}>
          <Image source={coach.image} style={styles.ProfilePicture} />
        </TouchableOpacity>
        <Text style={styles.header}>{coach.name}</Text>
      </View>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        inverted
        style={styles.chatList}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}>
        <TextInput
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message"
          placeholderTextColor={'#808080'}
          style={styles.input}
        />

        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={closeModal}
            style={styles.modalCloseButton}>
            <Text style={styles.closeButtonText}>x</Text>
          </TouchableOpacity>
          {selectedCoachImage && (
            <Image source={selectedCoachImage} style={styles.fullImage} />
          )}
        </View>
      </Modal>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FAFAFA', width: '100%'},
  backButtonContainer: {
    // width: '100%',

    
  },
  backButtonIcon: {
    height: 25,
    aspectRatio: 1,
    // backgroundColor:'cyan'
  },
  ProfilePicture: {
    // backgroundColor:'red',
    height: 45,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#fff',
    aspectRatio: 1,
    marginRight: 10,
  },
  headerssection: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    backgroundColor: '#000a24',
    padding: 16,
  },
  backButtonContainer: {
    padding: 10,
  },
  backButtonIcon: {
    height: 25,
    aspectRatio: 1,
  },
  header: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },

  chatList: {paddingHorizontal: 16, flex: 1},

  message: {
    flexDirection: 'row',
    marginVertical: 4,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    maxWidth: '80%',
    gap: 10,
  },
  sender: {
    borderBottomLeftRadius: 10,
    backgroundColor: '#fff',
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  receiver: {
    borderBottomRightRadius: 10,
    backgroundColor: '#007AFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  messageContent: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    maxWidth: '85%',
  },
  text: {fontSize: 16, color: '#fff'},

  tickIcon: {width: 15, height: 15, marginLeft: 5},

  avatar: {width: 40, height: 40, borderRadius: 20, marginHorizontal: 0},

  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 8,
    fontSize: 16,
    color: '#808080',
  },
  sendButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
  Textsender: {
    color: 'black',
  },
  sendText: {color: '#fff', fontSize: 16},

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 30,
    color: '#fff',
  },
  fullImage: {
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: 10,
  },
});
