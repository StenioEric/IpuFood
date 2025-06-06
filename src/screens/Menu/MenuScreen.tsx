import React, { useState } from 'react';
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
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: '1',
      name: 'Cheeseburger',
      description: "Wendy's Burger",
      price: 4.9,
      rating: 4.9,
      image: '🍔',
      isFavorite: false,
    },
    {
      id: '2',
      name: 'Hamburger',
      description: 'Veggie Burger',
      price: 4.8,
      rating: 4.8,
      image: '🍔',
      isFavorite: false,
    },
    {
      id: '3',
      name: 'Hamburger',
      description: 'Chicken Burger',
      price: 4.6,
      rating: 4.6,
      image: '🍔',
      isFavorite: false,
    },
    {
      id: '4',
      name: 'Hamburger',
      description: 'Fried Chicken Burger',
      price: 4.5,
      rating: 4.5,
      image: '🍔',
      isFavorite: false,
    },
  ]);

  const toggleFavorite = (id: string) => {
    setMenuItems(items =>
      items.map(item =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const renderMenuItem = (item: MenuItem) => (
    <TouchableOpacity 
      key={item.id} 
      style={styles.menuItem}
      onPress={() => navigation.navigate('ProductDetail', {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        rating: item.rating,
        image: item.image,
      })}
    >
      <View style={styles.imageContainer}>
        <Text style={styles.foodEmoji}>{item.image}</Text>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={(e) => {
            e.stopPropagation();
            toggleFavorite(item.id);
          }}
        >
          <Ionicons
            name={item.isFavorite ? 'heart' : 'heart-outline'}
            size={20}
            color={item.isFavorite ? '#FF5A5F' : '#666'}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <View style={styles.itemFooter}>
        <Text style={styles.itemPrice}>${item.price}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={12} color="#FFD700" />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
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

      {/* Menu Items */}
      <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.menuGrid}>
          {menuItems.map(renderMenuItem)}
        </View>
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Cart Button */}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('Cart')}>
        <Ionicons name="bag" size={24} color="white" />
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="bag-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="receipt-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: 'white',
  },
  headerLeft: {
    flex: 1,
  },
  logo: {
    fontSize: 24,
    fontFamily: 'Lobster_400Regular',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  profileContainer: {
    marginLeft: 15,
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    gap: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    width: 50,
    height: 50,
    backgroundColor: '#FF5A5F',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    width: '100%',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 10,
  },
  foodEmoji: {
    fontSize: 60,
  },
  favoriteButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'white',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
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
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  itemDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  rating: {
    fontSize: 12,
    color: '#666',
  },
  fab: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    width: 56,
    height: 56,
    backgroundColor: '#FF5A5F',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FF5A5F',
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
  },
  navItem: {
    padding: 5,
  },
  bottomPadding: {
    height: 20,
  },
}); 