// app.config.js - Đọc cấu hình từ .env để tránh hardcode API keys
// File này thay thế app.json (Expo ưu tiên app.config.js hơn)

module.exports = {
  expo: {
    name: 'handbag',
    slug: 'handbag',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        backgroundColor: '#E6F4FE',
        foregroundImage: './assets/android-icon-foreground.png',
        backgroundImage: './assets/android-icon-background.png',
        monochromeImage: './assets/android-icon-monochrome.png',
      },
      ...(process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY &&
        process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY !== 'YOUR_GOOGLE_MAPS_KEY_HERE' && {
          config: {
            googleMaps: {
              apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY,
            },
          },
        }),
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: [
      [
        'expo-image-picker',
        {
          photosPermission:
            'Allow access to your photo library to upload images in reviews.',
        },
      ],
    ],
  },
};
