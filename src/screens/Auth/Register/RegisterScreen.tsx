import React from "react";
import { styles } from "./styles";

import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/RootNavigator";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { auth } from "../../../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { userService } from "../../../services/userService";

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Register"
>;

type RegisterFormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  senha: string;
  confirmarSenha: string;
};

const schema = yup.object({
  name: yup.string().required("Informe seu nome"),
  email: yup.string().email("Email inválido").required("Informe seu email"),
  phone: yup
    .string()
    .required("Informe seu telefone")
    .matches(
      /^\d{11}$/,
      "Telefone inválido - Exemplo: 84981568463"
    ),

  address: yup.string().required("Informe seu endereço"),
  senha: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("Informe sua senha"),
  confirmarSenha: yup
    .string()
    .oneOf([yup.ref("senha")], "As senhas não coincidem")
    .required("Confirme sua senha"),
});

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      // 1. Cria usuário no Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.senha
      );
      const { uid } = userCredential.user;
      // 2. Salva dados no Firestore com os campos corretos
      await userService.createUser(uid, {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        role: "user",
      });

      setLoading(false);
      navigation.navigate("Confirmation", {
        title: "Bem-vindo !",
        message:
          "Sua conta foi criada com sucesso! Agora você pode fazer seus pedidos.",
        buttonText: "Continuar",
        navigateTo: "Menu",
      });
    } catch (error: any) {
      setLoading(false);
      Alert.alert("Erro ao cadastrar", error.message || "Tente novamente.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.scrollContainer}>
        <View style={styles.content}>
          {/* Header com botão voltar e logo */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.logoText}>IpuFood</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <Controller
              control={control}
              name="name"
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Nome</Text>
                  <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChange}
                    autoCapitalize="words"
                  />
                  {errors.name && (
                    <Text style={styles.labelError}>{errors.name.message}</Text>
                  )}
                </View>
              )}
            />
            <Controller
              control={control}
              name="email"
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Email</Text>
                  <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  {errors.email && (
                    <Text style={styles.labelError}>
                      {errors.email.message}
                    </Text>
                  )}
                </View>
              )}
            />
            <Controller
              control={control}
              name="phone"
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Telefone</Text>
                  <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChange}
                    keyboardType="phone-pad"
                  />
                  {errors.phone && (
                    <Text style={styles.labelError}>
                      {errors.phone.message}
                    </Text>
                  )}
                </View>
              )}
            />
            <Controller
              control={control}
              name="address"
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Endereço</Text>
                  <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChange}
                    autoCapitalize="words"
                  />
                  {errors.address && (
                    <Text style={styles.labelError}>
                      {errors.address.message}
                    </Text>
                  )}
                </View>
              )}
            />
            <Controller
              control={control}
              name="senha"
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Senha</Text>
                  <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  {errors.senha && (
                    <Text style={styles.labelError}>
                      {errors.senha.message}
                    </Text>
                  )}
                </View>
              )}
            />
            <Controller
              control={control}
              name="confirmarSenha"
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Confirmar Senha</Text>
                  <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={showPassword}
                    autoCapitalize="none"
                  />
                  {errors.confirmarSenha && (
                    <Text style={styles.labelError}>
                      {errors.confirmarSenha.message}
                    </Text>
                  )}
                </View>
              )}
            />
            {/* Botão Registrar */}
            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.registerButtonText}>Registrar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
