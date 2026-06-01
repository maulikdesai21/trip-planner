import React from 'react';
import { TOKENS } from '../tokens.js';
import Icon from '../components/Icon.jsx';

export default function Splash({ onDone }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const t0 = Date.now();
    const dur = 3000;
    const done = setTimeout(onDone, dur);
    let raf;
    const tick = () => { setProgress(Math.min(1, (Date.now() - t0) / dur)); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => { clearTimeout(done); cancelAnimationFrame(raf); };
  }, [onDone]);

  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden',
      background: `radial-gradient(120% 80% at 50% 0%, #f7b27e 0%, ${TOKENS.primary} 45%, ${TOKENS.primaryDk} 100%)`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: TOKENS.body, color: '#fff',
    }}>
      <div style={{ position: 'absolute', top: '12%', left: '-10%', width: 260, height: 260, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.30), transparent 70%)', animation: 'drift 6s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: '6%', right: '-12%', width: 300, height: 300, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%)', animation: 'drift 8s ease-in-out infinite reverse' }} />
      <svg viewBox="0 0 320 120" style={{ position: 'absolute', top: '20%', width: '78%', opacity: 0.5 }}>
        <path d="M10 100 Q 160 -30 310 70" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="2 9" strokeLinecap="round" />
      </svg>

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'rise .9s cubic-bezier(.2,.8,.2,1) both' }}>
        <div style={{
          width: 80, height: 80, borderRadius: 24,
          background: 'rgba(255,255,255,0.16)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 18px 50px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(255,255,255,0.4)',
        }}>
          <Icon name="plane" size={40} stroke="#fff" sw={2} />
        </div>
        <div style={{ fontFamily: TOKENS.display, fontWeight: 700, fontSize: 32, letterSpacing: -0.6, marginTop: 22 }}>
          Trip Planner
        </div>
        <div style={{ fontSize: 14, opacity: 0.85, marginTop: 6, fontWeight: 500 }}>
          Every journey, beautifully planned
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 54, width: 130, height: 4,
        borderRadius: 99, background: 'rgba(255,255,255,0.25)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${progress * 100}%`, background: '#fff', borderRadius: 99 }} />
      </div>
    </div>
  );
}
