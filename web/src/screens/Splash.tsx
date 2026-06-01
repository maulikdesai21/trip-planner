import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';

export default function Splash() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t0 = Date.now();
    const dur = 3000;
    const done = setTimeout(() => navigate('/planner'), dur);
    let raf: number;
    const tick = () => { setProgress(Math.min(1, (Date.now() - t0) / dur)); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => { clearTimeout(done); cancelAnimationFrame(raf); };
  }, [navigate]);

  return (
    <div
      className="absolute inset-0 overflow-hidden flex flex-col items-center justify-center text-white font-sans"
      style={{ background: 'radial-gradient(120% 80% at 50% 0%, #f7b27e 0%, #e76f51 45%, #cf5836 100%)' }}
    >
      <div className="absolute top-[12%] left-[-10%] w-[260px] h-[260px] rounded-full animate-drift-slow"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.30), transparent 70%)' }} />
      <div className="absolute bottom-[6%] right-[-12%] w-[300px] h-[300px] rounded-full animate-drift-rev"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%)' }} />
      <svg viewBox="0 0 320 120" className="absolute top-[20%] w-[78%] opacity-50">
        <path d="M10 100 Q 160 -30 310 70" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="2 9" strokeLinecap="round" />
      </svg>

      <div className="relative flex flex-col items-center animate-rise">
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.16)', backdropFilter: 'blur(6px)', boxShadow: '0 18px 50px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(255,255,255,0.4)' }}>
          <Icon name="plane" size={40} stroke="#fff" sw={2} />
        </div>
        <div className="font-display font-bold text-[32px] tracking-[-0.6px] mt-[22px]">Trip Planner</div>
        <div className="text-[14px] opacity-85 mt-1.5 font-medium">Every journey, beautifully planned</div>
      </div>

      <div className="absolute bottom-[54px] w-[130px] h-1 rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.25)' }}>
        <div className="h-full bg-white rounded-full transition-none" style={{ width: `${progress * 100}%` }} />
      </div>
    </div>
  );
}
