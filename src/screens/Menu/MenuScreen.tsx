import React, { useState, useEffect } from 'react';
import { styles } from './styles';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { productService, Product } from '../../services/productService';
import { useUser } from '../../context/UserContext';

type MenuScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Menu'>;

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  isFavorite: boolean;
}

export default function MenuScreen() {
  const navigation = useNavigation<MenuScreenNavigationProp>();
  const [searchText, setSearchText] = useState('');
  const [menuItems, setMenuItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useUser();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      console.log('🔍 Buscando produtos do Firestore...');
      const products = await productService.getAllProducts();
       console.log('📦 Produtos carregados:', products);
      setMenuItems(products);
    } catch (error) {
      console.error('❌ Erro ao carregar produtos:', error);
    }
    setLoading(false);
  };

  const toggleFavorite = (id: string) => {
    // Função de favorito desabilitada para produtos reais
  };

  const renderMenuItem = (item: Product) => (
    <TouchableOpacity 
      key={item.id} 
      style={styles.menuItem}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <View style={styles.imageContainer}>
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={{ width: 60, height: 60, borderRadius: 30 }} />
        ) : (
          <Text style={styles.foodEmoji}>🍔</Text>
        )}
      </View>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <View style={styles.itemFooter}>
        <Text style={styles.itemPrice}>R$ {item.price?.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.logo}>IpuFood</Text>
          <Text style={styles.subtitle}>Adicione suas comidas favoritas!</Text>
        </View>
        <TouchableOpacity style={styles.profileContainer} onPress={() => navigation.navigate('Profile')}>
          <View style={styles.profileImage}>
            <Ionicons name="person" size={24} color="#666" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <MaterialIcons name="tune" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Botão Adicionar Produto (apenas admin) */}
      {isAdmin && (
        <TouchableOpacity style={{ backgroundColor: '#FF6B35', padding: 12, borderRadius: 8, alignItems: 'center', margin: 16 }} onPress={() => navigation.navigate('ProductEdit')}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>+ Adicionar Produto</Text>
        </TouchableOpacity>
      )}

      {/* Menu Items */}
      <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.menuGrid}>
          {loading ? (
            <Text>Loading products...</Text>
          ) : menuItems.length === 0 ? (
            <Text>No products found.</Text>
          ) : (
            menuItems.map(renderMenuItem)
          )}
        </View>
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Cart Button */}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('Cart')}>
        <Ionicons name="bag" size={24} color="white" />
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Menu')}>
          <Ionicons name="home" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('PurchaseReport')}>
          <Ionicons name="receipt-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}