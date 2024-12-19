import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import styles from '../styles/HomeStyle';
import { useNavigation } from '@react-navigation/native';

const Coaches = () => {
  const navigation = useNavigation();

  const coaches = [
    {
      id: '1',
      source: require('../assets/images/Coach1.png'),
      Name: 'Leo',
      Game: 'Football',
    },
    {
      id: '2',
      source: require('../assets/images/Coach2.png'),
      Name: 'Venis',
      Game: 'Tennis',
    },
    {
      id: '3',
      source: require('../assets/images/Coach3.png'),
      Name: 'Phil',
      Game: 'Basketball',
    },
    {
      id: '4',
      source: require('../assets/images/Coach1.png'),
      Name: 'Joe',
      Game: 'Football',
    },
    {
      id: '5',
      source: require('../assets/images/Coach2.png'),
      Name: 'Tylor',
      Game: 'Tennis',
    },
    {
      id: '6',
      source: require('../assets/images/Coach3.png'),
      Name: 'Mark',
      Game: 'Basketball',
    },
  ];

  const { width } = Dimensions.get('window');
  const cardWidth = width * 0.4;

  const handleChatPress = (coach) => {
    navigation.navigate('CoachProfile', { coach });
  };

  // Render each coach card
  const renderItem = ({ item }) => {
    const scaleValue = new Animated.Value(1); // Create a new animated value for each card

    const animateCard = () => {
      // Start the scaling animation
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 0.95, // Scale down
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1, // Scale back up
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Navigate after animation is done
        handleChatPress(item);
      });
    };

    return (
      <Animated.View
        style={[styles.CoachCard, { transform: [{ scale: scaleValue }] }]}>
        <Image source={item.source} style={styles.CoachCardImg} />
        <Text style={styles.CoachName}>{item.Name}</Text>
        <Text style={styles.CoachGame}>{item.Game}</Text>
        <TouchableOpacity
          style={styles.CoachConnect}
          onPress={animateCard}
        >
          <Text style={styles.CoachConnecttext}>Connect</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.CoachSection}>
      <Text style={styles.CoachHeading}>Recommended For You</Text>
      <View style={styles.GuideCards}>
        <FlatList
          data={coaches}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          snapToAlignment="start"
          decelerationRate="fast"
          snapToInterval={cardWidth}
          renderItem={renderItem} // Use the renderItem function
        />
      </View>
    </View>
  );
};

export default Coaches;
