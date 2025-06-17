import React from 'react';
import { styles } from './styles';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootNavigator';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const handleLogout = () => {
    // Aqui você implementaria a lógica de logout
    navigation.navigate('Login');
  };

  const handleEditProfile = () => {
    // Aqui você navegaria para tela de edição de perfil
    console.log('Edit Profile pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color="white" />
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
        <ScrollView style={styles.profileInfo} showsVerticalScrollIndicator={false}>
          {/* Nome */}
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Nome</Text>
            <View style={styles.infoField}>
              <Text style={styles.infoText}>Denner Bismarck</Text>
            </View>
          </View>

          {/* Email */}
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Email</Text>
            <View style={styles.infoField}>
              <Text style={styles.infoText}>dennerqueijosfuros@gmail.com</Text>
            </View>
          </View>

          {/* Local de entrega */}
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Local de entrega</Text>
            <View style={styles.infoField}>
              <Text style={styles.infoText}>Rua João Alencar, N°138, Ipueira-RN</Text>
            </View>
          </View>

          {/* Contato */}
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Contato</Text>
            <View style={styles.infoField}>
              <Text style={styles.infoText}>(84) 998456721</Text>
            </View>
          </View>

          {/* Senha */}
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Senha</Text>
            <View style={styles.infoField}>
              <Text style={styles.passwordText}>••••••••••</Text>
            </View>
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Ionicons name="create-outline" size={20} color="white" style={styles.buttonIcon} />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#FF5A5F" style={styles.buttonIcon} />
            <Text style={styles.logoutButtonText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}