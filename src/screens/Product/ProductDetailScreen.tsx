import React, { useState, useEffect } from 'react';
import { styles } from './styles';

import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { productService, Product } from '../../services/productService';
import { useCart } from '../../context/CartContext';

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
  const { productId } = (route.params as any) || {};

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  useEffect(() => {
    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const loadProduct = async () => {
    setLoading(true);
    const data = await productService.getProductById(productId);
    setProduct(data);
    setLoading(false);
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const addToCartHandler = () => {
    if (product) {
      addToCart(product, quantity);
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes do Produto</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          {product?.imageUrl ? (
            <Image source={{ uri: product.imageUrl }} style={{ width: 120, height: 120, borderRadius: 60 }} />
          ) : (
            <Text style={styles.productImage}>🍔</Text>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product?.name || 'Cheeseburger Wendy\'s Burger'}</Text>
          
          {/* Rating and Time */}
          <View style={styles.ratingRow}>
            {/* Rating removido pois não existe no modelo real */}
            <Text style={styles.timeText}>26 mins</Text>
          </View>

          {/* Description */}
          <Text style={styles.description}>
            {product?.description || 'The Cheeseburger Wendy\'s Burger is a classic fast food burger that packs a punch of flavor in every bite. Made with a juicy beef patty cooked to perfection, it\'s topped with melted American cheese, crispy lettuce, ripe tomato, and crunchy pickles.'}
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
          <Text style={styles.price}>R$ {((product?.price || 4.9) * quantity).toFixed(2).replace('.', ',')}</Text>

          {/* Add Button */}
          <TouchableOpacity style={styles.addButton} onPress={addToCartHandler}>
            <Text style={styles.addButtonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}