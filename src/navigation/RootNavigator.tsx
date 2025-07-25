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
import { SalesReportScreen, PurchaseReportScreen } from '../screens';
import ProductListScreen from '../screens/Product/ProductListScreen';
import ProductEditScreen from '../screens/Product/ProductEditScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Menu: undefined;
  ProductList: undefined;
  ProductEdit: { productId?: string } | undefined;
  ProductDetail: { productId: string };
  Profile: undefined;
  Cart: undefined;
  Payment: undefined;
  Confirmation: {
    title?: string;
    message?: string;
    buttonText?: string;
    navigateTo?: keyof RootStackParamList;
  };
  SalesReport: undefined;
  PurchaseReport: undefined;
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
      <Stack.Screen name="ProductList" component={ProductListScreen} />
      <Stack.Screen name="ProductEdit" component={ProductEditScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
      <Stack.Screen name="SalesReport" component={SalesReportScreen} />
      <Stack.Screen name="PurchaseReport" component={PurchaseReportScreen} />
    </Stack.Navigator>
  );
} 