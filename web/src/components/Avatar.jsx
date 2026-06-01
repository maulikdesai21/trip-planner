import { TOKENS } from '../tokens.js';

export default function Avatar({ size = 38 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 999, flexShrink: 0,
      background: 'linear-gradient(140deg, #f4c89a, #e88f6c)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontFamily: TOKENS.display, fontWeight: 700, fontSize: size * 0.4,
      boxShadow: 'inset 0 0 0 2px #fff, 0 2px 8px rgba(58,43,37,0.12)',
    }}>M</div>
  );
}
