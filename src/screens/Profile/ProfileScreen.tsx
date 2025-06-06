import React from 'react';
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF5A5F',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 5,
  },
  settingsButton: {
    padding: 5,
  },
  profileCard: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 40,
    borderRadius: 25,
    paddingHorizontal: 25,
    paddingBottom: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: -30,
    marginBottom: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  profileInfo: {
    flex: 1,
  },
  infoSection: {
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  infoField: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  passwordText: {
    fontSize: 18,
    color: '#333',
    letterSpacing: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 20,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#444',
    borderRadius: 12,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF5A5F',
  },
  logoutButtonText: {
    color: '#FF5A5F',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonIcon: {
    marginRight: 8,
  },
}); 