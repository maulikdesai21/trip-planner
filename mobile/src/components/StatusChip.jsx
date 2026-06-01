import React from 'react';
import { View, Text } from 'react-native';
import { TOKENS } from '../tokens';
import { tripStatus } from '../data';

export default function StatusChip({ trip }) {
  const st = tripStatus(trip);
  const palette = {
    hot:     { bg: '#fff', fg: TOKENS.primaryDk, dot: TOKENS.primary },
    cool:    { bg: '#fff', fg: '#5f7d8a', dot: '#5f8aa3' },
    live:    { bg: TOKENS.primary, fg: '#fff', dot: '#fff' },
    neutral: { bg: '#fff', fg: TOKENS.inkSoft, dot: TOKENS.inkFaint },
  }[st.tone];
  return (
    <View style={{
      flexDirection: 'row', alignItems: 'center', gap: 6,
      backgroundColor: palette.bg, paddingVertical: 5, paddingLeft: 9, paddingRight: 11,
      borderRadius: 999, shadowColor: '#3a2b25', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.10, shadowRadius: 4,
      alignSelf: 'flex-start',
    }}>
      <View style={{ width: 7, height: 7, borderRadius: 999, backgroundColor: palette.dot }} />
      <Text style={{ fontSize: 12.5, fontWeight: '600', color: palette.fg }}>{st.label}</Text>
    </View>
  );
}
