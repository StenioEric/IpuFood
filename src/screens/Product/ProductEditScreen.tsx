import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { productService, Product } from '../../services/productService';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { StackNavigationProp } from '@react-navigation/stack';

export default function ProductEditScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { productId } = (route.params as any) || {};

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    category: '',
    available: true,
  });

  useEffect(() => {
    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const loadProduct = async () => {
    setLoading(true);
    const data = await productService.getProductById(productId);
    if (data) setProduct(data);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!product.name || !product.description || !product.price) {
      Alert.alert('Preencha todos os campos obrigatórios!');
      return;
    }
    setLoading(true);
    try {
      if (productId) {
        await productService.updateProduct(productId, product);
        Alert.alert('Produto atualizado com sucesso!');
      } else {
        await productService.createProduct(product as Omit<Product, 'id'>);
        Alert.alert('Produto criado com sucesso!');
      }
      navigation.goBack();
    } catch (e) {
      Alert.alert('Erro ao salvar produto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{productId ? 'Editar Produto' : 'Novo Produto'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={product.name}
        onChangeText={name => setProduct(p => ({ ...p, name }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={product.description}
        onChangeText={description => setProduct(p => ({ ...p, description }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço"
        value={product.price?.toString() || ''}
        onChangeText={price => setProduct(p => ({ ...p, price: Number(price) }))}
        keyboardType="decimal-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="URL da Imagem (opcional)"
        value={product.imageUrl}
        onChangeText={imageUrl => setProduct(p => ({ ...p, imageUrl }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Categoria (opcional)"
        value={product.category}
        onChangeText={category => setProduct(p => ({ ...p, category }))}
      />
      <View style={styles.switchRow}>
        <Text style={{ fontSize: 16 }}>Disponível:</Text>
        <TouchableOpacity
          style={[styles.switch, product.available ? styles.switchOn : styles.switchOff]}
          onPress={() => setProduct(p => ({ ...p, available: !p.available }))}
        >
          <Text style={{ color: '#fff' }}>{product.available ? 'Sim' : 'Não'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveButtonText}>Salvar</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { backgroundColor: '#f7f7f7', borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 16 },
  saveButton: { backgroundColor: '#FF6B35', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  switchRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, marginBottom: 8 },
  switch: { marginLeft: 12, borderRadius: 16, paddingVertical: 6, paddingHorizontal: 18 },
  switchOn: { backgroundColor: '#4CAF50' },
  switchOff: { backgroundColor: '#F44336' },
}); 