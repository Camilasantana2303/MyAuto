import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import axios from 'axios';


const LoginScreen = ({ navigation }) => {

  const botaoCadastrar = () => {
    navigation.navigate('Cadastro');
  }
  const botaoTelaPrincipal = () => {
    navigation.navigate('HomeScreen');
  }

  //Setando os metodos das informações do Usuário e a tela de Cadastro
  const [logarEmail, setLogarEmail] = useState('');
  const [logarSenha, setLogarSenha] = useState('');
  const [erro, setErro] = useState('');

  const VerificarLogin = async () => {
    setErro('');

    if (!logarEmail || !logarSenha) {
      setErro('Senha ou Email estão incorretos.');
      return;
    }

    try {
      //Método para verificar se o usuário existe no banco

      const response = await axios.post('http://10.110.12.20:8081/api/usuarios/verificarDados', { 
        email: logarEmail,
        senha: logarSenha
      });

      if (response.status !== 200) {
        throw new Error('Erro ao tentar logar');
      }
      botaoTelaPrincipal();
      //Manda a mensagem para o Prompt pra verificar se a tela recebeu o usuário
      console.log('Logado:', response.data);
      console.log('Login Bem Sucedido!!');
      console.log('Email:', logarEmail);
      console.log('Senha:', logarSenha);

    } catch (error) {
      console.error('Ocorreu um erro ao tentar logar:', error);
      Alert.alert('Ocorreu um erro ao tentar logar:', error.message);
    }
  };

  return (
    //Tela para logar
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <View style={styles.loginContainer}>

      <View style={styles.userPassContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Usuário</Text>
        </View>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={text => setLogarEmail(text)}
          value={logarEmail}
          placeholder="Email"
        />

        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Senha</Text>
        </View>

        <TextInput
          style={styles.input}
          onChangeText={text => setLogarSenha(text)}
          value={logarSenha}
          secureTextEntry={true}
          placeholder="Senha"
        />
        <TouchableOpacity style={styles.button} onPress={VerificarLogin} >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={botaoCadastrar} style={[styles.button, styles.buttonSecondary]}>
          <Text style={styles.buttonText}>Criar uma conta</Text>
        </TouchableOpacity>
      </View>

      {/* Local para a imagem */}
      <View style={styles.imageContainer}>
        {/* Aqui você pode adicionar o componente Image com a sua imagem */}
        <Image source={{uri: 'https://github.com/SSancaSH-Projetos/MyAuto/blob/main/MY%20AUT.png?raw=true'}} style={styles.image} />
      </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0B0020',
  },
  header: {
    fontSize: 36,
    color: 'white',
    marginBottom: '25%',
  },
  loginContainer: {
    backgroundColor: '#FAFBA7',
    borderRadius: 30,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: 'white'
  },
  button: {
    backgroundColor: '#0C3C84',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    marginTop: 8,
    width: '80%',
  },
  buttonSecondary: {
    backgroundColor: '#0C3C84',
    borderColor: 'black',
    borderWidth: 1,
    width: '80%'

  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageContainer: {
    marginTop: 20,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 90,
  },
  userPassContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '80%',
  },
  inputContainer: {
    backgroundColor: '#0B0020',
    borderRadius: 20,
    padding: 8,
    width: '100%',
    marginLeft: '-10%'

  },
  inputText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
