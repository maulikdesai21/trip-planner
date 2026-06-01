import { View, Text } from 'react-native';
import { Trip, tripStatus, TripStatusTone } from '../data';

const PALETTE: Record<TripStatusTone, { container: string; text: string; dot: string }> = {
  hot:     { container: 'bg-white', text: 'text-primary-dark', dot: 'bg-primary' },
  cool:    { container: 'bg-white', text: 'text-[#5f7d8a]',   dot: 'bg-[#5f8aa3]' },
  live:    { container: 'bg-primary', text: 'text-white',      dot: 'bg-white' },
  neutral: { container: 'bg-white', text: 'text-ink-soft',     dot: 'bg-ink-faint' },
};

export default function StatusChip({ trip }: { trip: Trip }) {
  const st = tripStatus(trip);
  const p = PALETTE[st.tone];
  return (
    <View className={`flex-row items-center gap-1.5 ${p.container} py-[5px] pl-[9px] pr-[11px] rounded-full self-start`}
      style={{ shadowColor: '#3a2b25', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.10, shadowRadius: 4 }}>
      <View className={`w-[7px] h-[7px] rounded-full ${p.dot}`} />
      <Text className={`text-[12.5px] font-semibold ${p.text}`}>{st.label}</Text>
    </View>
  );
}
