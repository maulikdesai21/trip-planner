import { Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Avatar({ size = 38 }: { size?: number }) {
  return (
    <LinearGradient
      colors={['#f4c89a', '#e88f6c']}
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: 1, y: 1 }}
      style={{ width: size, height: size, borderRadius: size / 2, alignItems: 'center', justifyContent: 'center', shadowColor: '#3a2b25', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.12, shadowRadius: 4 }}
    >
      <Text style={{ color: '#fff', fontWeight: '700', fontSize: size * 0.4 }}>M</Text>
    </LinearGradient>
  );
}
