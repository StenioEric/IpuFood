import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MenuScreen } from '../screens';
import ProductDetailScreen from '../screens/Product/ProductDetailScreen';

export type MainStackParamList = {
  Menu: undefined;
  ProductDetail: {
    id: string;
    name: string;
    description: string;
    price: number;
    rating: number;
    image: string;
  };
};

const Stack = createStackNavigator<MainStackParamList>();

export default function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
} 