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
import { orderService, Order } from '../../services/orderService';
import { useUser } from '../../context/UserContext';

type PurchaseReportScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PurchaseReport'
>;

const { width } = Dimensions.get('window');

export default function PurchaseReportScreen() {
  const navigation = useNavigation<PurchaseReportScreenNavigationProp>();
  const { user } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');

  // Carregar dados do Firebase
  useEffect(() => {
    if (user) {
      loadUserOrders();
    }
  }, [user]);

  const loadUserOrders = async () => {
    try {
      setLoading(true);
      console.log('🔍 Carregando pedidos para usuário:', user?.id);
      const userOrders = await orderService.getUserOrders(user!.id);
      console.log('📦 Pedidos carregados:', userOrders.length, userOrders);
      setOrders(userOrders);
    } catch (error) {
      console.error('❌ Erro ao carregar pedidos:', error);
    } finally {
      setLoading(false);
    }
  };

  const completedOrders = orders.filter(order => order.status === 'delivered');
  const pendingOrders = orders.filter(order => order.status === 'pending');
  const totalSpent = completedOrders.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue = completedOrders.length > 0 ? totalSpent / completedOrders.length : 0;

  // Calcular categorias favoritas baseado nos dados reais
  const categoryStats = new Map();
  orders.forEach(order => {
    order.items.forEach(item => {
      // Simular categorias baseado no nome do produto
      let category = 'Outros';
      if (item.productName.toLowerCase().includes('burger') || item.productName.toLowerCase().includes('x-')) {
        category = 'Lanches';
      } else if (item.productName.toLowerCase().includes('pizza')) {
        category = 'Pizzas';
      } else if (item.productName.toLowerCase().includes('batata') || item.productName.toLowerCase().includes('frita')) {
        category = 'Acompanhamentos';
      } else if (item.productName.toLowerCase().includes('refrigerante') || item.productName.toLowerCase().includes('bebida')) {
        category = 'Bebidas';
      } else if (item.productName.toLowerCase().includes('sorvete') || item.productName.toLowerCase().includes('sobremesa')) {
        category = 'Sobremesas';
      }

      const existing = categoryStats.get(category) || { count: 0, total: 0 };
      categoryStats.set(category, {
        count: existing.count + item.quantity,
        total: existing.total + item.total
      });
    });
  });

  const topCategories = Array.from(categoryStats.entries())
    .map(([name, stats]) => ({ name, ...stats }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 4);

  // Calcular gastos por dia baseado nos dados reais
  const spendingByDayMap = new Map();
  const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  
  daysOfWeek.forEach(day => spendingByDayMap.set(day, 0));
  
  orders.forEach(order => {
    const dayOfWeek = daysOfWeek[order.createdAt.getDay()];
    const existing = spendingByDayMap.get(dayOfWeek) || 0;
    spendingByDayMap.set(dayOfWeek, existing + order.total);
  });

  const spendingByDay = daysOfWeek.map(day => ({
    day,
    spent: spendingByDayMap.get(day) || 0
  }));

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
              <Ionicons name="wallet" size={24} color="#4CAF50" />
              <Text style={styles.summaryValue}>R$ {totalSpent.toFixed(2)}</Text>
              <Text style={styles.summaryLabel}>Total Gasto</Text>
            </View>
            <View style={styles.summaryCard}>
              <Ionicons name="checkmark-circle" size={24} color="#2196F3" />
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

        {/* Gráfico de Gastos */}
        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Gastos por Dia</Text>
          <View style={styles.chartContainer}>
            {spendingByDay.map((day, index) => (
              <View key={index} style={styles.chartBar}>
                <View 
                  style={[
                    styles.chartBarFill, 
                    { height: day.spent > 0 ? (day.spent / 60) * 100 : 5 }
                  ]} 
                />
                <Text style={styles.chartLabel}>{day.day}</Text>
                <Text style={styles.chartValue}>R$ {day.spent.toFixed(0)}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Categorias Mais Compradas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categorias Favoritas</Text>
          {topCategories.map((category, index) => (
            <View key={index} style={styles.categoryItem}>
              <View style={styles.categoryRank}>
                <Text style={styles.rankNumber}>{index + 1}</Text>
              </View>
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryCount}>{category.count} pedidos</Text>
              </View>
              <Text style={styles.categoryTotal}>R$ {category.total.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        {/* Lista de Pedidos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Histórico de Pedidos</Text>
          {orders.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="receipt-outline" size={48} color="#CCC" />
              <Text style={styles.emptyText}>Nenhum pedido encontrado</Text>
              <Text style={styles.emptySubtext}>Faça seu primeiro pedido para ver o histórico aqui</Text>
            </View>
          ) : (
            orders.map((order) => (
              <View key={order.id} style={styles.orderItem}>
                <View style={styles.orderHeader}>
                  <Text style={styles.orderId}>Pedido #{order.id}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
                    <Text style={styles.statusText}>{getStatusText(order.status)}</Text>
                  </View>
                </View>
                
                <View style={styles.orderItems}>
                  {order.items.map((item) => (
                    <Text key={item.id} style={styles.orderItemText}>
                      {item.quantity}x {item.productName} - R$ {item.total.toFixed(2)}
                    </Text>
                  ))}
                </View>
                
                <View style={styles.orderFooter}>
                  <Text style={styles.orderDate}>
                    {order.createdAt.toLocaleDateString('pt-BR')}
                  </Text>
                  <Text style={styles.orderTotal}>R$ {order.total.toFixed(2)}</Text>
                </View>
              </View>
            ))
          )}
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
  categoryItem: {
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
  categoryRank: {
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
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  categoryCount: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  categoryTotal: {
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
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
}); 