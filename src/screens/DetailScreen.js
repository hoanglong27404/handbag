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
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import StarRating from '../components/StarRating';
import RatingBar from '../components/RatingBar';
import { MOCK_FEEDBACKS } from '../constants/data';
import { getFavorites, addFavorite, removeFavorite } from '../services/storage';
import { getUserComments, saveUserComment } from '../services/commentStorage';

const { width } = Dimensions.get('window');

const DetailScreen = ({ route, navigation }) => {
  const { handbag } = route.params;
  const [isFav, setIsFav] = useState(false);

  // User comments
  const [userComments, setUserComments] = useState([]);
  // Comment form
  const [showForm, setShowForm] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newText, setNewText] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const mockFeedbacks = MOCK_FEEDBACKS[handbag.id] || [];
  const allFeedbacks = [...mockFeedbacks, ...userComments];

  const avgRating =
    allFeedbacks.length > 0
      ? allFeedbacks.reduce((sum, f) => sum + f.rating, 0) / allFeedbacks.length
      : 0;

  const ratingGroups = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: allFeedbacks.filter((f) => f.rating === star).length,
  }));

  const discountedPrice = handbag.cost * (1 - handbag.percentOff);

  useEffect(() => {
    const init = async () => {
      const favs = await getFavorites();
      setIsFav(favs.some((f) => f.id === handbag.id));
      const comments = await getUserComments(handbag.id);
      setUserComments(comments);
    };
    init();
  }, []);

  const handleToggleFavorite = useCallback(async () => {
    if (isFav) {
      await removeFavorite(handbag.id);
      setIsFav(false);
      Alert.alert('Đã Xóa', `${handbag.handbagName} đã xóa khỏi yêu thích.`);
    } else {
      await addFavorite(handbag);
      setIsFav(true);
      Alert.alert('Đã Thêm', `${handbag.handbagName} đã thêm vào yêu thích!`);
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

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Cần Quyền Truy Cập', 'Vui lòng cho phép truy cập thư viện ảnh của bạn.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });
    if (!result.canceled) {
      setNewImage(result.assets[0].uri);
    }
  };

  const handleSubmitComment = async () => {
    if (!newRating || !newText.trim()) return;
    setSubmitting(true);
    const comment = {
      id: `user_${Date.now()}`,
      user: 'Bạn',
      rating: newRating,
      comment: newText.trim(),
      image: newImage,
      date: new Date().toISOString().split('T')[0],
      isUserComment: true,
    };
    const updated = await saveUserComment(handbag.id, comment);
    setUserComments(updated);
    setNewRating(0);
    setNewText('');
    setNewImage(null);
    setShowForm(false);
    setSubmitting(false);
    Alert.alert('Cảm ơn bạn!', 'Đánh giá của bạn đã được gửi thành công.');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: handbag.uri }} style={styles.image} resizeMode="cover" />
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>-{Math.round(handbag.percentOff * 100)}%</Text>
        </View>
        <View style={[styles.genderBadge, handbag.gender ? styles.genderMale : styles.genderFemale]}>
          <Ionicons name={handbag.gender ? 'male' : 'female'} size={14} color="#FFF" />
          <Text style={styles.genderText}>{handbag.gender ? 'Nam' : 'Nữ'}</Text>
        </View>
      </View>

      <View style={styles.content}>
        {/* Brand & Name */}
        <Text style={styles.brand}>{handbag.brand}</Text>
        <Text style={styles.name}>{handbag.handbagName}</Text>

        {/* Price */}
        <View style={styles.priceRow}>
          <Text style={styles.price}>{Math.round(discountedPrice).toLocaleString('vi-VN')}₫</Text>
          <Text style={styles.originalPrice}>{handbag.cost.toLocaleString('vi-VN')}₫</Text>
          <View style={styles.saveBadge}>
            <Text style={styles.saveText}>Tiết kiệm {Math.round(handbag.percentOff * 100)}%</Text>
          </View>
        </View>

        {/* Details Grid */}
        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Thông Tin Sản Phẩm</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Loại Túi</Text>
            <Text style={styles.detailValue}>{handbag.category}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Màu Sắc</Text>
            <View style={styles.colorsRow}>
              {handbag.color.map((c) => (
                <Text key={c} style={styles.colorChip}>{c}</Text>
              ))}
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Giới Tính</Text>
            <View style={styles.genderRow}>
              <Ionicons
                name={handbag.gender ? 'male' : 'female'}
                size={16}
                color={handbag.gender ? '#1565C0' : '#E91E63'}
              />
              <Text style={[styles.detailValue, { marginLeft: 4 }]}>
                {handbag.gender ? 'Nam' : 'Nữ'}
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
            {isFav ? 'Xóa Khỏi Yêu Thích' : 'Thêm Vào Yêu Thích'}
          </Text>
        </Pressable>

        {/* Find Store Button */}
        <Pressable
          style={styles.storeButton}
          onPress={() => navigation.navigate('StoreMap', { brand: handbag.brand })}
        >
          <Ionicons name="location-outline" size={20} color="#8B4513" />
          <Text style={styles.storeButtonText}>Tìm Cửa Hàng {handbag.brand}</Text>
          <Ionicons name="chevron-forward" size={16} color="#8B4513" />
        </Pressable>

        {/* Ratings Section */}
        <View style={styles.ratingsCard}>
          <Text style={styles.sectionTitle}>Đánh Giá & Nhận Xét</Text>

          {allFeedbacks.length === 0 ? (
            <Text style={styles.noReviews}>Chưa có đánh giá. Hãy là người đầu tiên!</Text>
          ) : (
            <>
              {/* Overall Rating */}
              <View style={styles.overallRow}>
                <Text style={styles.avgNumber}>{avgRating.toFixed(1)}</Text>
                <View style={styles.avgDetails}>
                  <StarRating rating={avgRating} size={20} />
                  <Text style={styles.totalReviews}>{allFeedbacks.length} đánh giá</Text>
                </View>
              </View>

              {/* Rating Breakdown */}
              <View style={styles.breakdown}>
                {ratingGroups.map(({ star, count }) => (
                  <RatingBar key={star} star={star} count={count} total={allFeedbacks.length} />
                ))}
              </View>

              {/* Comments */}
              <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Bình Luận</Text>
              {allFeedbacks.map((fb) => (
                <View key={fb.id} style={styles.feedbackItem}>
                  <View style={styles.feedbackHeader}>
                    <View style={[styles.avatar, fb.isUserComment && styles.avatarUser]}>
                      <Text style={styles.avatarText}>{fb.user[0]}</Text>
                    </View>
                    <View style={styles.feedbackMeta}>
                      <View style={styles.feedbackNameRow}>
                        <Text style={styles.feedbackUser}>{fb.user}</Text>
                        {fb.isUserComment && (
                          <View style={styles.youBadge}>
                            <Text style={styles.youBadgeText}>You</Text>
                          </View>
                        )}
                      </View>
                      <Text style={styles.feedbackDate}>{fb.date}</Text>
                    </View>
                    <StarRating rating={fb.rating} size={13} />
                  </View>
                  <Text style={styles.feedbackComment}>{fb.comment}</Text>
                  {fb.image && (
                    <Image source={{ uri: fb.image }} style={styles.feedbackImage} resizeMode="cover" />
                  )}
                </View>
              ))}
            </>
          )}

          {/* Write a Review */}
          <View style={styles.writeReviewSection}>
            <Pressable
              style={styles.writeReviewToggle}
              onPress={() => setShowForm((f) => !f)}
            >
              <Ionicons name="create-outline" size={18} color="#8B4513" />
              <Text style={styles.writeReviewText}>Viết Đánh Giá</Text>
              <Ionicons
                name={showForm ? 'chevron-up' : 'chevron-down'}
                size={16}
                color="#8B4513"
              />
            </Pressable>

            {showForm && (
              <View style={styles.reviewForm}>
                {/* Star Selector */}
                <Text style={styles.formLabel}>Số Sao Của Bạn *</Text>
                <View style={styles.starSelector}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Pressable key={star} onPress={() => setNewRating(star)}>
                      <Ionicons
                        name={star <= newRating ? 'star' : 'star-outline'}
                        size={34}
                        color={star <= newRating ? '#F4C430' : '#DDD'}
                      />
                    </Pressable>
                  ))}
                </View>

                {/* Comment Input */}
                <Text style={styles.formLabel}>Nhận Xét Của Bạn *</Text>
                <TextInput
                  style={styles.commentInput}
                  placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                  placeholderTextColor="#AAA"
                  multiline
                  numberOfLines={4}
                  value={newText}
                  onChangeText={setNewText}
                  maxLength={500}
                  textAlignVertical="top"
                />

                {/* Image Picker */}
                <Pressable style={styles.imagePickerBtn} onPress={handlePickImage}>
                  <Ionicons name="image-outline" size={20} color="#8B4513" />
                  <Text style={styles.imagePickerText}>
                    {newImage ? 'Đổi Ảnh' : 'Thêm Ảnh (tùy chọn)'}
                  </Text>
                </Pressable>

                {newImage && (
                  <View style={styles.previewContainer}>
                    <Image source={{ uri: newImage }} style={styles.previewImage} resizeMode="cover" />
                    <Pressable
                      style={styles.removeImageBtn}
                      onPress={() => setNewImage(null)}
                    >
                      <Ionicons name="close-circle" size={22} color="#E53935" />
                    </Pressable>
                  </View>
                )}

                {/* Submit */}
                <Pressable
                  style={[
                    styles.submitBtn,
                    (submitting || !newText.trim() || !newRating) && styles.submitBtnDisabled,
                  ]}
                  onPress={handleSubmitComment}
                  disabled={submitting || !newText.trim() || !newRating}
                >
                  {submitting ? (
                    <ActivityIndicator color="#FFF" size="small" />
                  ) : (
                    <>
                      <Ionicons name="send" size={16} color="#FFF" />
                      <Text style={styles.submitBtnText}>Gửi Đánh Giá</Text>
                    </>
                  )}
                </Pressable>
              </View>
            )}
          </View>
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
  genderMale: { backgroundColor: '#1565C0' },
  genderFemale: { backgroundColor: '#E91E63' },
  genderText: { color: '#FFF', fontSize: 12, fontWeight: '600' },
  content: { padding: 16 },
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
  price: { fontSize: 24, fontWeight: '800', color: '#E53935' },
  originalPrice: { fontSize: 16, color: '#999', textDecorationLine: 'line-through' },
  saveBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  saveText: { color: '#2E7D32', fontSize: 12, fontWeight: '600' },
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
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A1A', marginBottom: 12 },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  detailLabel: { fontSize: 14, color: '#666', fontWeight: '500' },
  detailValue: { fontSize: 14, color: '#1A1A1A', fontWeight: '600' },
  divider: { height: 1, backgroundColor: '#F0F0F0' },
  colorsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, justifyContent: 'flex-end' },
  colorChip: {
    fontSize: 12,
    color: '#555',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  genderRow: { flexDirection: 'row', alignItems: 'center' },
  favButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: '#8B4513',
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 12,
    backgroundColor: '#FFF',
  },
  favButtonActive: { backgroundColor: '#8B4513', borderColor: '#8B4513' },
  favButtonText: { fontSize: 16, fontWeight: '700', color: '#8B4513' },
  favButtonTextActive: { color: '#FFF' },
  storeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderColor: '#8B4513',
    borderRadius: 12,
    paddingVertical: 12,
    marginBottom: 16,
    backgroundColor: '#FDF8F4',
  },
  storeButtonText: { fontSize: 15, fontWeight: '600', color: '#8B4513', flex: 1, textAlign: 'center' },
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
  noReviews: { color: '#999', textAlign: 'center', paddingVertical: 16 },
  overallRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  avgNumber: { fontSize: 48, fontWeight: '800', color: '#1A1A1A' },
  avgDetails: { flex: 1 },
  totalReviews: { marginTop: 4, color: '#888', fontSize: 13 },
  breakdown: { gap: 4 },
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
  avatarUser: { backgroundColor: '#5C8A3C' },
  avatarText: { color: '#FFF', fontWeight: '700', fontSize: 16 },
  feedbackMeta: { flex: 1 },
  feedbackNameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  feedbackUser: { fontWeight: '600', fontSize: 14, color: '#1A1A1A' },
  youBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  youBadgeText: { fontSize: 10, color: '#2E7D32', fontWeight: '700' },
  feedbackDate: { fontSize: 11, color: '#AAA' },
  feedbackComment: { fontSize: 14, color: '#444', lineHeight: 20 },
  feedbackImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginTop: 10,
  },
  // Write Review
  writeReviewSection: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 16,
  },
  writeReviewToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  writeReviewText: { flex: 1, fontSize: 15, fontWeight: '700', color: '#8B4513' },
  reviewForm: { marginTop: 14 },
  formLabel: { fontSize: 13, fontWeight: '600', color: '#555', marginBottom: 8 },
  starSelector: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 16,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#E0D8D0',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: '#1A1A1A',
    minHeight: 100,
    backgroundColor: '#FAFAFA',
    marginBottom: 12,
  },
  imagePickerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderColor: '#8B4513',
    borderStyle: 'dashed',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  imagePickerText: { fontSize: 14, color: '#8B4513', fontWeight: '600' },
  previewContainer: { position: 'relative', marginBottom: 12 },
  previewImage: { width: '100%', height: 160, borderRadius: 10 },
  removeImageBtn: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#FFF',
    borderRadius: 11,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#8B4513',
    borderRadius: 10,
    paddingVertical: 14,
  },
  submitBtnDisabled: { backgroundColor: '#CCC' },
  submitBtnText: { color: '#FFF', fontSize: 15, fontWeight: '700' },
});

export default DetailScreen;
