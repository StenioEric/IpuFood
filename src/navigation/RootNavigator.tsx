import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, RegisterScreen } from '../screens/Auth';
import { MenuScreen } from '../screens/Menu';
import { ProductDetailScreen } from '../screens/Product';
import { ProfileScreen } from '../screens/Profile';
import { CartScreen } from '../screens/Cart';
import { PaymentScreen } from '../screens/Payment';
import { ConfirmationScreen } from '../screens/Confirmation';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Menu: undefined;
  ProductDetail: {
    id: string;
    name: string;
    description: string;
    price: number;
    rating: number;
    image: string;
  };
  Profile: undefined;
  Cart: undefined;
  Payment: undefined;
  Confirmation: {
    title?: string;
    message?: string;
    buttonText?: string;
    navigateTo?: keyof RootStackParamList;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
    </Stack.Navigator>
  );
} 