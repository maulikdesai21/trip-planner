import { ReactNode } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon, { IconName } from './Icon';

type BtnKind = 'primary' | 'ghost' | 'soft' | 'white' | 'danger';
type BtnSize = 'lg' | 'md' | 'sm';

interface BtnProps {
  kind?: BtnKind;
  icon?: IconName;
  children: ReactNode;
  onPress?: () => void;
  full?: boolean;
  size?: BtnSize;
}

const KIND: Record<BtnKind, { container: string; text: string; stroke: string }> = {
  primary: { container: 'bg-primary',     text: 'text-white',          stroke: '#fff' },
  ghost:   { container: 'bg-transparent', text: 'text-ink',            stroke: '#3a2b25' },
  soft:    { container: 'bg-surface-alt', text: 'text-ink',            stroke: '#3a2b25' },
  white:   { container: 'bg-white',       text: 'text-ink',            stroke: '#3a2b25' },
  danger:  { container: 'bg-white',       text: 'text-[#c0492f]',      stroke: '#c0492f' },
};

const SIZE: Record<BtnSize, { pad: string; text: string; iconSize: number }> = {
  lg: { pad: 'py-[15px] px-6',        text: 'text-base',        iconSize: 19 },
  md: { pad: 'py-[11px] px-[18px]',   text: 'text-[14.5px]',    iconSize: 17.5 },
  sm: { pad: 'py-2 px-[14px]',        text: 'text-[13.5px]',    iconSize: 16.5 },
};

export default function Btn({ kind = 'primary', icon, children, onPress, full = false, size = 'md' }: BtnProps) {
  const k = KIND[kind];
  const s = SIZE[size];
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}
      className={`flex-row items-center justify-center gap-2 rounded-full ${k.container} ${s.pad} ${full ? 'flex-1' : ''}`}
      style={kind === 'primary' ? { shadowColor: '#e76f51', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 } : undefined}>
      {icon && <Icon name={icon} size={s.iconSize} stroke={k.stroke} sw={2.1} />}
      <Text className={`${s.text} font-semibold ${k.text}`}>{String(children)}</Text>
    </TouchableOpacity>
  );
}
