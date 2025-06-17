import React, { useState } from 'react';
import { styles } from './styles';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/RootNavigator';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation<LoginScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <KeyboardAvoidingView 
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>IpuFood</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
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
              <Text style={styles.inputLabel}>Senha</Text>
              <TextInput
                style={styles.input}
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={true}
                autoCapitalize="none"
              />
            </View>

            {/* Botão Continuar */}
            <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('Menu')}>
              <Text style={styles.continueButtonText}>Continuar</Text>
            </TouchableOpacity>

            {/* Login Social */}
            <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <AntDesign name="google" size={32} color="#4285F4" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <FontAwesome name="facebook" size={32} color="#1877F2" />
              </TouchableOpacity>
            </View>

            {/* Links */}
            <View style={styles.linksContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.linkText}>Criar uma conta</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.linkText}>Esqueceu a senha?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
