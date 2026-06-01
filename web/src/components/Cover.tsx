import { ReactNode } from 'react';
import { COVERS, CoverKey } from '../tokens';
import { initials } from '../data';

interface CoverProps {
  coverKey: string;
  city: string;
  height: number;
  radius?: number;
  children?: ReactNode;
  faded?: boolean;
}

export default function Cover({ coverKey, city, height, radius = 0, children, faded = false }: CoverProps) {
  const [c1, c2] = COVERS[coverKey as CoverKey] ?? COVERS.coral;
  return (
    <div
      className="relative overflow-hidden"
      style={{
        height, borderRadius: radius,
        background: `linear-gradient(145deg, ${c1}, ${c2})`,
        filter: faded ? 'grayscale(0.35) brightness(1.04)' : 'none',
      }}
    >
      <div className="absolute top-[-30%] right-[-10%] w-[70%] h-[90%]"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%)' }} />
      <div
        className="absolute right-[-6px] bottom-[-18px] leading-none select-none"
        style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700, fontSize: height * 0.92, color: 'rgba(255,255,255,0.22)', letterSpacing: -4 }}
      >
        {initials(city)}
      </div>
      {children}
    </div>
  );
}
