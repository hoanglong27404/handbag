import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ChatbotScreen from '../screens/ChatbotScreen';
import StoreMapScreen from '../screens/StoreMapScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const stackScreenOptions = {
  headerStyle: { backgroundColor: '#FFF' },
  headerTintColor: '#8B4513',
  headerTitleStyle: { fontWeight: '700' },
  headerShadowVisible: false,
  contentStyle: { backgroundColor: '#F9F6F2' },
};

const HomeStack = () => (
  <Stack.Navigator screenOptions={stackScreenOptions}>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: 'Túi Xách Cao Cấp',
        headerTitleStyle: { fontWeight: '800', fontSize: 20, color: '#8B4513' },
      }}
    />
    <Stack.Screen
      name="Detail"
      component={DetailScreen}
      options={{ title: 'Chi Tiết Sản Phẩm' }}
    />
    <Stack.Screen
      name="StoreMap"
      component={StoreMapScreen}
      options={{ title: 'Tìm Cửa Hàng' }}
    />
  </Stack.Navigator>
);

const FavoritesStack = () => (
  <Stack.Navigator screenOptions={stackScreenOptions}>
    <Stack.Screen
      name="Favorites"
      component={FavoritesScreen}
      options={{
        title: 'Yêu Thích Của Tôi',
        headerTitleStyle: { fontWeight: '800', fontSize: 20, color: '#8B4513' },
      }}
    />
    <Stack.Screen
      name="Detail"
      component={DetailScreen}
      options={{ title: 'Chi Tiết Sản Phẩm' }}
    />
    <Stack.Screen
      name="StoreMap"
      component={StoreMapScreen}
      options={{ title: 'Tìm Cửa Hàng' }}
    />
  </Stack.Navigator>
);

const ChatStack = () => (
  <Stack.Navigator screenOptions={stackScreenOptions}>
    <Stack.Screen
      name="Chatbot"
      component={ChatbotScreen}
      options={{
        title: 'Trợ Lý AI',
        headerTitleStyle: { fontWeight: '800', fontSize: 20, color: '#8B4513' },
      }}
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
          } else if (route.name === 'ChatTab') {
            iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
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
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        headerShown: false,
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} options={{ tabBarLabel: 'Trang Chủ' }} />
      <Tab.Screen name="FavoritesTab" component={FavoritesStack} options={{ tabBarLabel: 'Yêu Thích' }} />
      <Tab.Screen name="ChatTab" component={ChatStack} options={{ tabBarLabel: 'Trợ Lý AI' }} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
