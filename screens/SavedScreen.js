import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const SavedScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Roteiro',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
      },
      headerStyle: {
        backgroundColor: '#147DEB',
        height: 70,
        borderBottomColor: 'transparent',
        shadowColor: 'transparent',
      },
      headerRight: () => null,
    });
  }, []);

  const handleButtonPress = () => {
    navigation.navigate('HotelScreen');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleButtonPress}>
        <View style={styles.buttonImageContainer}>
          <Image source={require('../assets/hotel2.jpg')} style={styles.buttonImage} />
          <View style={styles.buttonOverlay} />
        </View>
        <View style={styles.buttonTitleContainer}>
          <Text style={styles.buttonTitle}>Hotéis</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleButtonPress}>
        <View style={styles.buttonImageContainer}>
          <Image source={require('../assets/rodavegas.jpg')} style={styles.buttonImage} />
          <View style={styles.buttonOverlay} />
        </View>
        <View style={styles.buttonTitleContainer}>
          <Text style={styles.buttonTitle}>Pontos Turisticos</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleButtonPress}>
        <View style={styles.buttonImageContainer}>
          <Image source={require('../assets/aviao.jpg')} style={styles.buttonImage} />
          <View style={styles.buttonOverlay} />
        </View>
        <View style={styles.buttonTitleContainer}>
          <Text style={styles.buttonTitle}>Pacotes de Viagem</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleButtonPress}>
        <View style={styles.buttonImageContainer}>
          <Image source={require('../assets/trem.jpg')} style={styles.buttonImage} />
          <View style={styles.buttonOverlay} />
        </View>
        <View style={styles.buttonTitleContainer}>
          <Text style={styles.buttonTitle}>Transporte</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  buttonContainer: {
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  buttonImageContainer: {
    position: 'relative',
    width: 339,
    height: 152,
    borderRadius: 21,
    overflow: 'hidden',
  },
  buttonImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  buttonOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  buttonTitleContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: 'flex-start',
    paddingHorizontal: 50,
  },
  buttonTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default SavedScreen;
