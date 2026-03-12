import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Linking,
} from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { BRAND_STORES } from '../constants/data';

const ALL_BRANDS = ['Tất Cả', ...Object.keys(BRAND_STORES)];

const StoreMapScreen = ({ route }) => {
  const initialBrand = route?.params?.brand || 'Tất Cả';
  const [selectedBrand, setSelectedBrand] = useState(
    ALL_BRANDS.includes(initialBrand) ? initialBrand : 'Tất Cả'
  );
  const [selectedStore, setSelectedStore] = useState(null);
  const mapRef = useRef(null);

  const allStores = Object.entries(BRAND_STORES).flatMap(([brand, stores]) =>
    stores.map((store) => ({ ...store, brand }))
  );

  const filteredStores =
    selectedBrand === 'Tất Cả'
      ? allStores
      : allStores.filter((s) => s.brand === selectedBrand);

  const initialRegion = {
    latitude: 15.9,
    longitude: 106.26,
    latitudeDelta: 12,
    longitudeDelta: 12,
  };

  const handleMarkerPress = (store) => {
    setSelectedStore(store);
    mapRef.current?.animateToRegion(
      {
        latitude: store.latitude,
        longitude: store.longitude,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      },
      500
    );
  };

  const handleChipPress = (brand) => {
    setSelectedBrand(brand);
    setSelectedStore(null);
    if (brand !== 'Tất Cả') {
      const stores = allStores.filter((s) => s.brand === brand);
      if (stores.length > 0) {
        const avgLat = stores.reduce((s, st) => s + st.latitude, 0) / stores.length;
        const avgLng = stores.reduce((s, st) => s + st.longitude, 0) / stores.length;
        mapRef.current?.animateToRegion(
          { latitude: avgLat, longitude: avgLng, latitudeDelta: 5, longitudeDelta: 5 },
          500
        );
      }
    } else {
      mapRef.current?.animateToRegion(initialRegion, 500);
    }
  };

  return (
    <View style={styles.container}>
      {/* Brand Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterBar}
        contentContainerStyle={styles.filterContent}
      >
        {ALL_BRANDS.map((brand) => (
          <Pressable
            key={brand}
            style={[styles.chip, selectedBrand === brand && styles.chipActive]}
            onPress={() => handleChipPress(brand)}
          >
            <Text style={[styles.chipText, selectedBrand === brand && styles.chipTextActive]}>
              {brand}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Map */}
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation
        showsMyLocationButton
        showsCompass
        showsScale
      >
        {filteredStores.map((store) => (
          <Marker
            key={store.id}
            coordinate={{ latitude: store.latitude, longitude: store.longitude }}
            onPress={() => handleMarkerPress(store)}
            pinColor="#8B4513"
          >
            <Callout tooltip>
              <View style={styles.callout}>
                <Text style={styles.calloutBrand}>{store.brand}</Text>
                <Text style={styles.calloutName}>{store.name}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {/* Store Count Badge */}
      <View style={styles.countBadge}>
        <Ionicons name="storefront-outline" size={14} color="#8B4513" />
        <Text style={styles.countText}>{filteredStores.length} cửa hàng</Text>
      </View>

      {/* Selected Store Detail Card */}
      {selectedStore && (
        <View style={styles.storeCard}>
          <View style={styles.storeCardContent}>
            <View style={styles.brandBadge}>
              <Text style={styles.brandBadgeText}>{selectedStore.brand}</Text>
            </View>
            <Text style={styles.storeName}>{selectedStore.name}</Text>
            <View style={styles.addressRow}>
              <Ionicons name="location" size={14} color="#8B4513" />
              <Text style={styles.storeAddress}>{selectedStore.address}</Text>
            </View>
            <Pressable
              style={styles.directionBtn}
              onPress={() => {
                const url = `https://www.google.com/maps/search/?api=1&query=${selectedStore.latitude},${selectedStore.longitude}`;
                Linking.openURL(url);
              }}
            >
              <Ionicons name="navigate-outline" size={14} color="#FFF" />
              <Text style={styles.directionText}>Chỉ đường</Text>
            </Pressable>
          </View>
          <Pressable style={styles.closeBtn} onPress={() => setSelectedStore(null)}>
            <Ionicons name="close-circle" size={24} color="#CCC" />
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F6F2' },
  filterBar: { backgroundColor: '#FFF', flexGrow: 0 },
  filterContent: { paddingHorizontal: 12, paddingVertical: 10, gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F0E8E0',
    borderWidth: 1,
    borderColor: '#E8D8C8',
  },
  chipActive: { backgroundColor: '#8B4513', borderColor: '#8B4513' },
  chipText: { fontSize: 13, color: '#666', fontWeight: '600' },
  chipTextActive: { color: '#FFF' },
  map: { flex: 1 },
  countBadge: {
    position: 'absolute',
    top: 60,
    right: 12,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
  },
  countText: { fontSize: 12, color: '#8B4513', fontWeight: '700' },
  callout: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    minWidth: 160,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  calloutBrand: {
    fontSize: 11,
    color: '#8B4513',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  calloutName: { fontSize: 13, color: '#1A1A1A', fontWeight: '600', marginTop: 2 },
  storeCard: {
    position: 'absolute',
    bottom: 16,
    left: 12,
    right: 12,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  storeCardContent: { flex: 1 },
  brandBadge: {
    backgroundColor: '#F0E8E0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  brandBadgeText: {
    fontSize: 11,
    color: '#8B4513',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  storeName: { fontSize: 15, fontWeight: '700', color: '#1A1A1A', marginBottom: 6 },
  addressRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 4 },
  storeAddress: { fontSize: 13, color: '#666', flex: 1, lineHeight: 18 },
  directionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
    backgroundColor: '#8B4513',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  directionText: { fontSize: 12, color: '#FFF', fontWeight: '600' },
  closeBtn: { padding: 2 },
});

export default StoreMapScreen;
