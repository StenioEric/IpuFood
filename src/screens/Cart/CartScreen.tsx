import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootNavigator';

type CartScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Cart'>;

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CartScreen() {
  const navigation = useNavigation<CartScreenNavigationProp>();
  
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'x-tudo',
      price: 16.48,
      quantity: 1,
      image: '🍔',
    },
    {
      id: '2',
      name: 'x-tudo',
      price: 16.48,
      quantity: 1,
      image: '🍔',
    },
    {
      id: '3',
      name: 'x-tudo',
      price: 16.48,
      quantity: 1,
      image: '🍔',
    },
  ]);

  const updateQuantity = (id: string, change: number) => {
    setCartItems(items =>
      items.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    Alert.alert(
      'Remover item',
      'Tem certeza que deseja remover este item do carrinho?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => {
            setCartItems(items => items.filter(item => item.id !== id));
          }
        }
      ]
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleChoosePayment = () => {
    // Navegar para tela de métodos de pagamento
    navigation.navigate('Payment');
  };

  const renderCartItem = (item: CartItem) => (
    <View key={item.id} style={styles.cartItem}>
      {/* Product Image */}
      <View style={styles.productImageContainer}>
        <Text style={styles.productImage}>{item.image}</Text>
      </View>

      {/* Product Info */}
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        
        {/* Quantity Controls */}
        <View style={styles.quantityControls}>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, -1)}
          >
            <Ionicons name="remove" size={16} color="#666" />
          </TouchableOpacity>
          
          <Text style={styles.quantityText}>{item.quantity}</Text>
          
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, 1)}
          >
            <Ionicons name="add" size={16} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Price and Remove */}
      <View style={styles.rightSection}>
        <Text style={styles.itemPrice}>
          R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
        </Text>
        <TouchableOpacity 
          style={styles.removeButton}
          onPress={() => removeItem(item.id)}
        >
          <Ionicons name="trash-outline" size={20} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pedidos</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Cart Content */}
      <View style={styles.content}>
        {cartItems.length > 0 ? (
          <>
            {/* Cart Items */}
            <ScrollView style={styles.cartList} showsVerticalScrollIndicator={false}>
              {cartItems.map(renderCartItem)}
            </ScrollView>

            {/* Total Section */}
            <View style={styles.totalSection}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalPrice}>
                  R$ {calculateTotal().toFixed(2).replace('.', ',')}
                </Text>
              </View>
            </View>

            {/* Choose Payment Button */}
            <TouchableOpacity style={styles.paymentButton} onPress={handleChoosePayment}>
              <Text style={styles.paymentButtonText}>Escolher método de pagamento</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.emptyCart}>
            <Ionicons name="bag-outline" size={80} color="#CCC" />
            <Text style={styles.emptyCartText}>Seu carrinho está vazio</Text>
            <TouchableOpacity 
              style={styles.shopButton}
              onPress={() => navigation.navigate('Menu')}
            >
              <Text style={styles.shopButtonText}>Continuar comprando</Text>
            </TouchableOpacity>
          </View>
        )}
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
  cartList: {
    flex: 1,
  },
  cartItem: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
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
  },
  productImageContainer: {
    marginRight: 15,
  },
  productImage: {
    fontSize: 40,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    minWidth: 20,
    textAlign: 'center',
  },
  rightSection: {
    alignItems: 'flex-end',
    gap: 10,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF5A5F',
  },
  removeButton: {
    padding: 5,
  },
  totalSection: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
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
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF5A5F',
  },
  paymentButton: {
    backgroundColor: '#444',
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
  },
  paymentButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  emptyCartText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  shopButton: {
    backgroundColor: '#FF5A5F',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  shopButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 