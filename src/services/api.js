import { MOCKAPI_URL } from '../constants/config';

/**
 * Đọc dữ liệu handbag trực tiếp từ MockAPI.
 * Fields: handbagName, brand, uri, gender, category, percentOff, cost, color, description
 */
const mapToHandbag = (item) => ({
  id: String(item.id),
  handbagName: item.handbagName || 'Không có tên',
  brand: item.brand || 'Không rõ',
  uri: item.uri || '',
  gender: Boolean(item.gender),
  category: item.category || 'Túi Xách',
  percentOff: parseFloat(item.percentOff) || 0,
  cost: Number(item.cost) || 0,
  color: (() => {
    if (Array.isArray(item.color)) return item.color;
    try {
      return JSON.parse(item.color || '[]');
    } catch {
      return item.color ? [item.color] : ['Chưa cập nhật'];
    }
  })(),
  description: item.description || '',
});

export const fetchHandbags = async () => {
  const response = await fetch(`${MOCKAPI_URL}?limit=100`);
  if (!response.ok) throw new Error(`Lỗi mạng: ${response.status}`);
  const data = await response.json();
  const mapped = data.map(mapToHandbag);
  // Sắp xếp theo giá giảm dần
  return mapped.sort((a, b) => b.cost - a.cost);
};
