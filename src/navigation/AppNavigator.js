import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#FFF' },
      headerTintColor: '#8B4513',
      headerTitleStyle: { fontWeight: '700' },
      headerShadowVisible: false,
      contentStyle: { backgroundColor: '#F9F6F2' },
    }}
  >
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: 'Luxury Handbags',
        headerTitleStyle: { fontWeight: '800', fontSize: 20, color: '#8B4513' },
      }}
    />
    <Stack.Screen
      name="Detail"
      component={DetailScreen}
      options={{ title: 'Product Detail' }}
    />
  </Stack.Navigator>
);

const FavoritesStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#FFF' },
      headerTintColor: '#8B4513',
      headerTitleStyle: { fontWeight: '700' },
      headerShadowVisible: false,
    }}
  >
    <Stack.Screen
      name="Favorites"
      component={FavoritesScreen}
      options={{
        title: 'My Favorites',
        headerTitleStyle: { fontWeight: '800', fontSize: 20, color: '#8B4513' },
      }}
    />
    <Stack.Screen
      name="Detail"
      component={DetailScreen}
      options={{ title: 'Product Detail' }}
    />
  </Stack.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'FavoritesTab') {
            iconName = focused ? 'heart' : 'heart-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#8B4513',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#FFF',
          borderTopWidth: 1,
          borderTopColor: '#F0E8E0',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.08,
          shadowRadius: 6,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesStack}
        options={{ tabBarLabel: 'Favorites' }}
      />
    </Tab.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
