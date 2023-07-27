import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import firestore from "@react-native-firebase/firestore";

const HotelCrud = () => {
  const [hoteis, setHoteis] = useState([]);
  const [nome_hot, setNome] = useState('');
  const [localizacao_hot, setLocalizacao] = useState('');
  const [descricao_hot, setDescricao] = useState('');
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('hoteis')
      .onSnapshot((snapshot) => {
        const hoteisData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setHoteis(hoteisData);
      });

    return () => unsubscribe();
  }, []);

  const handleCriarHotel = async () => {
    try {
      await firestore().collection('hoteis').add({ nome_hot, localizacao_hot, descricao_hot });
      setNome('');
      setLocalizacao('');
      setDescricao('');
    } catch (error) {
      console.log('Erro ao criar hotel:', error);
    }
  };

  const handleEditarHotel = async () => {
    try {
      await firestore().collection('hoteis').doc(editando.id).update({ nome_hot, localizacao_hot, descricao_hot });
      setNome('');
      setLocalizacao('');
      setDescricao('');
      setEditando(null);
    } catch (error) {
      console.log('Erro ao editar hotel:', error);
    }
  };

  const handleExcluirHotel = async (id) => {
    try {
      await firestore().collection('hoteis').doc(id).delete();
    } catch (error) {
      console.log('Erro ao excluir hotel:', error);
    }
  };

  const handleEditar = (hotel) => {
    setEditando(hotel);
    setNome(hotel.nome_hot);
    setLocalizacao(hotel.localizacao_hot);
    setDescricao(hotel.descricao_hot);
  };

  const renderItem = ({ item }) => (
    <View style={styles.hotelItem}>
      <Text>{item.nome_hot}</Text>
      <Text>{item.localizacao_hot}</Text>
      <Text>{item.descricao_hot}</Text>
      <TouchableOpacity onPress={() => handleEditar(item)}>
        <Text style={styles.editButton}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleExcluirHotel(item.id)}>
        <Text style={styles.deleteButton}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Lista de Hoteis:</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Nome</Text>
        <Text style={styles.tableHeaderText}>Localização</Text>
        <Text style={styles.tableHeaderText}>Descrição</Text>

      </View>
      <FlatList
        data={hoteis}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.hoteisList}
      />
      <Text style={styles.formTitle}>{editando ? 'Editar Hotel:' : 'Novo Hotel:'}</Text>
      <TextInput
        placeholder="Nome"
        value={nome_hot}
        onChangeText={(text) => setNome(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Localizacao"
        value={localizacao_hot}
        onChangeText={(text) => setLocalizacao(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Descrição"
        value={descricao_hot}
        onChangeText={(text) => setDescricao(text)}
        style={styles.input}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={editando ? handleEditarHotel : handleCriarHotel}
      >
        <Text style={styles.buttonText}>{editando ? 'Salvar' : 'Criar'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  hoteisList: {
    marginBottom: 20,
  },
  hotelItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 8,
    borderColor: '#ccc',
  },
  editButton: {
    color: 'blue',
  },
  deleteButton: {
    color: 'red',
  },
  formTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 8,
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HotelCrud;
