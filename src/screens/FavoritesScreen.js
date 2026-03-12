import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  Pressable,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import StarRating from '../components/StarRating';
import { MOCK_FEEDBACKS } from '../constants/data';
import { getFavorites, removeFavorite, removeAllFavorites } from '../services/storage';

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [searchText, setSearchText] = useState('');

  const loadFavorites = async () => {
    const favs = await getFavorites();
    setFavorites(favs);
  };

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const handleDelete = (id, name) => {
    Alert.alert('Xóa Khỏi Yêu Thích', `Xóa "${name}" khỏi danh sách yêu thích?`, [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: async () => {
          const updated = await removeFavorite(id);
          setFavorites(updated);
        },
      },
    ]);
  };

  const handleDeleteAll = () => {
    if (favorites.length === 0) return;
    Alert.alert('Xóa Tất Cả', 'Xóa tất cả túi xách khỏi danh sách yêu thích?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa Tất Cả',
        style: 'destructive',
        onPress: async () => {
          const updated = await removeAllFavorites();
          setFavorites(updated);
        },
      },
    ]);
  };

  const filtered = favorites.filter((h) =>
    h.handbagName.toLowerCase().includes(searchText.toLowerCase()) ||
    h.brand.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }) => {
    const feedbacks = MOCK_FEEDBACKS[item.id] || [];
    const avgRating =
      feedbacks.length > 0
        ? feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length
        : 0;
    const discountedPrice = item.cost * (1 - item.percentOff);

    return (
      <Pressable
        style={styles.card}
        onPress={() => navigation.navigate('Detail', { handbag: item })}
        android_ripple={{ color: '#EEE' }}
      >
        <Image source={{ uri: item.uri }} style={styles.image} resizeMode="cover" />
        <View style={styles.info}>
          <Text style={styles.brand}>{item.brand}</Text>
          <Text style={styles.name} numberOfLines={2}>{item.handbagName}</Text>
          <View style={styles.genderRow}>
            <Ionicons
              name={item.gender ? 'male' : 'female'}
              size={13}
              color={item.gender ? '#1565C0' : '#E91E63'}
            />
            <Text style={[styles.genderText, { color: item.gender ? '#1565C0' : '#E91E63' }]}>
              {item.gender ? 'Nam' : 'Nữ'}
            </Text>
          </View>
          {feedbacks.length > 0 && (
            <StarRating rating={avgRating} size={12} />
          )}
          <View style={styles.priceRow}>
            <Text style={styles.price}>{(discountedPrice).toLocaleString('vi-VN')}₫</Text>
            <Text style={styles.originalPrice}>{item.cost.toLocaleString('vi-VN')}₫</Text>
          </View>
        </View>
        <Pressable
          style={styles.deleteBtn}
          onPress={() => handleDelete(item.id, item.handbagName)}
          hitSlop={8}
        >
          <Ionicons name="trash-outline" size={20} color="#E53935" />
        </Pressable>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={18} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm yêu thích..."
          placeholderTextColor="#AAA"
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText.length > 0 && (
          <Pressable onPress={() => setSearchText('')}>
            <Ionicons name="close-circle" size={18} color="#AAA" />
          </Pressable>
        )}
      </View>

      {/* Header with count and delete all */}
      {favorites.length > 0 && (
        <View style={styles.header}>
          <Text style={styles.count}>{filtered.length} sản phẩm</Text>
          <Pressable style={styles.deleteAllBtn} onPress={handleDeleteAll}>
            <Ionicons name="trash" size={14} color="#FFF" />
            <Text style={styles.deleteAllText}>Xóa Tất Cả</Text>
          </Pressable>
        </View>
      )}

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="heart-outline" size={70} color="#DDD" />
            <Text style={styles.emptyTitle}>Chưa có yêu thích nào</Text>
            <Text style={styles.emptySubtitle}>
              {searchText ? 'Không tìm thấy kết quả phù hợp' : 'Hãy thêm những chiếc túi bạn yêu thích!'}
            </Text>
          </View>
        }
        contentContainerStyle={filtered.length === 0 ? styles.emptyContainer : styles.list}
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    margin: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    height: 46,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1A1A1A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  count: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  deleteAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E53935',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  deleteAllText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
  },
  list: {
    paddingHorizontal: 12,
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
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#AAA',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#CCC',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    flexDirection: 'row',
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: '#F5F5F5',
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  brand: {
    fontSize: 10,
    color: '#8B4513',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
    lineHeight: 18,
  },
  genderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  genderText: {
    fontSize: 11,
    fontWeight: '600',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: '#E53935',
  },
  originalPrice: {
    fontSize: 11,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  deleteBtn: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FavoritesScreen;
