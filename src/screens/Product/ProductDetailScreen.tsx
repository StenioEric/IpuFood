import React, { useState } from 'react';
import { styles } from './styles';

import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

interface ProductDetailParams {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
}

export default function ProductDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as ProductDetailParams;
  
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const addToCart = () => {
    // Aqui você implementará a lógica para adicionar ao carrinho
    console.log(`Adicionando ${quantity}x ${params.name} ao carrinho`);
    // Pode navegar de volta ou mostrar uma confirmação
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>product 1</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Text style={styles.productImage}>🍔</Text>
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{params?.name || 'Cheeseburger Wendy\'s Burger'}</Text>
          
          {/* Rating and Time */}
          <View style={styles.ratingRow}>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{params?.rating || '4.9'}</Text>
            </View>
            <Text style={styles.timeText}>26 mins</Text>
          </View>

          {/* Description */}
          <Text style={styles.description}>
            {params?.description || 'The Cheeseburger Wendy\'s Burger is a classic fast food burger that packs a punch of flavor in every bite. Made with a juicy beef patty cooked to perfection, it\'s topped with melted American cheese, crispy lettuce, ripe tomato, and crunchy pickles.'}
          </Text>

          {/* Portions Section */}
          <Text style={styles.sectionTitle}>Porções</Text>
          <View style={styles.portionsContainer}>
            <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
              <Ionicons name="remove" size={20} color="white" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
              <Ionicons name="add" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/* Price */}
          <Text style={styles.price}>R$ {((params?.price || 4.9) * 2.5 * quantity).toFixed(2).replace('.', ',')}</Text>

          {/* Add Button */}
          <TouchableOpacity style={styles.addButton} onPress={addToCart}>
            <Text style={styles.addButtonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}