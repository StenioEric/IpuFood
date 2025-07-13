import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { productService, Product } from '../../services/productService';
import { useUser } from '../../context/UserContext';

export default function ProductListScreen() {
  const navigation = useNavigation();
  const { isAdmin } = useUser();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const data = await productService.getAllProducts();
    setProducts(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    Alert.alert('Excluir produto', 'Tem certeza que deseja excluir este produto?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: async () => {
        await productService.deleteProduct(id);
        loadProducts();
      }}
    ]);
  };

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.desc}>{item.description}</Text>
        <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
      </View>
      {isAdmin && (
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => navigation.navigate('ProductEdit', { productId: item.id })}>
            <Text style={styles.edit}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item.id)}>
            <Text style={styles.delete}>Excluir</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produtos</Text>
      {isAdmin && (
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('ProductEdit')}>
          <Text style={styles.addButtonText}>+ Novo Produto</Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        refreshing={loading}
        onRefresh={loadProducts}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum produto cadastrado.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  addButton: { backgroundColor: '#FF6B35', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 16 },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  item: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f7f7f7', borderRadius: 8, padding: 16, marginBottom: 12 },
  name: { fontSize: 18, fontWeight: 'bold' },
  desc: { color: '#666', marginTop: 4 },
  price: { color: '#4CAF50', fontWeight: 'bold', marginTop: 4 },
  actions: { marginLeft: 16, alignItems: 'flex-end' },
  edit: { color: '#2196F3', marginBottom: 8 },
  delete: { color: '#F44336' },
  empty: { textAlign: 'center', color: '#999', marginTop: 40 },
}); 