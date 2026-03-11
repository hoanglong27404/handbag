import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import BrandFilter from '../components/BrandFilter';
import HandbagCard from '../components/HandbagCard';
import { fetchHandbags } from '../services/api';
import { getFavorites, addFavorite, removeFavorite } from '../services/storage';

const HomeScreen = ({ navigation }) => {
  const [handbags, setHandbags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [favorites, setFavorites] = useState([]);

  const loadData = async () => {
    try {
      const data = await fetchHandbags();
      // Sort descending by cost
      const sorted = [...data].sort((a, b) => b.cost - a.cost);
      setHandbags(sorted);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const loadFavorites = async () => {
    const favs = await getFavorites();
    setFavorites(favs);
  };

  useEffect(() => {
    loadData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const handleRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const handleToggleFavorite = async (item) => {
    const isFav = favorites.some((f) => f.id === item.id);
    if (isFav) {
      const updated = await removeFavorite(item.id);
      setFavorites(updated);
    } else {
      const updated = await addFavorite(item);
      setFavorites(updated);
    }
  };

  const filteredHandbags =
    selectedBrand === 'All'
      ? handbags
      : handbags.filter((h) => h.brand === selectedBrand);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#8B4513" />
        <Text style={styles.loadingText}>Loading handbags...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <BrandFilter selectedBrand={selectedBrand} onSelect={setSelectedBrand} />
      <FlatList
        data={filteredHandbags}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HandbagCard
            item={item}
            isFav={favorites.some((f) => f.id === item.id)}
            onPress={() => navigation.navigate('Detail', { handbag: item })}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="bag-outline" size={60} color="#CCC" />
            <Text style={styles.emptyText}>No handbags found</Text>
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#8B4513']}
          />
        }
        contentContainerStyle={filteredHandbags.length === 0 ? styles.emptyContainer : styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F6F2',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F6F2',
  },
  loadingText: {
    marginTop: 12,
    color: '#8B4513',
    fontSize: 14,
  },
  list: {
    paddingBottom: 16,
  },
  emptyContainer: {
    flex: 1,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyText: {
    marginTop: 12,
    color: '#AAA',
    fontSize: 16,
  },
});

export default HomeScreen;
