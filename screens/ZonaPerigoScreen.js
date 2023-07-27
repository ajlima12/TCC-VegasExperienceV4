import React, {useLayoutEffect, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity, View, StyleSheet, ScrollView, Image, Text } from 'react-native';
import firestore from "@react-native-firebase/firestore";

//imagens
const getImagemZonaPerigo = (nomeZonaPerigo) => {
    switch (nomeZonaPerigo) {
      case 'Aldeia de Meadows':
        return require('../assets/meadows.jpeg');
      case 'Westside':
        return require('../assets/westside.jpeg');
      case 'Huntridge':
        return require('../assets/Huntridge.jpeg');
      case 'Norte de Las Vegas':
        return require('../assets/nortedelasvegas.jpeg');
      default:
    }   
  };
const ZonaPerigoCard = ({ zonaPerigo }) => {
  const { nome_zp, localizacao_zp, descricao_zp } = zonaPerigo;//nome dos campos
  const imagemZonaPerigo = getImagemZonaPerigo(nome_zp);//chamando o get imagem

  return (
    <View style={styles.zonaPerigoCard}>
      <View style={styles.zonaPerigoHeader}>
        <Text style={styles.zonaPerigoName}>{nome_zp}</Text>
      </View>
      <View style={styles.carouselContainer}>
        <Image source={imagemZonaPerigo} style={styles.image} />
      </View>
      <View style={styles.locationContainer}>
        <View style={styles.locationIconContainer}>
          <MaterialIcons name="location-on" size={16} color="#147DEB" style={styles.locationIcon} />
        </View>
        <Text style={styles.zonaPerigoLocation}>{localizacao_zp}</Text>
      </View>
      <Text style={styles.zonaPerigoDescription}>{descricao_zp}</Text>
    </View>
  );
};



const ZonaPerigoScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [zonaPerigoData, setZonaPerigoData] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Zonas de Perigo ',
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
    const fetchZonaPerigoData = async () => {
      try {
        const collectionRef = firestore().collection('zonas_perigo');//nome da tabela
        const snapshot = await collectionRef.get();
        const zonaPerigo = snapshot.docs.map((doc) => doc.data());
        setZonaPerigoData(zonaPerigo);
        setLoading(false);
        console.log(zonaPerigo);
      } catch (error) {
        console.log('Erro ao buscar dados do Firestore:', error);
      }
    };

    fetchZonaPerigoData();
  }, []);

  

  if (loading) return null;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {zonaPerigoData.map((zonaPerigo, index) => (
          <View
            key={index}
            style={[
              styles.zonaPerigoWrapper,
              index === 0 ? { marginTop: 20 } : null // Adiciona uma margem superior para o primeiro elemento
            ]}
          >
            <ZonaPerigoCard zonaPerigo={zonaPerigo} />
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
    zonaPerigoWrapper: {
      marginBottom: 20,
    },
    zonaPerigoCard: {
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
    zonaPerigoName: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
      textAlign: 'center',
    },
    zonaPerigoLocation: {
      fontSize: 16,
      color: '#666',
      marginBottom: 8,
    },
    
    zonaPerigoDescription: {
      fontSize: 16,
      color: '#333',
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

export default ZonaPerigoScreen;
