import React, { useState } from 'react';
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
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootNavigator';

type PaymentScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Payment'>;

type PaymentMethod = 'credit' | 'pix' | 'cash';

export default function PaymentScreen() {
  const navigation = useNavigation<PaymentScreenNavigationProp>();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('credit');
  
  // Total vindo do carrinho (em uma implementação real, seria passado como parâmetro)
  const total = 49.44;

  const paymentMethods = [
    {
      id: 'credit' as PaymentMethod,
      title: 'Cartão de Crédito',
      icon: 'card',
      color: '#4A90E2',
    },
    {
      id: 'pix' as PaymentMethod,
      title: 'Pix',
      icon: 'diamond',
      color: '#00A86B',
    },
    {
      id: 'cash' as PaymentMethod,
      title: 'Dinheiro',
      icon: 'cash',
      color: '#F39C12',
    },
  ];

  const handleConfirmPayment = () => {
    // Navegar para tela de confirmação de pedido
    navigation.navigate('Confirmation', {
      title: 'Sucesso !',
      message: 'Aguarde que em alguns instantes o seu pedido será entregue, boa refeição!',
      buttonText: 'Voltar',
      navigateTo: 'Menu'
    });
  };

  const renderPaymentMethod = (method: typeof paymentMethods[0]) => (
    <TouchableOpacity
      key={method.id}
      style={[
        styles.paymentMethodCard,
        selectedMethod === method.id && styles.selectedPaymentMethod
      ]}
      onPress={() => setSelectedMethod(method.id)}
    >
      <View style={[styles.paymentIcon, { backgroundColor: method.color }]}>
        <Ionicons name={method.icon as any} size={24} color="white" />
      </View>
      
      <Text style={styles.paymentMethodTitle}>{method.title}</Text>
      
      <View style={styles.radioButton}>
        <View style={[
          styles.radioInner,
          selectedMethod === method.id && styles.radioSelected
        ]} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Método de Pagamento</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Cart Items Summary */}
        <ScrollView style={styles.itemsSection} showsVerticalScrollIndicator={false}>
          <View style={styles.cartItem}>
            <View style={styles.productImageContainer}>
              <Text style={styles.productImage}>🍔</Text>
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>x-tudo</Text>
              <View style={styles.quantityControls}>
                <View style={styles.quantityButton}>
                  <Ionicons name="remove" size={16} color="#666" />
                </View>
                <Text style={styles.quantityText}>1</Text>
                <View style={styles.quantityButton}>
                  <Ionicons name="add" size={16} color="#666" />
                </View>
              </View>
            </View>
            <View style={styles.rightSection}>
              <Text style={styles.itemPrice}>R$ 16,48</Text>
              <TouchableOpacity style={styles.removeButton}>
                <Ionicons name="trash-outline" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.cartItem}>
            <View style={styles.productImageContainer}>
              <Text style={styles.productImage}>🍔</Text>
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>x-tudo</Text>
              <View style={styles.quantityControls}>
                <View style={styles.quantityButton}>
                  <Ionicons name="remove" size={16} color="#666" />
                </View>
                <Text style={styles.quantityText}>1</Text>
                <View style={styles.quantityButton}>
                  <Ionicons name="add" size={16} color="#666" />
                </View>
              </View>
            </View>
            <View style={styles.rightSection}>
              <Text style={styles.itemPrice}>R$ 16,48</Text>
              <TouchableOpacity style={styles.removeButton}>
                <Ionicons name="trash-outline" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.cartItem}>
            <View style={styles.productImageContainer}>
              <Text style={styles.productImage}>🍔</Text>
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>x-tudo</Text>
              <View style={styles.quantityControls}>
                <View style={styles.quantityButton}>
                  <Ionicons name="remove" size={16} color="#666" />
                </View>
                <Text style={styles.quantityText}>1</Text>
                <View style={styles.quantityButton}>
                  <Ionicons name="add" size={16} color="#666" />
                </View>
              </View>
            </View>
            <View style={styles.rightSection}>
              <Text style={styles.itemPrice}>R$ 16,48</Text>
              <TouchableOpacity style={styles.removeButton}>
                <Ionicons name="trash-outline" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Total */}
        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalPrice}>R$ {total.toFixed(2).replace('.', ',')}</Text>
          </View>
        </View>

        {/* Payment Methods */}
        <Text style={styles.sectionTitle}>Método de Pagamento</Text>
        <View style={styles.paymentMethods}>
          {paymentMethods.map(renderPaymentMethod)}
        </View>

        {/* Total Price Bottom */}
        <View style={styles.bottomSection}>
          <View style={styles.priceSection}>
            <Text style={styles.priceLabel}>Preço Total</Text>
            <Text style={styles.finalPrice}>R$ {total.toFixed(2).replace('.', ',')}</Text>
          </View>
          
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPayment}>
            <Text style={styles.confirmButtonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}