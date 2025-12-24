import type { ReactNode } from 'react';
import { Pressable, Text } from 'react-native';

export function Button({
  title,
  onPress,
}: {
  title: string;
  onPress?: () => void;
  children?: ReactNode;
}) {
  return (
    <Pressable onPress={onPress}>
      <Text>{title}</Text>
    </Pressable>
  );
}

