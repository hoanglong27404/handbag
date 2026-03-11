import React from 'react';
import { ScrollView, Pressable, Text, StyleSheet } from 'react-native';
import { BRANDS } from '../constants/data';

const BrandFilter = ({ selectedBrand, onSelect }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {BRANDS.map((brand) => {
        const active = selectedBrand === brand;
        return (
          <Pressable
            key={brand}
            style={[styles.chip, active && styles.chipActive]}
            onPress={() => onSelect(brand)}
          >
            <Text style={[styles.chipText, active && styles.chipTextActive]}>
              {brand}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  chipActive: {
    backgroundColor: '#8B4513',
    borderColor: '#8B4513',
  },
  chipText: {
    fontSize: 13,
    color: '#555',
    fontWeight: '500',
  },
  chipTextActive: {
    color: '#FFF',
    fontWeight: '700',
  },
});

export default BrandFilter;
