import React from 'react';
import { styles } from './styles';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootNavigator';

type ConfirmationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Confirmation'>;

interface ConfirmationParams {
  title?: string;
  message?: string;
  buttonText?: string;
  navigateTo?: keyof RootStackParamList;
}

export default function ConfirmationScreen() {
  const navigation = useNavigation<ConfirmationScreenNavigationProp>();
  const route = useRoute();
  const params = route.params as ConfirmationParams;

  const {
    title = 'Sucesso !',
    message = 'Aguarde que em alguns instantes o seu pedido será entregue, boa refeição!',
    buttonText = 'Voltar',
    navigateTo = 'Menu'
  } = params || {};

  const handleButtonPress = () => {
    navigation.navigate(navigateTo);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Success Icon */}
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Ionicons name="checkmark" size={32} color="white" />
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>{title}</Text>

          {/* Message */}
          <Text style={styles.message}>{message}</Text>

          {/* Button */}
          <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}