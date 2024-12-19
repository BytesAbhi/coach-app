import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import UserCard from '../../components/UserProfile/UserCard';
import {useNavigation} from '@react-navigation/native';
import DefaultSettings from '../../components/UserProfile/DefaultSettings';
import ProfileInfo from '../../components/UserProfile/ProfileInfo';
import {UserContext} from '../../components/UserContext';

const {width} = Dimensions.get('window');

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const User = () => {
  const [UserInfo, setUserInfo] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Settings');
  const navigation = useNavigation();
  const {userInfo, saveUserInfo} = useContext(UserContext);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleNotificatios = () => {
    navigation.navigate('Notification');
  };
  const handleTabPress = tab => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedTab(tab);
  };

  const handleUpdate = () => {
    const updatedInfo = {...userInfo, name: 'New Name'};
    saveUserInfo(updatedInfo);
  };

  console.log(userInfo);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.Priofilemaincont}>
        <View style={styles.PriofileHeaders}>
          <TouchableOpacity
            style={styles.backButtonContainer}
            onPress={handleBackPress}>
            <Image
              source={require('../../assets/images/LeftArrow.png')}
              style={styles.backButtonIcon}
            />
          </TouchableOpacity>
          <Text style={styles.HeaderText}>Profile</Text>
        </View>
        <View style={styles.bellIconDes}>
          <TouchableOpacity
            onPress={() => handleNotificatios()}
            style={styles.BellButt}>
            <Image
              source={require('../../assets/images/Bell.png')}
              style={styles.BellIcon}
            />
            <View style={styles.NotiDot}></View>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flex: 0,
          alignItems: 'center',
          justifyContent: 'center',
          width: width * 0.875,
          backgroundColor: 'white',
          marginTop: 75,
          paddingBottom: 10,
          borderRadius: 15,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 1,
          shadowRadius: 4,
          elevation: 5,
          zIndex: 1,
        }}>
        <UserCard userInfo={userInfo}/>

        <View
          style={{
            flex: 0,
            alignItems: '',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingVertical: 15,
            width: '80%',
          }}>
          <TouchableOpacity
            style={{padding: 5}}
            onPress={() => handleTabPress('Personal Info')}>
            <Text
              style={{
                color: selectedTab === 'Personal Info' ? '#000' : '#838383',
                fontSize: 16,
                fontWeight: '600',
              }}>
              Personal Info
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{padding: 5}}
            onPress={() => handleTabPress('Settings')}>
            <Text
              style={{
                color: selectedTab === 'Settings' ? '#000' : '#838383',
                fontSize: 16,
                fontWeight: '600',
              }}>
              Settings
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.container}>
        {selectedTab === 'Personal Info' ? (
          <ProfileInfo UserInfo={userInfo} />
        ) : (
          <DefaultSettings />
        )}
      </View>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#DE1F27',
    flex: 1,
    alignItems: 'center',
    paddingTop: 15,
  },
  Priofilemaincont: {
    flex: 0,
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  PriofileHeaders: {
    flex: 0,
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButtonContainer: {
    padding: 10,
  },
  backButtonIcon: {
    height: 25,
    aspectRatio: 1,
  },
  HeaderText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  bellIconDes: {
    marginTop: 5,
    position: 'relative',
  },
  BellButt: {
    padding: 5,
    borderRadius: 25,
    backgroundColor: 'white',
  },
  BellIcon: {
    height: 25,
    width: 25,
  },
  NotiDot: {
    height: 7.5,
    width: 7.5,
    backgroundColor: '#DE1F27',
    position: 'absolute',
    bottom: 7.5,
    right: 7.5,
    borderRadius: 50,
  },
  container: {
    marginTop: -70,
    alignItems: 'center',
    paddingTop: 85,
    paddingBottom: 0,
    flex: 1,
    backgroundColor: '#fff',
    width: width,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});
