import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
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
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  searchButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    width: '100%',
  },
  imageContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: 'white',
  },
  productImage: {
    fontSize: 200,
  },
  productInfo: {
    padding: 20,
    width: '100%',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    width: '100%',
    flexWrap: 'wrap',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 15,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  ratingText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  timeText: {
    fontSize: 14,
    color: '#666',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 25,
    width: '100%',
    flexWrap: 'wrap',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  portionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    gap: 20,
    width: '100%',
  },
  quantityButton: {
    width: 36,
    height: 36,
    backgroundColor: '#FF5A5F',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    minWidth: 30,
    textAlign: 'center',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF5A5F',
    marginBottom: 25,
  },
  addButton: {
    backgroundColor: '#444',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
    maxWidth: 300,
    alignSelf: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 