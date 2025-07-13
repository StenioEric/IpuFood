import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootNavigator';

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

type SalesReportScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SalesReport'
>;

const { width } = Dimensions.get('window');

export default function SalesReportScreen() {
  const navigation = useNavigation<SalesReportScreenNavigationProp>();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');

  // Dados simulados para demonstração
  useEffect(() => {
    const mockOrders: Order[] = [
      {
        id: '1',
        userId: 'user1',
        userName: 'João Silva',
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
      },
      {
        id: '2',
        userId: 'user2',
        userName: 'Maria Santos',
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
        createdAt: new Date('2024-01-14'),
      },
      {
        id: '3',
        userId: 'user3',
        userName: 'Pedro Costa',
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
        userId: 'user4',
        userName: 'Ana Oliveira',
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
        createdAt: new Date('2024-01-12'),
      },
    ];

    setOrders(mockOrders);
    setLoading(false);
  }, []);

  const completedOrders = orders.filter(order => order.status === 'delivered');
  const pendingOrders = orders.filter(order => order.status === 'pending');
  const totalRevenue = completedOrders.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue = completedOrders.length > 0 ? totalRevenue / completedOrders.length : 0;

  // Top produtos (simulado)
  const topProducts = [
    { name: 'X-Burger', sales: 45, revenue: 675.00 },
    { name: 'Pizza Margherita', sales: 32, revenue: 640.00 },
    { name: 'Batata Frita', sales: 28, revenue: 280.00 },
    { name: 'Refrigerante', sales: 25, revenue: 125.00 },
  ];

  // Receita por dia (últimos 7 dias)
  const revenueByDay = [
    { day: 'Seg', revenue: 120.00 },
    { day: 'Ter', revenue: 85.00 },
    { day: 'Qua', revenue: 150.00 },
    { day: 'Qui', revenue: 200.00 },
    { day: 'Sex', revenue: 180.00 },
    { day: 'Sáb', revenue: 220.00 },
    { day: 'Dom', revenue: 160.00 },
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
        <Text style={styles.headerTitle}>Relatório de Vendas</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Período Selector */}
        <View style={styles.periodSelector}>
          <TouchableOpacity 
            style={[styles.periodButton, selectedPeriod === 'week' && styles.periodButtonActive]}
            onPress={() => setSelectedPeriod('week')}
          >
            <Text style={[styles.periodButtonText, selectedPeriod === 'week' && styles.periodButtonTextActive]}>
              Semana
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.periodButton, selectedPeriod === 'month' && styles.periodButtonActive]}
            onPress={() => setSelectedPeriod('month')}
          >
            <Text style={[styles.periodButtonText, selectedPeriod === 'month' && styles.periodButtonTextActive]}>
              Mês
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.periodButton, selectedPeriod === 'year' && styles.periodButtonActive]}
            onPress={() => setSelectedPeriod('year')}
          >
            <Text style={[styles.periodButtonText, selectedPeriod === 'year' && styles.periodButtonTextActive]}>
              Ano
            </Text>
          </TouchableOpacity>
        </View>

        {/* Resumo Geral */}
        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Resumo Geral</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryCard}>
              <Ionicons name="trending-up" size={24} color="#4CAF50" />
              <Text style={styles.summaryValue}>R$ {totalRevenue.toFixed(2)}</Text>
              <Text style={styles.summaryLabel}>Receita Total</Text>
            </View>
            <View style={styles.summaryCard}>
              <Ionicons name="bag" size={24} color="#2196F3" />
              <Text style={styles.summaryValue}>{completedOrders.length}</Text>
              <Text style={styles.summaryLabel}>Pedidos Concluídos</Text>
            </View>
            <View style={styles.summaryCard}>
              <Ionicons name="calculator" size={24} color="#FF9800" />
              <Text style={styles.summaryValue}>R$ {averageOrderValue.toFixed(2)}</Text>
              <Text style={styles.summaryLabel}>Ticket Médio</Text>
            </View>
            <View style={styles.summaryCard}>
              <Ionicons name="time" size={24} color="#9C27B0" />
              <Text style={styles.summaryValue}>{pendingOrders.length}</Text>
              <Text style={styles.summaryLabel}>Pedidos Pendentes</Text>
            </View>
          </View>
        </View>

        {/* Gráfico de Receita */}
        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Receita por Dia</Text>
          <View style={styles.chartContainer}>
            {revenueByDay.map((day, index) => (
              <View key={index} style={styles.chartBar}>
                <View 
                  style={[
                    styles.chartBarFill, 
                    { height: (day.revenue / 250) * 100 }
                  ]} 
                />
                <Text style={styles.chartLabel}>{day.day}</Text>
                <Text style={styles.chartValue}>R$ {day.revenue.toFixed(0)}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Top Produtos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Produtos</Text>
          {topProducts.map((product, index) => (
            <View key={index} style={styles.productItem}>
              <View style={styles.productRank}>
                <Text style={styles.rankNumber}>{index + 1}</Text>
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productSales}>{product.sales} vendas</Text>
              </View>
              <Text style={styles.productRevenue}>R$ {product.revenue.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        {/* Lista de Pedidos Recentes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pedidos Recentes</Text>
          {orders.slice(0, 5).map((order) => (
            <View key={order.id} style={styles.orderItem}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderId}>Pedido #{order.id}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
                  <Text style={styles.statusText}>{getStatusText(order.status)}</Text>
                </View>
              </View>
              
              <View style={styles.orderDetails}>
                <Text style={styles.customerName}>{order.userName}</Text>
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
                <Text style={styles.orderDate}>
                  {order.createdAt.toLocaleDateString('pt-BR')}
                </Text>
                <Text style={styles.paymentMethod}>
                  {order.paymentMethod === 'credit' ? 'Cartão' : 
                   order.paymentMethod === 'pix' ? 'PIX' : 'Dinheiro'}
                </Text>
              </View>
            </View>
          ))}
        </View>
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
    backgroundColor: '#FF6B35',
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
  filterButton: {
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
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
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
  periodButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  periodButtonActive: {
    backgroundColor: '#FF6B35',
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  periodButtonTextActive: {
    color: '#FFF',
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
    width: (width - 50) / 2,
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
  chartSection: {
    marginBottom: 20,
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  chartBar: {
    alignItems: 'center',
    flex: 1,
  },
  chartBarFill: {
    width: 20,
    backgroundColor: '#FF6B35',
    borderRadius: 10,
    marginBottom: 8,
  },
  chartLabel: {
    fontSize: 12,
    color: '#666',
  },
  chartValue: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
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
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  rankNumber: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  productSales: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  productRevenue: {
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
  customerName: {
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
  orderDate: {
    fontSize: 12,
    color: '#999',
  },
  paymentMethod: {
    fontSize: 12,
    color: '#999',
  },
}); 