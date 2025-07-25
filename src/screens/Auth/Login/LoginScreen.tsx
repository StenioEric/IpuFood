import React, { useState } from 'react';
import { styles } from './styles';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/RootNavigator';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useUser } from '../../../context/UserContext';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type LoginFormData = {
  email: string;
  senha: string;
};

const schema = yup.object({
  email: yup.string().email('Email inválido').required('Informe seu email'),
  senha: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Informe sua senha'),
});

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      await login(data.email, data.senha);
      navigation.navigate('Menu');
    } catch (error: any) {
      console.error('Erro no login:', error);
      setError('Email ou senha incorretos');
    } finally {
      setIsLoading(false);
    }
  };

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
              <Controller
                control={control}
                name="email"
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                )}
              />
              {errors.email && <Text style={styles.labelError}>{errors.email.message}</Text>}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Senha</Text>
              <Controller
                control={control}
                name="senha"
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={true}
                    autoCapitalize="none"
                  />
                )}
              />
              {errors.senha && <Text style={styles.labelError}>{errors.senha.message}</Text>}
            </View>

            {/* Mensagem de Erro */}
            {error && (
              <Text style={styles.errorText}>{error}</Text>
            )}

            {/* Botão Continuar */}
            <TouchableOpacity 
              style={[styles.continueButton, isLoading && styles.continueButtonDisabled]} 
              onPress={handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              <Text style={styles.continueButtonText}>
                {isLoading ? 'Entrando...' : 'Continuar'}
              </Text>
            </TouchableOpacity>

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
