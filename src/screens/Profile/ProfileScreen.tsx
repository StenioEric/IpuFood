import React from "react";
import { styles } from "./styles";

import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/RootNavigator";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Profile"
>;

type ProfileFormData = {
  nome: string;
  email: string;
  localizacao: string;
  telefone: string; 
  senha: string;
};

const schema = yup.object({
  nome: yup.string().required('Informe seu nome'),
  email: yup.string().email('Email inválido').required('Informe seu email'),
  localizacao: yup.string().required('Informe sua localização'),
  telefone: yup
    .string()
    .required('Informe seu telefone')
    .matches(/^\d{10,11}$/, 'Telefone inválido'),
  senha: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Informe sua senha'),
});

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [editing, setEditing] = React.useState(false);
  const {
    control,
    handleSubmit,
    formState:{errors}
  } = useForm({resolver:yupResolver(schema)});

  const handleLogout = () => {
    // Aqui você implementaria a lógica de logout
    navigation.navigate("Login");
  };

  const handleEditProfile = () => {
    // Aqui você navegaria para tela de edição de perfil
    setEditing(!editing);
  };

  const handleSaveProfile = (data: ProfileFormData) => {
    console.log(data);
    setEditing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        {/* Profile Image */}
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImage}>
            <Ionicons name="person" size={40} color="#666" />
          </View>
        </View>

        {/* Profile Information */}
        <ScrollView
          style={styles.profileInfo}
          showsVerticalScrollIndicator={false}
        >
          <Controller
            control={control}
            name="nome"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Nome</Text>
                <View style={styles.infoField}>
                  <TextInput
                    style={styles.infoText}
                    value={value}
                    onChangeText={onChange}
                    editable={editing}
                    placeholder="Denner Queijos Furos"
                    placeholderTextColor="#999"
                  />
                </View>
              </View>
            )}
          />
          {errors.nome && <Text style={styles.labelError} >{errors.nome?.message}</Text> }
          <Controller
            control={control}
            name="email"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Email</Text>
                <View style={styles.infoField}>
                  <TextInput
                    style={styles.infoText}
                    value={value}
                    onChangeText={onChange}
                    editable={editing}
                    placeholder="denner@example.com"
                    placeholderTextColor="#999"
                  />
                </View>
              </View>
            )}
          />
          {errors.email && <Text style={styles.labelError} >{errors.email?.message}</Text> }
          <Controller
            control={control}
            name="localizacao"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Localização</Text>
                <View style={styles.infoField}>
                  <TextInput
                    style={styles.infoText}
                    value={value}
                    onChangeText={onChange}
                    editable={editing}
                    placeholder="Basta da Égua, Ipu - CE"
                    placeholderTextColor="#999"
                  />
                </View>
              </View>
            )}
          />
          {errors.localizacao && <Text style={styles.labelError} >{errors.localizacao?.message}</Text> }
          <Controller
            control={control}
            name="telefone"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Telefone</Text>
                <View style={styles.infoField}>
                  <TextInput
                    style={styles.infoText}
                    value={value}
                    onChangeText={onChange}
                    editable={editing}
                    placeholder="Basta da Égua, Ipu - CE"
                    placeholderTextColor="#999"
                  />
                </View>
              </View>
            )}
          />
          {errors.telefone && <Text style={styles.labelError} >{errors.telefone?.message}</Text> }
          <Controller
            control={control}
            name="senha"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Senha</Text>
                <View style={styles.infoField}>
                  <TextInput
                    style={styles.passwordText}
                    value={value}
                    onChangeText={onChange}
                    editable={editing}
                    placeholder="********"
                    placeholderTextColor="#999"
                    secureTextEntry={true}
                  />
                </View>
              </View>
            )}
          />
          {errors.senha && <Text style={styles.labelError} >{errors.senha?.message}</Text> }
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          {!editing ? (
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditProfile}
            >
              <Ionicons
                name="create-outline"
                size={20}
                color="white"
                style={styles.buttonIcon}
              />
              <Text style={styles.editButtonText}>Editar Perfil</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleSubmit(handleSaveProfile)}
            >
              <Ionicons
                name="save-outline"
                size={20}
                color="white"
                style={styles.buttonIcon}
              />
              <Text style={styles.editButtonText}>Salvar</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons
              name="log-out-outline"
              size={20}
              color="#FF5A5F"
              style={styles.buttonIcon}
            />
            <Text style={styles.logoutButtonText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
