import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Alert, Text } from 'react-native';
import ProfileScreen from './ProfileScreen';

const LoginScreen = ({ onLoginSuccess, onLoginFailure }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Verificar se o nome de usuário e a senha estão corretos
    if (username === 'admin123' && password === '2023') {
      // Se forem corretos, notificar o sucesso do login
      onLoginSuccess();
    } else {
      // Caso contrário, notificar o fracasso do login
      onLoginFailure();
    }
  };

  return (
    
    <View style={styles.container}>
    <Text style={styles.Usuario}>Entre com Google para personalizar seu roteiro:</Text>
    <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar com Google</Text>
      </TouchableOpacity>
    <Text style={styles.Admin}>Caso você seja administrador:</Text>
      <Text style={styles.label}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu login"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    backgroundColor:'#E9F0FC',
    color: '#B6B6B6',
    width: '80%',
    height: 50,
    //borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius:5,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: '10%',
    marginBottom: 8,
    fontSize: 16,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#147DEB',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    //fontWeight: 'bold',
  },
  Usuario: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',

  },
  Admin: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',

  },
});

export default LoginScreen;
