import { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COVERS, CoverKey } from '../tokens';
import { initials } from '../data';

interface CoverProps {
  coverKey: string;
  city: string;
  height: number;
  radius?: number;
  children?: ReactNode;
  faded?: boolean;
}

export default function Cover({ coverKey, city, height, radius = 0, children, faded = false }: CoverProps) {
  const [c1, c2] = COVERS[coverKey as CoverKey] ?? COVERS.coral;
  const fontSize = height * 0.85;
  return (
    <View style={{ height, borderRadius: radius, overflow: 'hidden', opacity: faded ? 0.7 : 1 }}>
      <LinearGradient colors={[c1, c2]} start={{ x: 0.1, y: 0.1 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
      <Text style={{ position: 'absolute', right: -4, bottom: -(fontSize * 0.15), fontSize, fontWeight: '800', color: 'rgba(255,255,255,0.22)', letterSpacing: -4 }}>
        {initials(city)}
      </Text>
      {children}
    </View>
  );
}
