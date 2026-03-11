import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@handbag_favorites';

export const getFavorites = async () => {
  try {
    const json = await AsyncStorage.getItem(FAVORITES_KEY);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.error('getFavorites error:', e);
    return [];
  }
};

export const addFavorite = async (handbag) => {
  try {
    const current = await getFavorites();
    const exists = current.find((item) => item.id === handbag.id);
    if (exists) return current;
    const updated = [...current, handbag];
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('addFavorite error:', e);
    return [];
  }
};

export const removeFavorite = async (id) => {
  try {
    const current = await getFavorites();
    const updated = current.filter((item) => item.id !== id);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('removeFavorite error:', e);
    return [];
  }
};

export const removeAllFavorites = async () => {
  try {
    await AsyncStorage.removeItem(FAVORITES_KEY);
    return [];
  } catch (e) {
    console.error('removeAllFavorites error:', e);
    return [];
  }
};

export const isFavorite = async (id) => {
  try {
    const current = await getFavorites();
    return current.some((item) => item.id === id);
  } catch (e) {
    return false;
  }
};
