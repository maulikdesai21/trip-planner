import { TOKENS } from '../tokens.js';
import Icon from './Icon.jsx';

export default function Btn({ kind = 'primary', icon, children, onClick, full = false, size = 'md', style }) {
  const pad = size === 'lg' ? '15px 24px' : size === 'sm' ? '8px 14px' : '11px 18px';
  const fs = size === 'lg' ? 16 : size === 'sm' ? 13.5 : 14.5;
  const styles = {
    primary: { background: TOKENS.primary, color: '#fff', boxShadow: '0 6px 16px rgba(231,111,81,0.30)' },
    ghost:   { background: 'transparent', color: TOKENS.ink, boxShadow: 'none' },
    soft:    { background: TOKENS.surfaceAlt, color: TOKENS.ink, boxShadow: 'none' },
    white:   { background: '#fff', color: TOKENS.ink, boxShadow: '0 2px 10px rgba(58,43,37,0.10)' },
    danger:  { background: '#fff', color: '#c0492f', boxShadow: '0 2px 10px rgba(58,43,37,0.08)' },
  }[kind];
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      width: full ? '100%' : 'auto', padding: pad, border: 'none', cursor: 'pointer',
      borderRadius: 999, fontFamily: TOKENS.body, fontWeight: 600, fontSize: fs,
      transition: 'transform .15s ease', ...styles, ...style,
    }}
      onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
      onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      {icon && <Icon name={icon} size={fs + 3} sw={2.1} />}
      {children}
    </button>
  );
}
