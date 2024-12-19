import {useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
  FlatList,
  Dimensions,
  Linking,
  Animated,
  TouchableOpacity,
} from 'react-native';

import Education from '../assets/images/Education.png';
import Verifyed from '../assets/images/Verifyed.png';
import Star from '../assets/images/Star.png';
import Exp from '../assets/images/Exp.png';
import Lang from '../assets/images/Lang.png';
import styles from '../styles/HomeStyle';

const {width} = Dimensions.get('window');

const CoachCard = ({coach}) => {
  const navigation = useNavigation();
  const scaleValue = useRef(new Animated.Value(1)).current;
  const {
    name,
    rating,
    verified,
    coachImage,
    skills,
    languages,
    experience,
    buttons,
  } = coach;

  const handleChatPress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate('CoachProfile');
    });
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={handleChatPress}>
        <Animated.View
          style={[styles.CoachCardss, {transform: [{scale: scaleValue}]}]}>
          <View style={styles.CoachDetails}>
            <View style={styles.CoachImgSection}>
              <Image source={coachImage} style={styles.CoachImage} />
              <View style={styles.Coachrating}>
                <Image source={Star} style={styles.RatingStar} />
                <Text style={styles.RatingNumber}>{rating}</Text>
              </View>
            </View>

            <View style={{flex: 0, gap: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '78.5%',
                  marginTop: 5,
                }}>
                <Text style={{color: 'black', fontSize: 18, fontWeight: '600'}}>
                  {name}
                </Text>
                {verified && (
                  <Image source={Verifyed} style={{width: 25, height: 25}} />
                )}
              </View>

              <View
                style={{
                  flex: 0,
                  gap: 7.5,
                  width: '79%',
                }}>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                  <Image source={Education} style={{width: 20, height: 20}} />
                  <Text
                    style={{
                      color: '#616161',
                      width: width * 0.5,
                      fontSize: 16,
                      width: '86.5%',
                    }}>
                    {skills.length > 4
                      ? `${skills.slice(0, 4).join(', ')} and +${
                          skills.length - 4
                        } More`
                      : skills.join(', ')}
                  </Text>
                </View>

                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                  <Image source={Lang} style={{width: 20, height: 20}} />
                  <Text
                    style={{
                      color: '#616161',
                      width: width * 0.5,
                      fontSize: 16,
                      width: '86.5%',
                    }}>
                    {languages.length > 3
                      ? `${languages.slice(0, 3).join(', ')} and +${
                          languages.length - 3
                        } More`
                      : languages.join(', ')}
                  </Text>
                </View>

                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                  <Image source={Exp} style={{width: 20, height: 20}} />
                  <Text
                    style={{
                      color: '#616161',
                      width: width * 0.5,
                      fontSize: 16,
                      width: '86.5%',
                    }}>
                    {experience}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{marginTop: 15}}>
            <FlatList
              data={buttons}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.CoachButtons}
                  activeOpacity={0.7}
                  onPress={() => {
                    switch (item.title) {
                      case 'Call Now':
                        const phoneNumber = '7056298363';
                        Linking.openURL(`tel:${phoneNumber}`);
                        break;
                      case 'Chat':
                        navigation.navigate('Chat', {coach});
                        break;
                      default:
                        break;
                    }
                  }}>
                  <Image source={item.image} style={styles.CoachButtIcon} />
                  <Text style={styles.buttTextCoach}>{item.title}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default CoachCard;
