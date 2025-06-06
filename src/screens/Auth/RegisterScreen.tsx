import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';

type RegisterScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Register'>;

export default function RegisterScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [endereco, setEndereco] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
            {/* Header com botão voltar e logo */}
            <View style={styles.header}>
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.logoText}>IpuFood</Text>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Nome</Text>
                <TextInput
                  style={styles.input}
                  value={nome}
                  onChangeText={setNome}
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Celular</Text>
                <TextInput
                  style={styles.input}
                  value={celular}
                  onChangeText={setCelular}
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Endereço</Text>
                <TextInput
                  style={styles.input}
                  value={endereco}
                  onChangeText={setEndereco}
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Senha</Text>
                <TextInput
                  style={styles.input}
                  value={senha}
                  onChangeText={setSenha}
                  secureTextEntry={true}
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Confirmar Senha</Text>
                <TextInput
                  style={styles.input}
                  value={confirmarSenha}
                  onChangeText={setConfirmarSenha}
                  secureTextEntry={true}
                  autoCapitalize="none"
                />
              </View>

              {/* Botão Registrar */}
              <TouchableOpacity style={styles.registerButton}>
                <Text style={styles.registerButtonText}>Registrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF5A5F',
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 40,
    paddingTop: 20,
    paddingBottom: 200,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
    gap: 15,
  },
  backButton: {
    padding: 8,
  },
  logoText: {
    fontSize: 32,
    fontFamily: 'Lobster_400Regular',
    color: 'white',
  },
  formContainer: {
    paddingBottom: 50,
  },
  inputContainer: {
    marginBottom: 25,
  },
  inputLabel: {
    color: 'white',
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  registerButton: {
    backgroundColor: 'white',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  registerButtonText: {
    color: '#FF5A5F',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 