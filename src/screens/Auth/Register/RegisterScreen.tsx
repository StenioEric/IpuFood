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
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/RootNavigator";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Register"
>;

type RegisterFormData = {
  nome: string;
  email: string;
  celular: string;
  endereco: string;
  senha: string;
  confirmarSenha: string;
};

const schema = yup.object({
  nome: yup.string().required("Informe seu nome"),
  email: yup.string().email("Email inválido").required("Informe seu email"),
  celular: yup
    .string()
    .required("Informe seu celular")
    .matches(/^\d{10,11}$/, "Celular inválido"),
  endereco: yup.string().required("Informe seu endereço"),
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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: RegisterFormData) => {
    navigation.navigate("Confirmation", {
      title: "Bem-vindo !",
      message:
        "Sua conta foi criada com sucesso! Agora você pode fazer seus pedidos.",
      buttonText: "Continuar",
      navigateTo: "Menu",
    });
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
              name="nome"
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
                  {errors.nome && (
                    <Text style={styles.labelError}>{errors.nome.message}</Text>
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
              name="celular"
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Celular</Text>
                  <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChange}
                    keyboardType="phone-pad"
                  />
                  {errors.celular && (
                    <Text style={styles.labelError}>
                      {errors.celular.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="endereco"
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
                  {errors.endereco && (
                    <Text style={styles.labelError}>
                      {errors.endereco.message}
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
            >
              <Text style={styles.registerButtonText}>Registrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
