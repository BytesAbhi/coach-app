import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import Dp from '../assets/images/Rishav.jpg';
import Bell from '../assets/images/Bell.png';
import styles from '../styles/HomeStyle';
import {useNavigation} from '@react-navigation/native';

const notificationsData = [
  {id: '1', message: 'Your profile has been updated.'},
  {id: '2', message: 'You have a new message.'},
  {id: '3', message: 'Reminder: Meeting at 3 PM.'},
];

const Profile = ({userInfo}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  // console.log(userInfo.data)

  const ProfileNavigate = () => {
    navigation.navigate('User');
    // send a value to <Navigation/> to this
  };

  const handleNotificatios = () => {
    navigation.navigate('Notification');
  };

  return (
    <View style={styles.Userprofile}>
      <View style={styles.ProfileDet}>
        <TouchableOpacity
          style={styles.imageShadoweff}
          onPress={ProfileNavigate}>
          <Image
            source={require('../assets/images/My.png')}
            style={styles.dp}
          />
        </TouchableOpacity>
        <View style={styles.UserDetails}>
          <Text style={styles.UserName}>
           Abhishek
          </Text>
          <Text style={styles.UserLocation}>Sec 34, Chandigarh</Text>
        </View>
      </View>

      <View style={{marginTop: 5, position: 'relative'}}>
        <TouchableOpacity onPress={() => handleNotificatios()}>
          <Image source={Bell} style={styles.BellIcon} />
          <View style={styles.NotiDot}></View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
