import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootNavigator';


type PurchaseReportScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PurchaseReport'
>;

interface Order {
  id: string;
  userId: string;
  userName: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'delivered' | 'cancelled';
  paymentMethod: 'credit' | 'pix' | 'cash';
  createdAt: Date;
  deliveredAt?: Date;
}

interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export default function PurchaseReportScreen() {
  const navigation = useNavigation<PurchaseReportScreenNavigationProp>();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Dados simulados para demonstração
  useEffect(() => {
    const mockOrders: Order[] = [
      {
        id: '1',
        userId: 'user1',
        userName: 'Usuário',
        items: [
          { 
            id: '1', 
            productId: '1', 
            productName: 'X-Burger',
            quantity: 2, 
            price: 15.00,
            total: 30.00
          },
          { 
            id: '2', 
            productId: '2', 
            productName: 'Pizza Margherita',
            quantity: 1, 
            price: 25.00,
            total: 25.00
          },
        ],
        total: 55.00,
        status: 'delivered',
        paymentMethod: 'credit',
        createdAt: new Date('2024-01-15'),
        deliveredAt: new Date('2024-01-15'),
      },
      {
        id: '2',
        userId: 'user1',
        userName: 'Usuário',
        items: [
          { 
            id: '3', 
            productId: '3', 
            productName: 'Batata Frita',
            quantity: 3, 
            price: 12.00,
            total: 36.00
          },
        ],
        total: 36.00,
        status: 'delivered',
        paymentMethod: 'pix',
        createdAt: new Date('2024-01-10'),
        deliveredAt: new Date('2024-01-10'),
      },
      {
        id: '3',
        userId: 'user1',
        userName: 'Usuário',
        items: [
          { 
            id: '4', 
            productId: '1', 
            productName: 'X-Burger',
            quantity: 1, 
            price: 15.00,
            total: 15.00
          },
          { 
            id: '5', 
            productId: '4', 
            productName: 'Refrigerante',
            quantity: 2, 
            price: 18.00,
            total: 36.00
          },
        ],
        total: 51.00,
        status: 'pending',
        paymentMethod: 'cash',
        createdAt: new Date('2024-01-13'),
      },
      {
        id: '4',
        userId: 'user1',
        userName: 'Usuário',
        items: [
          { 
            id: '6', 
            productId: '5', 
            productName: 'Sorvete',
            quantity: 2, 
            price: 8.00,
            total: 16.00
          },
        ],
        total: 16.00,
        status: 'delivered',
        paymentMethod: 'pix',
        createdAt: new Date('2024-01-08'),
        deliveredAt: new Date('2024-01-08'),
      },
    ];

    setOrders(mockOrders);
    setLoading(false);
  }, []);

  const completedOrders = orders.filter(order => order.status === 'delivered');
  const pendingOrders = orders.filter(order => order.status === 'pending');
  const totalSpent = completedOrders.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue = completedOrders.length > 0 ? totalSpent / completedOrders.length : 0;

  // Produtos favoritos (baseado na frequência de compra)
  const favoriteProducts = [
    { name: 'X-Burger', purchases: 3, totalSpent: 45.00 },
    { name: 'Pizza Margherita', purchases: 2, totalSpent: 50.00 },
    { name: 'Batata Frita', purchases: 2, totalSpent: 24.00 },
    { name: 'Refrigerante', purchases: 1, totalSpent: 18.00 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return '#4CAF50';
      case 'pending':
        return '#FF9800';
      case 'confirmed':
        return '#2196F3';
      case 'preparing':
        return '#9C27B0';
      case 'delivering':
        return '#FF5722';
      case 'cancelled':
        return '#F44336';
      default:
        return '#666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Entregue';
      case 'pending':
        return 'Pendente';
      case 'confirmed':
        return 'Confirmado';
      case 'preparing':
        return 'Preparando';
      case 'delivering':
        return 'Entregando';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando relatório...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meus Pedidos</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Resumo Pessoal */}
        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Resumo dos Meus Pedidos</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryCard}>
              <Ionicons name="bag-check" size={24} color="#4CAF50" />
              <Text style={styles.summaryValue}>{completedOrders.length}</Text>
              <Text style={styles.summaryLabel}>Pedidos Concluídos</Text>
            </View>
            <View style={styles.summaryCard}>
              <Ionicons name="time" size={24} color="#FF9800" />
              <Text style={styles.summaryValue}>{pendingOrders.length}</Text>
              <Text style={styles.summaryLabel}>Pedidos Pendentes</Text>
            </View>
            <View style={styles.summaryCard}>
              <Ionicons name="wallet" size={24} color="#2196F3" />
              <Text style={styles.summaryValue}>R$ {totalSpent.toFixed(2)}</Text>
              <Text style={styles.summaryLabel}>Total Gasto</Text>
            </View>
            <View style={styles.summaryCard}>
              <Ionicons name="calculator" size={24} color="#9C27B0" />
              <Text style={styles.summaryValue}>R$ {averageOrderValue.toFixed(2)}</Text>
              <Text style={styles.summaryLabel}>Ticket Médio</Text>
            </View>
          </View>
        </View>

        {/* Produtos Favoritos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meus Produtos Favoritos</Text>
          {favoriteProducts.map((product, index) => (
            <View key={index} style={styles.productItem}>
              <View style={styles.productRank}>
                <Ionicons name="heart" size={20} color="#FF6B35" />
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPurchases}>{product.purchases} compras</Text>
              </View>
              <Text style={styles.productSpent}>R$ {product.totalSpent.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        {/* Histórico de Pedidos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Histórico de Pedidos</Text>
          {orders.map((order) => (
            <View key={order.id} style={styles.orderItem}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderId}>Pedido #{order.id}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
                  <Text style={styles.statusText}>{getStatusText(order.status)}</Text>
                </View>
              </View>
              
              <View style={styles.orderDetails}>
                <Text style={styles.orderDate}>
                  {order.createdAt.toLocaleDateString('pt-BR')}
                </Text>
                <Text style={styles.orderTotal}>R$ {order.total.toFixed(2)}</Text>
              </View>
              
              <View style={styles.orderItems}>
                {order.items.map((item) => (
                  <Text key={item.id} style={styles.orderItemText}>
                    {item.quantity}x {item.productName}
                  </Text>
                ))}
              </View>

              <View style={styles.orderFooter}>
                <Text style={styles.paymentMethod}>
                  {order.paymentMethod === 'credit' ? 'Cartão' : 
                   order.paymentMethod === 'pix' ? 'PIX' : 'Dinheiro'}
                </Text>
                {order.deliveredAt && (
                  <Text style={styles.deliveryDate}>
                    Entregue em {order.deliveredAt.toLocaleDateString('pt-BR')}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Botão para fazer novo pedido */}
        <TouchableOpacity 
          style={styles.newOrderButton}
          onPress={() => navigation.navigate('Menu')}
        >
          <Ionicons name="add-circle" size={24} color="#FFF" />
          <Text style={styles.newOrderButtonText}>Fazer Novo Pedido</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  shareButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  summarySection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    width: '48%',
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  productItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  productRank: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  productPurchases: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  productSpent: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  orderItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  orderItems: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 10,
    marginBottom: 10,
  },
  orderItemText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 10,
  },
  paymentMethod: {
    fontSize: 12,
    color: '#999',
  },
  deliveryDate: {
    fontSize: 12,
    color: '#999',
  },
  newOrderButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  newOrderButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
}); 