import { TOKENS } from '../tokens.js';
import Icon from './Icon.jsx';

export default function Logo({ size = 34 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.32,
      background: `linear-gradient(140deg, ${TOKENS.amber}, ${TOKENS.primary})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 4px 12px rgba(231,111,81,0.35)', flexShrink: 0,
    }}>
      <Icon name="plane" size={size * 0.52} stroke="#fff" sw={2} />
    </div>
  );
}
