import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StarRating from './StarRating';
import { MOCK_FEEDBACKS } from '../constants/data';

const HandbagCard = ({ item, onPress, onToggleFavorite, isFav }) => {
  const feedbacks = MOCK_FEEDBACKS[item.id] || [];
  const avgRating =
    feedbacks.length > 0
      ? feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length
      : 0;

  const discountedPrice = item.cost * (1 - item.percentOff);

  return (
    <Pressable style={styles.card} onPress={onPress} android_ripple={{ color: '#eee' }}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.uri }} style={styles.image} resizeMode="cover" />
        {/* Discount badge */}
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>-{Math.round(item.percentOff * 100)}%</Text>
        </View>
        {/* Gender badge */}
        <View style={[styles.genderBadge, item.gender ? styles.genderMale : styles.genderFemale]}>
          <Ionicons
            name={item.gender ? 'male' : 'female'}
            size={12}
            color="#FFF"
          />
        </View>
        {/* Favorite button */}
        <Pressable style={styles.favBtn} onPress={() => onToggleFavorite(item)} hitSlop={8}>
          <Ionicons
            name={isFav ? 'heart' : 'heart-outline'}
            size={22}
            color={isFav ? '#E53935' : '#FFF'}
          />
        </Pressable>
      </View>

      <View style={styles.info}>
        <Text style={styles.brand}>{item.brand}</Text>
        <Text style={styles.name} numberOfLines={2}>
          {item.handbagName}
        </Text>
        <Text style={styles.category}>{item.category}</Text>

        {feedbacks.length > 0 && (
          <View style={styles.ratingRow}>
            <StarRating rating={avgRating} size={13} />
            <Text style={styles.ratingCount}>({feedbacks.length})</Text>
          </View>
        )}

        <View style={styles.priceRow}>
          <Text style={styles.price}>{Math.round(discountedPrice).toLocaleString('vi-VN')}₫</Text>
          <Text style={styles.originalPrice}>{item.cost.toLocaleString('vi-VN')}₫</Text>
        </View>

        {/* Colors */}
        <View style={styles.colorsRow}>
          {item.color.slice(0, 3).map((c) => (
            <Text key={c} style={styles.colorChip}>
              {c}
            </Text>
          ))}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginHorizontal: 12,
    marginVertical: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#F5F5F5',
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#E53935',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  discountText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
  },
  genderBadge: {
    position: 'absolute',
    top: 10,
    right: 44,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  genderMale: {
    backgroundColor: '#1565C0',
  },
  genderFemale: {
    backgroundColor: '#E91E63',
  },
  favBtn: {
    position: 'absolute',
    top: 8,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 16,
    padding: 4,
  },
  info: {
    padding: 12,
  },
  brand: {
    fontSize: 11,
    color: '#8B4513',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
    marginBottom: 2,
  },
  category: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ratingCount: {
    fontSize: 11,
    color: '#888',
    marginLeft: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E53935',
  },
  originalPrice: {
    fontSize: 13,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  colorsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  colorChip: {
    fontSize: 10,
    color: '#666',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
});

export default HandbagCard;
