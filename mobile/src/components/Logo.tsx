import { LinearGradient } from 'expo-linear-gradient';
import { TOKENS } from '../tokens';
import Icon from './Icon';

export default function Logo({ size = 34 }: { size?: number }) {
  return (
    <LinearGradient
      colors={[TOKENS.amber, TOKENS.primary]}
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: 1, y: 1 }}
      style={{ width: size, height: size, borderRadius: size * 0.32, alignItems: 'center', justifyContent: 'center', shadowColor: TOKENS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 8, elevation: 6 }}
    >
      <Icon name="plane" size={size * 0.52} stroke="#fff" sw={2} />
    </LinearGradient>
  );
}
