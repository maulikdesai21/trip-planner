import { ReactNode, MouseEvent } from 'react';
import Icon, { IconName } from './Icon';

type BtnKind = 'primary' | 'ghost' | 'soft' | 'white' | 'danger';
type BtnSize = 'lg' | 'md' | 'sm';

interface BtnProps {
  kind?: BtnKind;
  icon?: IconName;
  children: ReactNode;
  onClick?: () => void;
  full?: boolean;
  size?: BtnSize;
  className?: string;
}

const KIND: Record<BtnKind, { cls: string; stroke: string }> = {
  primary: { cls: 'bg-primary text-white shadow-btn-primary', stroke: '#fff' },
  ghost:   { cls: 'bg-transparent text-ink',                  stroke: '#3a2b25' },
  soft:    { cls: 'bg-surface-alt text-ink',                  stroke: '#3a2b25' },
  white:   { cls: 'bg-white text-ink shadow-[0_2px_10px_rgba(58,43,37,0.10)]', stroke: '#3a2b25' },
  danger:  { cls: 'bg-white text-[#c0492f] shadow-[0_2px_10px_rgba(58,43,37,0.08)]', stroke: '#c0492f' },
};

const SIZE: Record<BtnSize, { cls: string; iconSize: number }> = {
  lg: { cls: 'py-[15px] px-6 text-base',        iconSize: 19 },
  md: { cls: 'py-[11px] px-[18px] text-[14.5px]', iconSize: 17.5 },
  sm: { cls: 'py-2 px-[14px] text-[13.5px]',    iconSize: 16.5 },
};

const scale = (el: HTMLButtonElement, v: string) => { el.style.transform = v; };

export default function Btn({ kind = 'primary', icon, children, onClick, full = false, size = 'md', className = '' }: BtnProps) {
  const k = KIND[kind];
  const s = SIZE[size];
  return (
    <button
      onClick={onClick}
      onMouseDown={(e: MouseEvent<HTMLButtonElement>) => scale(e.currentTarget, 'scale(0.97)')}
      onMouseUp={(e: MouseEvent<HTMLButtonElement>) => scale(e.currentTarget, '')}
      onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => scale(e.currentTarget, '')}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold font-sans border-none cursor-pointer transition-transform duration-150 ${k.cls} ${s.cls} ${full ? 'w-full' : ''} ${className}`}
    >
      {icon && <Icon name={icon} size={s.iconSize} stroke={k.stroke} sw={2.1} />}
      {children}
    </button>
  );
}
