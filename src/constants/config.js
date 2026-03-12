// Cấu hình từ biến môi trường (.env)
// Expo tự động load các biến EXPO_PUBLIC_ từ file .env

export const MOCKAPI_URL =
  process.env.EXPO_PUBLIC_MOCKAPI_URL ||
  'https://6879244663f24f1fdca10af4.mockapi.io/schedule';

// Gemini AI - Điền API key vào file .env (EXPO_PUBLIC_GEMINI_API_KEY)
// Lấy key tại: https://aistudio.google.com/app/apikey
export const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';

export const GEMINI_API_URL =
  process.env.EXPO_PUBLIC_GEMINI_API_URL ||
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
