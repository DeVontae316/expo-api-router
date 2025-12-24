import type { ReactNode } from 'react';
import { Text } from 'react-native';

export function Cell({ children }: { children?: ReactNode }) {
  return <Text>{children}</Text>;
}

