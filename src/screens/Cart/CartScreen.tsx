import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';
import { orderService } from '../../services/orderService';

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
  const { cart, removeFromCart, clearCart } = useCart();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const updateQuantity = (id: string, change: number) => {
    // Atualização de quantidade pode ser implementada no contexto se desejar
  };

  const handleRemove = (id: string) => {
    removeFromCart(id);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const handleCheckout = async () => {
    if (!user) {
      Alert.alert('Faça login para finalizar o pedido!');
      return;
    }
    if (cart.length === 0) {
      Alert.alert('Seu carrinho está vazio!');
      return;
    }
    setLoading(true);
    try {
      await orderService.createOrder({
        userId: user.id,
        userName: user.name,
        items: cart.map(item => ({
          id: item.product.id,
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          total: item.product.price * item.quantity,
        })),
        total: calculateTotal(),
        status: 'pending',
        paymentMethod: 'credit', // ou permitir escolha
        createdAt: new Date(),
      });
      clearCart();
      Alert.alert('Pedido realizado com sucesso!');
      navigation.navigate('Menu');
    } catch (e) {
      Alert.alert('Erro ao finalizar pedido');
    } finally {
      setLoading(false);
    }
  };

  const renderCartItem = (item: { product: any; quantity: number }) => (
    <View key={item.product.id} style={styles.cartItem}>
      <View style={styles.productImageContainer}>
        {item.product.imageUrl ? (
          <Image source={{ uri: item.product.imageUrl }} style={{ width: 40, height: 40, borderRadius: 20 }} />
        ) : (
          <Text style={styles.productImage}>🍔</Text>
        )}
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.product.name}</Text>
        <Text style={styles.productDescription}>{item.product.description}</Text>
        <Text style={styles.itemPrice}>R$ {item.product.price.toFixed(2)}</Text>
        <Text style={styles.quantityText}>Quantidade: {item.quantity}</Text>
      </View>
      <TouchableOpacity style={styles.removeButton} onPress={() => handleRemove(item.product.id)}>
        <Ionicons name="trash-outline" size={20} color="#666" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pedidos</Text>
        <View></View>
      </View>
      <View style={styles.content}>
        {cart.length > 0 ? (
          <>
            <ScrollView style={styles.cartList} showsVerticalScrollIndicator={false}>
              {cart.map(renderCartItem)}
            </ScrollView>
            <View style={styles.totalSection}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalPrice}>
                  R$ {calculateTotal().toFixed(2).replace('.', ',')}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.paymentButton} onPress={handleCheckout} disabled={loading}>
              <Text style={styles.paymentButtonText}>{loading ? 'Enviando...' : 'Finalizar Pedido'}</Text>
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
    paddingTop: 35,
    marginBottom: 20,
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
  productDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
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