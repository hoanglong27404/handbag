import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StarRating from '../components/StarRating';
import RatingBar from '../components/RatingBar';
import { MOCK_FEEDBACKS } from '../constants/data';
import { getFavorites, addFavorite, removeFavorite } from '../services/storage';

const { width } = Dimensions.get('window');

const DetailScreen = ({ route, navigation }) => {
  const { handbag } = route.params;
  const [isFav, setIsFav] = useState(false);
  const feedbacks = MOCK_FEEDBACKS[handbag.id] || [];

  const avgRating =
    feedbacks.length > 0
      ? feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length
      : 0;

  // Group ratings
  const ratingGroups = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: feedbacks.filter((f) => f.rating === star).length,
  }));

  const discountedPrice = handbag.cost * (1 - handbag.percentOff);

  useEffect(() => {
    const checkFav = async () => {
      const favs = await getFavorites();
      setIsFav(favs.some((f) => f.id === handbag.id));
    };
    checkFav();
  }, []);

  const handleToggleFavorite = useCallback(async () => {
    if (isFav) {
      await removeFavorite(handbag.id);
      setIsFav(false);
      Alert.alert('Removed', `${handbag.handbagName} removed from favorites.`);
    } else {
      await addFavorite(handbag);
      setIsFav(true);
      Alert.alert('Added', `${handbag.handbagName} added to favorites!`);
    }
  }, [isFav]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={handleToggleFavorite} style={{ marginRight: 16 }}>
          <Ionicons
            name={isFav ? 'heart' : 'heart-outline'}
            size={24}
            color={isFav ? '#E53935' : '#8B4513'}
          />
        </Pressable>
      ),
    });
  }, [isFav, handleToggleFavorite]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: handbag.uri }} style={styles.image} resizeMode="cover" />
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{Math.round(handbag.percentOff * 100)}% OFF</Text>
        </View>
        <View style={[styles.genderBadge, handbag.gender ? styles.genderMale : styles.genderFemale]}>
          <Ionicons name={handbag.gender ? 'male' : 'female'} size={14} color="#FFF" />
          <Text style={styles.genderText}>{handbag.gender ? 'Male' : 'Female'}</Text>
        </View>
      </View>

      <View style={styles.content}>
        {/* Brand & Name */}
        <Text style={styles.brand}>{handbag.brand}</Text>
        <Text style={styles.name}>{handbag.handbagName}</Text>

        {/* Price */}
        <View style={styles.priceRow}>
          <Text style={styles.price}>${discountedPrice.toFixed(2)}</Text>
          <Text style={styles.originalPrice}>${handbag.cost.toFixed(2)}</Text>
          <View style={styles.saveBadge}>
            <Text style={styles.saveText}>Save {Math.round(handbag.percentOff * 100)}%</Text>
          </View>
        </View>

        {/* Details Grid */}
        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Product Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Category</Text>
            <Text style={styles.detailValue}>{handbag.category}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Colors</Text>
            <View style={styles.colorsRow}>
              {handbag.color.map((c) => (
                <Text key={c} style={styles.colorChip}>{c}</Text>
              ))}
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Gender</Text>
            <View style={styles.genderRow}>
              <Ionicons
                name={handbag.gender ? 'male' : 'female'}
                size={16}
                color={handbag.gender ? '#1565C0' : '#E91E63'}
              />
              <Text style={[styles.detailValue, { marginLeft: 4 }]}>
                {handbag.gender ? 'Male' : 'Female'}
              </Text>
            </View>
          </View>
        </View>

        {/* Add to Favorite Button */}
        <Pressable
          style={[styles.favButton, isFav && styles.favButtonActive]}
          onPress={handleToggleFavorite}
        >
          <Ionicons
            name={isFav ? 'heart' : 'heart-outline'}
            size={20}
            color={isFav ? '#FFF' : '#8B4513'}
          />
          <Text style={[styles.favButtonText, isFav && styles.favButtonTextActive]}>
            {isFav ? 'Remove from Favorites' : 'Add to Favorites'}
          </Text>
        </Pressable>

        {/* Ratings Section */}
        <View style={styles.ratingsCard}>
          <Text style={styles.sectionTitle}>Customer Ratings & Reviews</Text>

          {feedbacks.length === 0 ? (
            <Text style={styles.noReviews}>No reviews yet.</Text>
          ) : (
            <>
              {/* Overall Rating */}
              <View style={styles.overallRow}>
                <Text style={styles.avgNumber}>{avgRating.toFixed(1)}</Text>
                <View style={styles.avgDetails}>
                  <StarRating rating={avgRating} size={20} />
                  <Text style={styles.totalReviews}>{feedbacks.length} reviews</Text>
                </View>
              </View>

              {/* Rating Breakdown */}
              <View style={styles.breakdown}>
                {ratingGroups.map(({ star, count }) => (
                  <RatingBar key={star} star={star} count={count} total={feedbacks.length} />
                ))}
              </View>

              {/* Comments */}
              <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Comments</Text>
              {feedbacks.map((fb) => (
                <View key={fb.id} style={styles.feedbackItem}>
                  <View style={styles.feedbackHeader}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>{fb.user[0]}</Text>
                    </View>
                    <View style={styles.feedbackMeta}>
                      <Text style={styles.feedbackUser}>{fb.user}</Text>
                      <Text style={styles.feedbackDate}>{fb.date}</Text>
                    </View>
                    <StarRating rating={fb.rating} size={13} />
                  </View>
                  <Text style={styles.feedbackComment}>{fb.comment}</Text>
                </View>
              ))}
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F6F2',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: width,
    height: width * 0.8,
    backgroundColor: '#F5F5F5',
  },
  discountBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#E53935',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  discountText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },
  genderBadge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 4,
  },
  genderMale: {
    backgroundColor: '#1565C0',
  },
  genderFemale: {
    backgroundColor: '#E91E63',
  },
  genderText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  brand: {
    fontSize: 12,
    color: '#8B4513',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
    lineHeight: 28,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  price: {
    fontSize: 24,
    fontWeight: '800',
    color: '#E53935',
  },
  originalPrice: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  saveBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  saveText: {
    color: '#2E7D32',
    fontSize: 12,
    fontWeight: '600',
  },
  detailsCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
  colorsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    justifyContent: 'flex-end',
  },
  colorChip: {
    fontSize: 12,
    color: '#555',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  genderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: '#8B4513',
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 16,
    backgroundColor: '#FFF',
  },
  favButtonActive: {
    backgroundColor: '#8B4513',
    borderColor: '#8B4513',
  },
  favButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#8B4513',
  },
  favButtonTextActive: {
    color: '#FFF',
  },
  ratingsCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  noReviews: {
    color: '#999',
    textAlign: 'center',
    paddingVertical: 16,
  },
  overallRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  avgNumber: {
    fontSize: 48,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  avgDetails: {
    flex: 1,
  },
  totalReviews: {
    marginTop: 4,
    color: '#888',
    fontSize: 13,
  },
  breakdown: {
    gap: 4,
  },
  feedbackItem: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
    marginTop: 12,
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#8B4513',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },
  feedbackMeta: {
    flex: 1,
  },
  feedbackUser: {
    fontWeight: '600',
    fontSize: 14,
    color: '#1A1A1A',
  },
  feedbackDate: {
    fontSize: 11,
    color: '#AAA',
  },
  feedbackComment: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
});

export default DetailScreen;
