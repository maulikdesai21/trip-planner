import { TOKENS } from '../tokens.js';
import Icon from './Icon.jsx';
import Btn from './Btn.jsx';

export default function ConfirmDelete({ trip, onCancel, onConfirm }) {
  return (
    <div onClick={onCancel} style={{
      position: 'absolute', inset: 0, zIndex: 60,
      background: 'rgba(58,43,37,0.4)', backdropFilter: 'blur(3px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, animation: 'fade .2s ease',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 24, padding: 26,
        width: '100%', maxWidth: 340, fontFamily: TOKENS.body,
        boxShadow: '0 20px 60px rgba(58,43,37,0.3)', animation: 'rise .25s cubic-bezier(.2,.8,.2,1)',
      }}>
        <div style={{ width: 48, height: 48, borderRadius: 999, background: '#fbe6df',
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
          <Icon name="trash" size={22} stroke="#c0492f" sw={2} />
        </div>
        <div style={{ fontFamily: TOKENS.display, fontWeight: 700, fontSize: 21, color: TOKENS.ink }}>
          Delete {trip.city}?
        </div>
        <div style={{ fontSize: 14.5, color: TOKENS.inkSoft, marginTop: 8, lineHeight: 1.5 }}>
          This trip and its plans will be removed. This can't be undone.
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
          <Btn kind="soft" full onClick={onCancel}>Keep it</Btn>
          <button onClick={onConfirm} style={{
            flex: 1, border: 'none', cursor: 'pointer', padding: '11px 18px', borderRadius: 999,
            background: '#c0492f', color: '#fff', fontFamily: TOKENS.body, fontWeight: 600, fontSize: 14.5,
          }}>Delete</button>
        </div>
      </div>
    </div>
  );
}
