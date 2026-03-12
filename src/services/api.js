import { MOCKAPI_URL } from '../constants/config';

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
  address: item.address || '',
  feedbacks: Array.isArray(item.feedbacks) ? item.feedbacks : [],
});

export const fetchHandbags = async () => {
  const response = await fetch(`${MOCKAPI_URL}?limit=100`);
  if (!response.ok) throw new Error(`Lỗi mạng: ${response.status}`);
  const data = await response.json();
  const mapped = data.map(mapToHandbag);
  return mapped.sort((a, b) => b.cost - a.cost);
};

export const addFeedbackToHandbag = async (handbagId, newFeedback, currentFeedbacks) => {
  const updated = [newFeedback, ...currentFeedbacks];
  const response = await fetch(`${MOCKAPI_URL}/${handbagId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ feedbacks: updated }),
  });
  if (!response.ok) throw new Error(`Lỗi cập nhật feedback: ${response.status}`);
  return updated;
};
