import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY_PREFIX = '@user_comments_';

export const getUserComments = async (handbagId) => {
  try {
    const data = await AsyncStorage.getItem(KEY_PREFIX + handbagId);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveUserComment = async (handbagId, comment) => {
  try {
    const existing = await getUserComments(handbagId);
    const updated = [comment, ...existing];
    await AsyncStorage.setItem(KEY_PREFIX + handbagId, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
};
