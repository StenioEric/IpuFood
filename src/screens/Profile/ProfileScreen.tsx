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

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Profile"
>;

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [editing, setEditing] = React.useState(false);

  const handleLogout = () => {
    // Aqui você implementaria a lógica de logout
    navigation.navigate("Login");
  };

  const handleEditProfile = () => {
    // Aqui você navegaria para tela de edição de perfil
    setEditing(!editing);
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
          {/* Nome */}
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Nome</Text>
            <View style={styles.infoField}>
              <TextInput
                style={styles.infoText}
                value={name}
                onChangeText={setName}
                editable={editing}
                placeholder="Denner Queijos Furos"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Email</Text>
            <View style={styles.infoField}>
              <TextInput
                style={styles.infoText}
                value={email}
                onChangeText={setEmail}
                editable={editing}
                placeholder="denner@exemplo.com"
                placeholderTextColor="#999"
                keyboardType="email-address"
              />
            </View>
          </View>

          {/* Local de entrega */}
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Local de entrega</Text>
            <View style={styles.infoField}>
              <TextInput
                style={styles.infoText}
                value={address}
                onChangeText={setAddress}
                editable={editing}
                placeholder="Local de entrega"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          {/* Contato */}
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Contato</Text>
            <View style={styles.infoField}>
              <TextInput
                style={styles.infoText}
                value={phone}
                onChangeText={setPhone}
                editable={editing}
                placeholder="Contato"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Senha */}
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Senha</Text>
            <View style={styles.infoField}>
              <TextInput
                style={styles.passwordText}
                value={password}
                onChangeText={setPassword}
                editable={editing}
                placeholder="Senha"
                placeholderTextColor="#999"
                secureTextEntry={true}
              />
            </View>
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
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
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons
              name="log-out-outline"
              size={20}
              color="#FF5A5F"
              style={styles.buttonIcon}
            />
            <Text style={styles.logoutButtonText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
