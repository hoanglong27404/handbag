import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RatingBar = ({ star, count, total }) => {
  const percent = total > 0 ? (count / total) * 100 : 0;
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{star}★</Text>
      <View style={styles.barBg}>
        <View style={[styles.barFill, { width: `${percent}%` }]} />
      </View>
      <Text style={styles.count}>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  label: {
    width: 28,
    fontSize: 12,
    color: '#555',
    fontWeight: '600',
  },
  barBg: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  barFill: {
    height: 8,
    backgroundColor: '#F4C430',
    borderRadius: 4,
  },
  count: {
    width: 24,
    fontSize: 12,
    color: '#555',
    textAlign: 'right',
  },
});

export default RatingBar;
