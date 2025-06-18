import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens';
import { RegisterScreen } from '../screens';
import { MenuScreen } from '../screens';
import { ProductDetailScreen } from '../screens';
import { ProfileScreen } from '../screens';
import { CartScreen } from '../screens';
import { PaymentScreen } from '../screens';
import { ConfirmationScreen } from '../screens';

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