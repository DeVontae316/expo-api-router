import { StyleSheet } from 'react-native-unistyles';

const theme = {
  colors: {
    brand: '#2A6E8C',
    brandDark: '#1F5A78',
    background: '#0B0F1A',
    surface: '#12192B',
    text: '#E8EEF9',
    muted: '#A7B2C5',
    primary: '#7C5CFF',
    danger: '#FF3B30',
    textOnLight: '#111827',
    label: '#111827',
    border: '#9CA3AF',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
  },
} as const;

StyleSheet.configure({
  themes: {
    light: theme,
    dark: theme,
  },
  settings: {
    adaptiveThemes: true,
  },
});

declare module 'react-native-unistyles' {
  export interface UnistylesThemes {
    light: typeof theme;
    dark: typeof theme;
  }
}
