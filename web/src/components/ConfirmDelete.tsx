import { Trip } from '../data';
import Icon from './Icon';
import Btn from './Btn';

interface Props { trip: Trip; onCancel: () => void; onConfirm: () => void; }

export default function ConfirmDelete({ trip, onCancel, onConfirm }: Props) {
  return (
    <div
      onClick={onCancel}
      className="absolute inset-0 z-[60] flex items-center justify-center p-6 animate-fade"
      style={{ background: 'rgba(58,43,37,0.4)', backdropFilter: 'blur(3px)' }}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-3xl p-[26px] w-full max-w-[340px] shadow-modal animate-rise font-sans"
      >
        <div className="w-12 h-12 rounded-full bg-[#fbe6df] flex items-center justify-center mb-4">
          <Icon name="trash" size={22} stroke="#c0492f" sw={2} />
        </div>
        <div className="font-display font-bold text-[21px] text-ink">Delete {trip.city}?</div>
        <div className="text-[14.5px] text-ink-soft mt-2 leading-relaxed">
          This trip and its plans will be removed. This can't be undone.
        </div>
        <div className="flex gap-2.5 mt-[22px]">
          <Btn kind="soft" full onClick={onCancel}>Keep it</Btn>
          <button
            onClick={onConfirm}
            className="flex-1 border-none cursor-pointer py-[11px] px-[18px] rounded-full bg-[#c0492f] text-white font-sans font-semibold text-[14.5px]"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
