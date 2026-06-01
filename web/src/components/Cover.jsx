import { TOKENS, COVERS } from '../tokens.js';
import { initials } from '../data.js';

export default function Cover({ coverKey, city, height, radius = 0, children, faded = false }) {
  const [c1, c2] = COVERS[coverKey] || COVERS.coral;
  return (
    <div style={{
      position: 'relative', height, borderRadius: radius, overflow: 'hidden',
      background: `linear-gradient(145deg, ${c1}, ${c2})`,
      filter: faded ? 'grayscale(0.35) brightness(1.04)' : 'none',
    }}>
      <div style={{ position: 'absolute', top: '-30%', right: '-10%', width: '70%', height: '90%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%)' }} />
      <div style={{
        position: 'absolute', right: -6, bottom: -18, fontFamily: TOKENS.display,
        fontWeight: 700, fontSize: height * 0.92, lineHeight: 1, color: 'rgba(255,255,255,0.22)',
        letterSpacing: -4, userSelect: 'none',
      }}>{initials(city)}</div>
      {children}
    </div>
  );
}
