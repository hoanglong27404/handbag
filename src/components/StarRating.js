import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StarRating = ({ rating, size = 16, color = '#F4C430' }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<Ionicons key={i} name="star" size={size} color={color} />);
    } else if (i - rating < 1 && i - rating > 0) {
      stars.push(<Ionicons key={i} name="star-half" size={size} color={color} />);
    } else {
      stars.push(<Ionicons key={i} name="star-outline" size={size} color={color} />);
    }
  }
  return <View style={styles.row}>{stars}</View>;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default StarRating;
