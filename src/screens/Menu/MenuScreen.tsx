import React, { useState } from 'react';
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
          <Ionicons name="receipt-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}