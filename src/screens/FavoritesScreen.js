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
import { getFavorites, removeFavorite, removeAllFavorites } from '../services/storage';

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedIds, setSelectedIds] = useState(new Set());

  const loadFavorites = async () => {
    const favs = await getFavorites();
    setFavorites(favs);
    setSelectedIds(new Set());
  };

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleDeleteSelected = () => {
    if (selectedIds.size === 0) return;
    Alert.alert(
      'Xóa Đã Chọn',
      `Xóa ${selectedIds.size} sản phẩm đã chọn khỏi danh sách yêu thích?`,
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: async () => {
            let current = await getFavorites();
            for (const id of selectedIds) {
              current = await removeFavorite(id);
            }
            setFavorites(current);
            setSelectedIds(new Set());
          },
        },
      ]
    );
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
          setSelectedIds(new Set());
        },
      },
    ]);
  };

  const filtered = favorites.filter((h) =>
    h.handbagName.toLowerCase().includes(searchText.toLowerCase()) ||
    h.brand.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }) => {
    const itemFeedbacks = Array.isArray(item.feedbacks) ? item.feedbacks : [];
    const avgRating =
      itemFeedbacks.length > 0
        ? itemFeedbacks.reduce((sum, f) => sum + f.rating, 0) / itemFeedbacks.length
        : 0;
    const discountedPrice = item.cost * (1 - item.percentOff);
    const isSelected = selectedIds.has(item.id);

    return (
      <Pressable
        style={[styles.card, isSelected && styles.cardSelected]}
        onPress={() => navigation.navigate('Detail', { handbag: item })}
        android_ripple={{ color: '#EEE' }}
      >
        {/* Checkbox */}
        <Pressable
          style={styles.checkboxArea}
          onPress={() => toggleSelect(item.id)}
          hitSlop={8}
        >
          <View style={[styles.checkbox, isSelected && styles.checkboxChecked]}>
            {isSelected && <Ionicons name="checkmark" size={14} color="#FFF" />}
          </View>
        </Pressable>

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
          {itemFeedbacks.length > 0 && (
            <StarRating rating={avgRating} size={12} />
          )}
          <View style={styles.priceRow}>
            <Text style={styles.price}>{(discountedPrice).toLocaleString('vi-VN')}₫</Text>
            <Text style={styles.originalPrice}>{item.cost.toLocaleString('vi-VN')}₫</Text>
          </View>
        </View>
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

      {/* Header with count and action buttons */}
      {favorites.length > 0 && (
        <View style={styles.header}>
          <Text style={styles.count}>{filtered.length} sản phẩm</Text>
          <View style={styles.headerActions}>
            {selectedIds.size > 0 && (
              <Pressable style={styles.deleteSelectedBtn} onPress={handleDeleteSelected}>
                <Ionicons name="trash-outline" size={14} color="#FFF" />
                <Text style={styles.deleteSelectedText}>Xóa ({selectedIds.size})</Text>
              </Pressable>
            )}
            <Pressable style={styles.deleteAllBtn} onPress={handleDeleteAll}>
              <Ionicons name="trash" size={14} color="#FFF" />
              <Text style={styles.deleteAllText}>Xóa Tất Cả</Text>
            </Pressable>
          </View>
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
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  deleteSelectedBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B4513',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  deleteSelectedText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
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
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    overflow: 'hidden',
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: '#8B4513',
  },
  checkboxArea: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#CCC',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  checkboxChecked: {
    backgroundColor: '#8B4513',
    borderColor: '#8B4513',
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
});

export default FavoritesScreen;
