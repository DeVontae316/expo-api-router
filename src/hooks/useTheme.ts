import { useUnistyles } from 'react-native-unistyles';

export function useTheme() {
  return useUnistyles().theme;
}

