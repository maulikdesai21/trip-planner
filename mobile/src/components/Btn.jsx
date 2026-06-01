import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { TOKENS } from '../tokens';
import Icon from './Icon';

export default function Btn({ kind = 'primary', icon, children, onPress, full = false, size = 'md' }) {
  const padV = size === 'lg' ? 15 : size === 'sm' ? 8 : 11;
  const padH = size === 'lg' ? 24 : size === 'sm' ? 14 : 18;
  const fs = size === 'lg' ? 16 : size === 'sm' ? 13.5 : 14.5;

  const bgMap = { primary: TOKENS.primary, ghost: 'transparent', soft: TOKENS.surfaceAlt, white: '#fff', danger: '#fff' };
  const textColorMap = { primary: '#fff', ghost: TOKENS.ink, soft: TOKENS.ink, white: TOKENS.ink, danger: '#c0492f' };
  const iconStroke = textColorMap[kind];

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}
      style={[{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
        paddingVertical: padV, paddingHorizontal: padH, borderRadius: 999,
        backgroundColor: bgMap[kind],
        shadowColor: kind === 'primary' ? TOKENS.primary : '#000',
        shadowOffset: { width: 0, height: kind === 'primary' ? 6 : 2 },
        shadowOpacity: kind === 'primary' ? 0.3 : 0.08,
        shadowRadius: kind === 'primary' ? 8 : 4,
        elevation: kind === 'primary' ? 4 : 1,
      }, full && { flex: 1 }]}
    >
      {icon && <Icon name={icon} size={fs + 3} stroke={iconStroke} sw={2.1} />}
      <Text style={{ fontSize: fs, fontWeight: '600', color: textColorMap[kind] }}>{children}</Text>
    </TouchableOpacity>
  );
}
