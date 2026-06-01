import { TOKENS } from '../tokens.js';
import { tripStatus } from '../data.js';

export default function StatusChip({ trip }) {
  const st = tripStatus(trip);
  const palette = {
    hot:     { bg: '#fff', fg: TOKENS.primaryDk, dot: TOKENS.primary },
    cool:    { bg: '#fff', fg: '#5f7d8a', dot: '#5f8aa3' },
    live:    { bg: TOKENS.primary, fg: '#fff', dot: '#fff' },
    neutral: { bg: '#fff', fg: TOKENS.inkSoft, dot: TOKENS.inkFaint },
  }[st.tone];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: palette.bg, color: palette.fg,
      padding: '5px 11px 5px 9px', borderRadius: 999,
      fontSize: 12.5, fontWeight: 600, fontFamily: TOKENS.body,
      boxShadow: '0 2px 8px rgba(58,43,37,0.10)',
    }}>
      <span style={{
        width: 7, height: 7, borderRadius: 999, background: palette.dot, display: 'inline-block',
        animation: st.tone === 'live' ? 'pulse 1.6s infinite' : 'none',
      }} />
      {st.label}
    </span>
  );
}
