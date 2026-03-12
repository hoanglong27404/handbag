import { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Linking,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { BRAND_STORES } from '../constants/data';

const ALL_BRANDS = ['Tất Cả', ...Object.keys(BRAND_STORES)];

const BRAND_COLORS = {
  Bvlgari: '#1a3a6c',
  'Michael Kors': '#c8a96e',
  Burberry: '#8B0000',
  Ferragamo: '#2d6a2d',
  Fendi: '#b8860b',
};

const StoreMapScreen = ({ route }) => {
  const initialBrand = route?.params?.brand || 'Tất Cả';
  const [selectedBrand, setSelectedBrand] = useState(
    ALL_BRANDS.includes(initialBrand) ? initialBrand : 'Tất Cả'
  );
  const [selectedStore, setSelectedStore] = useState(null);
  const webViewRef = useRef(null);

  const allStores = Object.entries(BRAND_STORES).flatMap(([brand, stores]) =>
    stores.map((store) => ({ ...store, brand }))
  );

  const filteredStores =
    selectedBrand === 'Tất Cả'
      ? allStores
      : allStores.filter((s) => s.brand === selectedBrand);

  const buildMapHtml = (stores) => {
    const markersJs = stores
      .map((store) => {
        const color = BRAND_COLORS[store.brand] || '#8B4513';
        const escaped = {
          id: store.id,
          name: store.name.replace(/'/g, "\\'"),
          brand: store.brand.replace(/'/g, "\\'"),
          address: store.address.replace(/'/g, "\\'"),
          lat: store.latitude,
          lng: store.longitude,
        };
        return `
        (function() {
          var icon = L.divIcon({
            className: '',
            html: '<div style="width:28px;height:28px;background:${color};border:3px solid #fff;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 2px 6px rgba(0,0,0,0.4)"></div>',
            iconSize: [28, 28],
            iconAnchor: [14, 28],
            popupAnchor: [0, -30],
          });
          var marker = L.marker([${escaped.lat}, ${escaped.lng}], { icon: icon }).addTo(map);
          marker.bindPopup('<div style="min-width:160px;font-family:sans-serif"><div style="font-size:11px;color:${color};font-weight:700;text-transform:uppercase;margin-bottom:4px">${escaped.brand}</div><div style="font-size:14px;font-weight:600;color:#1a1a1a">${escaped.name}</div></div>');
          marker.on('click', function() {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              id: '${escaped.id}',
              name: '${escaped.name}',
              brand: '${escaped.brand}',
              address: '${escaped.address}',
              latitude: ${escaped.lat},
              longitude: ${escaped.lng}
            }));
          });
        })();`;
      })
      .join('\n');

    const center =
      stores.length > 0
        ? [
            stores.reduce((s, st) => s + st.latitude, 0) / stores.length,
            stores.reduce((s, st) => s + st.longitude, 0) / stores.length,
          ]
        : [15.9, 106.26];
    const zoom = stores.length === 1 ? 14 : stores.length <= 3 ? 8 : 6;

    return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  html, body, #map { width:100%; height:100%; }
  .leaflet-control-attribution { display:none; }
</style>
</head>
<body>
<div id="map"></div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
  var map = L.map('map', { zoomControl: true }).setView([${center[0]}, ${center[1]}], ${zoom});
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map);
  ${markersJs}
</script>
</body>
</html>`;
  };

  const [mapHtml, setMapHtml] = useState(() => buildMapHtml(allStores));

  const handleChipPress = (brand) => {
    setSelectedBrand(brand);
    setSelectedStore(null);
    const stores =
      brand === 'Tất Cả' ? allStores : allStores.filter((s) => s.brand === brand);
    setMapHtml(buildMapHtml(stores));
  };

  const handleWebViewMessage = (event) => {
    try {
      const store = JSON.parse(event.nativeEvent.data);
      setSelectedStore(store);
    } catch (_) {}
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

      {/* Map WebView */}
      <WebView
        ref={webViewRef}
        source={{ html: mapHtml }}
        style={styles.map}
        onMessage={handleWebViewMessage}
        javaScriptEnabled
        domStorageEnabled
        originWhitelist={['*']}
        mixedContentMode="always"
        allowFileAccessFromFileURLs
        allowUniversalAccessFromFileURLs
        startInLoadingState
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <Ionicons name="map-outline" size={48} color="#8B4513" />
            <Text style={styles.loadingText}>Đang tải bản đồ...</Text>
          </View>
        )}
      />

      {/* Store Count Badge */}
      <View style={styles.countBadge}>
        <Ionicons name="storefront-outline" size={14} color="#8B4513" />
        <Text style={styles.countText}>{filteredStores.length} cửa hàng</Text>
      </View>

      {/* Selected Store Detail Card */}
      {selectedStore && (
        <View style={styles.storeCard}>
          <View style={styles.storeCardContent}>
            <View style={[styles.brandBadge, { backgroundColor: (BRAND_COLORS[selectedStore.brand] || '#8B4513') + '22' }]}>
              <Text style={[styles.brandBadgeText, { color: BRAND_COLORS[selectedStore.brand] || '#8B4513' }]}>
                {selectedStore.brand}
              </Text>
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
  loadingContainer: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F6F2',
  },
  loadingText: { marginTop: 12, fontSize: 14, color: '#8B4513', fontWeight: '600' },
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
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  brandBadgeText: {
    fontSize: 11,
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
