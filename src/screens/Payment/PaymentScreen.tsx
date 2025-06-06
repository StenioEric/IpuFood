import React, { useState } from 'react';
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  searchButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  itemsSection: {
    maxHeight: 250,
    marginBottom: 20,
  },
  cartItem: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  productImageContainer: {
    marginRight: 15,
  },
  productImage: {
    fontSize: 30,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  quantityButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    minWidth: 15,
    textAlign: 'center',
  },
  rightSection: {
    alignItems: 'flex-end',
    gap: 8,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF5A5F',
  },
  removeButton: {
    padding: 2,
  },
  totalSection: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF5A5F',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  paymentMethods: {
    gap: 12,
    marginBottom: 25,
  },
  paymentMethodCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedPaymentMethod: {
    borderColor: '#4A90E2',
    backgroundColor: '#F8FBFF',
  },
  paymentIcon: {
    width: 45,
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  paymentMethodTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#DDD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'transparent',
  },
  radioSelected: {
    backgroundColor: '#4A90E2',
  },
  bottomSection: {
    gap: 15,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  finalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF5A5F',
  },
  confirmButton: {
    backgroundColor: '#444',
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 