import { MOCKAPI_URL, LOCAL_HANDBAGS } from '../constants/data';

export const fetchHandbags = async () => {
  try {
    const response = await fetch(MOCKAPI_URL);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('MockAPI fetch failed, using local data:', error.message);
    return LOCAL_HANDBAGS;
  }
};
