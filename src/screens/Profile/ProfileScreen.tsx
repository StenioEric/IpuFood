import React from "react";
import { styles } from "./styles";

import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/RootNavigator";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import { useUser } from "../../context/UserContext";
import { userService } from "../../services/userService";
import { orderService, Order } from '../../services/orderService';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Profile"
>;

type ProfileFormData = {
  name: string;
  email: string;
  address: string;
  phone: string; 
};

const schema = yup.object({
  name: yup.string().required('Informe seu nome'),
  email: yup.string().email('Email inválido').required('Informe seu email'),
  address: yup.string().required('Informe seu endereço'),
  phone: yup
    .string()
    .required('Informe seu telefone')
    .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Telefone inválido - Use (11) 88888-8888'),
});

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { user, logout } = useUser();
  const [editing, setEditing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [userData, setUserData] = React.useState<any>(null);
  const [adminOrders, setAdminOrders] = React.useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = React.useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState:{errors}
  } = useForm<ProfileFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: userData?.name || '',
      email: userData?.email || '',
      address: userData?.address || '',
      phone: userData?.phone || '',
    }
  });

  // Carregar dados do usuário quando o componente montar
  React.useEffect(() => {
    const loadUserData = async () => {
      if (user?.id) {
        try {
          const userDoc = await userService.getUserById(user.id);
          if (userDoc) {
            setUserData(userDoc);
            reset({
              name: userDoc.name,
              email: userDoc.email,
              address: userDoc.address,
              phone: userDoc.phone,
            });
          }
        } catch (error) {
          console.error('Erro ao carregar dados do usuário:', error);
        }
      }
    };

    loadUserData();
  }, [user?.id, reset]);

  // Carregar pedidos para admin
  React.useEffect(() => {
    const fetchOrders = async () => {
      if (user?.role === 'admin') {
        setOrdersLoading(true);
        try {
          const allOrders = await orderService.getAllOrders();
          setAdminOrders(allOrders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled'));
        } catch (e) {
          // erro silencioso
        }
        setOrdersLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert('Erro', 'Erro ao fazer logout');
    }
  };

  const handleEditProfile = () => {
    setEditing(!editing);
  };

  const handleSaveProfile = async (data: ProfileFormData) => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      await userService.updateUser(user.id, {
        name: data.name,
        email: data.email,
        address: data.address,
        phone: data.phone,
      });
      
      // Atualizar dados locais
      setUserData((prev: any) => ({ ...prev, ...data }));
      setEditing(false);
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao atualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelivery = async (orderId: string) => {
    await orderService.updateOrderStatus(orderId, 'delivered');
    setAdminOrders(prev => prev.filter(o => o.id !== orderId));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Profile Card */}
      <ScrollView style={styles.profileCard} contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        {/* Profile Image */}
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImage}>
            <Ionicons name="person" size={40} color="#666" />
          </View>
        </View>

        {/* Profile Information */}
        <View style={styles.profileInfo}>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Nome</Text>
                <View style={styles.infoField}>
                  <TextInput
                    style={styles.infoText}
                    value={value}
                    onChangeText={onChange}
                    editable={editing}
                    placeholder="Seu nome"
                    placeholderTextColor="#999"
                  />
                </View>
              </View>
            )}
          />
          {errors.name && <Text style={styles.labelError} >{errors.name?.message}</Text> }
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Email</Text>
                <View style={styles.infoField}>
                  <TextInput
                    style={styles.infoText}
                    value={value}
                    onChangeText={onChange}
                    editable={editing}
                    placeholder="seu@email.com"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>
            )}
          />
          {errors.email && <Text style={styles.labelError} >{errors.email?.message}</Text> }
          <Controller
            control={control}
            name="address"
            render={({ field: { onChange, value } }) => (
              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Endereço</Text>
                <View style={styles.infoField}>
                  <TextInput
                    style={styles.infoText}
                    value={value}
                    onChangeText={onChange}
                    editable={editing}
                    placeholder="Seu endereço"
                    placeholderTextColor="#999"
                  />
                </View>
              </View>
            )}
          />
          {errors.address && <Text style={styles.labelError} >{errors.address?.message}</Text> }
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value } }) => (
              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Telefone</Text>
                <View style={styles.infoField}>
                  <TextInput
                    style={styles.infoText}
                    value={value}
                    onChangeText={onChange}
                    editable={editing}
                    placeholder="(11) 88888-8888"
                    placeholderTextColor="#999"
                    keyboardType="phone-pad"
                  />
                </View>
              </View>
            )}
          />
          {errors.phone && <Text style={styles.labelError} >{errors.phone?.message}</Text> }
        </View>

        {/* Relatórios Section */}
        <View style={styles.reportsSection}>
          <Text style={styles.reportsTitle}>Relatórios</Text>
          
          {user?.role === 'admin' && (
            <TouchableOpacity
              style={styles.reportButton}
              onPress={() => navigation.navigate('SalesReport')}
            >
              <Ionicons name="trending-up" size={20} color="#FF6B35" />
              <Text style={styles.reportButtonText}>Relatório de Vendas</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          )}
          
          {user?.role === 'user' && (
            <TouchableOpacity
              style={styles.reportButton}
              onPress={() => navigation.navigate('PurchaseReport')}
            >
              <Ionicons name="bag" size={20} color="#4CAF50" />
              <Text style={styles.reportButtonText}>Meus Pedidos</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>

        {/* Pedidos para Confirmar (admin) */}
        {user?.role === 'admin' && (
          <View style={{ marginVertical: 20 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>Pedidos para Confirmar</Text>
            {ordersLoading ? (
              <ActivityIndicator color="#4CAF50" />
            ) : adminOrders.length === 0 ? (
              <Text style={{ color: '#888' }}>Nenhum pedido pendente.</Text>
            ) : (
              adminOrders.map(order => (
                <View key={order.id} style={{ backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 10, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }}>
                  <Text style={{ fontWeight: 'bold' }}>Pedido #{order.id}</Text>
                  <Text>Cliente: {order.userName}</Text>
                  <Text>Total: R$ {order.total.toFixed(2)}</Text>
                  <Text>Status: {order.status}</Text>
                  <TouchableOpacity
                    style={{ backgroundColor: '#4CAF50', padding: 8, borderRadius: 6, marginTop: 8, alignItems: 'center' }}
                    onPress={() => handleConfirmDelivery(order.id)}
                  >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Confirmar Entrega</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          {!editing ? (
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditProfile}
            >
              <Ionicons
                name="create-outline"
                size={20}
                color="white"
                style={styles.buttonIcon}
              />
              <Text style={styles.editButtonText}>Editar Perfil</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleSubmit(handleSaveProfile)}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <>
                  <Ionicons
                    name="save-outline"
                    size={20}
                    color="white"
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.editButtonText}>Salvar</Text>
                </>
              )}
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons
              name="log-out-outline"
              size={20}
              color="#FF5A5F"
              style={styles.buttonIcon}
            />
            <Text style={styles.logoutButtonText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
