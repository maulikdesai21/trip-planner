import { Trip, tripStatus, TripStatusTone } from '../data';

const PALETTE: Record<TripStatusTone, { wrap: string; dot: string }> = {
  hot:     { wrap: 'bg-white text-primary-dark', dot: 'bg-primary' },
  cool:    { wrap: 'bg-white text-[#5f7d8a]',   dot: 'bg-[#5f8aa3]' },
  live:    { wrap: 'bg-primary text-white',       dot: 'bg-white' },
  neutral: { wrap: 'bg-white text-ink-soft',      dot: 'bg-ink-faint' },
};

export default function StatusChip({ trip }: { trip: Trip }) {
  const st = tripStatus(trip);
  const p = PALETTE[st.tone];
  return (
    <span className={`inline-flex items-center gap-1.5 ${p.wrap} py-[5px] pl-[9px] pr-[11px] rounded-full text-[12.5px] font-semibold font-sans shadow-chip`}>
      <span className={`w-[7px] h-[7px] rounded-full inline-block ${p.dot} ${st.tone === 'live' ? 'animate-pulse-glow' : ''}`} />
      {st.label}
    </span>
  );
}
