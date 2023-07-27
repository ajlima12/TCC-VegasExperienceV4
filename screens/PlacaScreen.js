import React, {useLayoutEffect, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity, View, StyleSheet, ScrollView, Image, Text } from 'react-native';
import firestore from "@react-native-firebase/firestore";

//imagens
const getImagemPlacas = (nomePlacas) => {
    switch (nomePlacas) {
      case 'YIELD':
        return require('../assets/yield2.jpg');
      case 'Wrong way':
        return require('../assets/wrongway.jpg');
      case 'STOP':
        return require('../assets/stop2.jpg');
      case 'Speed Limit':
        return require('../assets/speedlimit1.jpg');
      default:
    }   
  };
const PlacasCard = ({ Placas }) => {
  const { nome_plac, descricao_plac, traducao  } = Placas;//nome dos campos
  const imagemPlacas = getImagemPlacas(nome_plac);//chamando o get imagem

  return (
    <View style={styles.PlacasCard}>
      <View style={styles.PlacasHeader}>
        <Text style={styles.PlacasName}>{nome_plac}</Text>
      </View>

      <Text style={styles.PlacasDescription}>{traducao}</Text>
      
      <View style={styles.locationContainer}>
        <View style={styles.locationIconContainer}>
          
        </View>
        <Text style={styles.PlacasLocation}>{descricao_plac}</Text>
      </View>
      <View style={styles.carouselContainer}>
        <Image source={imagemPlacas} style={styles.image} />
      </View>
    </View>
  );
};



const PlacaScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [PlacasData, setPlacasData] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Placas',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
      },
      headerStyle: {
        backgroundColor: '#147DEB',
        height: 110,
        borderBottomColor: 'transparent',
        shadowColor: 'transparent',
      },
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back-ios" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => null,
    });
  }, [navigation]);
  useEffect(() => {
    const fetchPlacasData = async () => {
      try {
        const collectionRef = firestore().collection('placas');//nome da tabela
        const snapshot = await collectionRef.get();
        const Placas = snapshot.docs.map((doc) => doc.data());
        setPlacasData(Placas);
        setLoading(false);
        console.log(Placas);
      } catch (error) {
        console.log('Erro ao buscar dados do Firestore:', error);
      }
    };

    fetchPlacasData();
  }, []);

  

  if (loading) return null;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {PlacasData.map((Placas, index) => (
          <View
            key={index}
            style={[
              styles.PlacasWrapper,
              index === 0 ? { marginTop: 20 } : null // Adiciona uma margem superior para o primeiro elemento
            ]}
          >
            <PlacasCard Placas={Placas} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F1EFFF',
    },
    contentContainer: {
      paddingBottom: 20,
    },
    PlacasWrapper: {
      marginBottom: 20,
    },
    PlacasCard: {
      width: '90%',
      alignSelf: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      position: 'relative',
    },
    PlacasName: {
      fontSize: 24,
      //fontWeight: 'bold',
      color: '#F42617',
      marginBottom: 3,
      textAlign: 'center',
    },
    PlacasLocation: {
      fontSize: 14,
      color: '#212C35',
      marginVertical: 6,
      textAlign: 'justify',
    },
    
    PlacasDescription: {
      fontSize: 12,
      color: '#9FA6AC',
      textAlign: 'center',
    },
    carouselContainer: {
      width: '100%',
      height: 150,
      borderRadius: 20,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    },
    slide: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    locationIconContainer: {
      marginRight: 4,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FF0303',
    },
  });

export default PlacaScreen;
