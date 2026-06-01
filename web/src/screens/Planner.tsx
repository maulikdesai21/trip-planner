import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrips } from '../context/TripContext';
import { Trip, fmtRange, nights, tripStatus } from '../data';
import Icon from '../components/Icon';
import Logo from '../components/Logo';
import Cover from '../components/Cover';
import StatusChip from '../components/StatusChip';
import Btn from '../components/Btn';
import Avatar from '../components/Avatar';
import ConfirmDelete from '../components/ConfirmDelete';

const FILTERS: [string, string][] = [['all','All'],['upcoming','Upcoming'],['past','Past']];

export default function Planner() {
  const navigate = useNavigate();
  const { trips, deleteTrip } = useTrips();
  const [filter, setFilter] = useState('all');
  const [menuId, setMenuId] = useState<string | null>(null);
  const [confirmTrip, setConfirmTrip] = useState<Trip | null>(null);

  const isPast = (t: Trip) => tripStatus(t).key === 'past';
  const shown = trips.filter(t => filter === 'all' ? true : filter === 'past' ? isPast(t) : !isPast(t));
  const upcomingCount = trips.filter(t => !isPast(t)).length;

  return (
    <div className="absolute inset-0 bg-cream overflow-auto font-sans">
      {/* top bar */}
      <div className="flex items-center justify-between px-10 pt-[22px] pb-2">
        <div className="flex items-center gap-[11px]">
          <Logo size={34} />
          <span className="font-display font-bold text-[18px] tracking-[-0.3px] text-ink">Trip Planner</span>
        </div>
        <div className="flex items-center gap-[14px]">
          <button className="iconbtn w-10 h-10 rounded-full border-none bg-white cursor-pointer flex items-center justify-center text-ink-soft shadow-[0_2px_10px_rgba(58,43,37,0.08)]">
            <Icon name="search" size={19} sw={2} />
          </button>
          <Avatar size={40} />
        </div>
      </div>

      {/* header */}
      <div className="px-10 pt-5 flex items-end justify-between gap-4">
        <div>
          <div className="text-primary font-bold text-[13.5px] tracking-[0.3px]">WELCOME BACK, MAYA</div>
          <h1 className="font-display font-bold text-[40px] tracking-[-1px] text-ink mt-1.5 mb-0">Your trips</h1>
          <div className="text-ink-soft text-[15.5px] font-medium mt-1">
            {upcomingCount > 0 ? `${upcomingCount} ${upcomingCount === 1 ? 'adventure' : 'adventures'} on the horizon` : 'Time to dream up your next escape'}
          </div>
        </div>
        <Btn kind="primary" icon="plus" onClick={() => navigate('/trip/new')}>New trip</Btn>
      </div>

      {/* filters */}
      <div className="flex gap-2 px-10 pt-6 pb-1">
        {FILTERS.map(([k, lbl]) => (
          <button key={k} onClick={() => setFilter(k)}
            className={`border-none cursor-pointer py-2 px-4 rounded-full font-sans font-semibold text-[13.5px] transition-all duration-150 ${filter === k ? 'bg-ink text-white' : 'bg-transparent text-ink-soft'}`}>
            {lbl}
          </button>
        ))}
      </div>

      {/* grid */}
      {shown.length === 0 ? (
        <div className="text-center px-[30px] pt-[50px] pb-[30px] text-ink-soft">
          <div className="opacity-50 mb-[14px] flex justify-center"><Icon name="pin" size={40} stroke="#b8a99f" sw={1.6} /></div>
          <div className="font-display font-bold text-[20px] text-ink">Nothing here yet</div>
          <div className="text-[14.5px] mt-1.5 mb-5">Start planning your next escape.</div>
          <Btn kind="primary" icon="plus" onClick={() => navigate('/trip/new')}>Plan a new trip</Btn>
        </div>
      ) : (
        <div className="grid gap-[22px] px-10 pt-5 pb-12" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          {shown.map(t => (
            <div key={t.id} className="tcard relative bg-white rounded-[22px] overflow-hidden cursor-pointer shadow-card"
              onClick={() => navigate(`/trip/${t.id}`)}>
              <Cover coverKey={t.cover} city={t.city} height={150} faded={isPast(t)}>
                <div className="absolute top-3 left-3"><StatusChip trip={t} /></div>
                <button className="iconbtn absolute top-3 right-3 w-8 h-8 rounded-full border-none cursor-pointer flex items-center justify-center text-ink shadow-[0_2px_8px_rgba(58,43,37,0.14)]"
                  style={{ background: 'rgba(255,255,255,0.92)' }}
                  onClick={e => { e.stopPropagation(); setMenuId(menuId === t.id ? null : t.id); }}>
                  <Icon name="dots" size={18} sw={2.4} />
                </button>
                {menuId === t.id && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={e => { e.stopPropagation(); setMenuId(null); }} />
                    <div className="absolute top-12 right-3 z-[41] bg-white rounded-[14px] p-1.5 min-w-[150px] shadow-menu">
                      {([['edit','Edit trip', () => navigate(`/trip/${t.id}?edit=true`)], ['trash','Delete', () => setConfirmTrip(t)]] as [string,string,()=>void][]).map(([ic, lbl, fn]) => (
                        <button key={lbl} className="menurow flex items-center gap-2.5 w-full border-none bg-transparent cursor-pointer py-2.5 px-3 rounded-[9px] font-sans text-[14.5px] font-medium"
                          style={{ color: ic === 'trash' ? '#c0492f' : '#3a2b25' }}
                          onClick={e => { e.stopPropagation(); setMenuId(null); fn(); }}>
                          <Icon name={ic as 'edit'|'trash'} size={17} sw={2} /> {lbl}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </Cover>
              <div className="p-[15px_17px_18px]">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-display font-bold text-[21px] tracking-[-0.4px] text-ink">{t.city}</span>
                  <span className="text-[12.5px] font-semibold text-ink-faint">{nights(t.start, t.end)} nights</span>
                </div>
                <div className="text-[13.5px] text-ink-soft font-medium mt-0.5">{t.country}</div>
                <div className="flex items-center gap-[7px] mt-3 text-ink-soft text-[13.5px] font-medium">
                  <Icon name="calendar" size={16} sw={1.9} stroke="#e76f51" />
                  {fmtRange(t.start, t.end)}
                </div>
              </div>
            </div>
          ))}
          {filter !== 'past' && (
            <button className="addcard border-2 border-dashed border-ink/10 bg-white/40 rounded-[22px] cursor-pointer min-h-[220px] flex flex-col items-center justify-center gap-3 font-sans"
              onClick={() => navigate('/trip/new')}>
              <div className="w-[46px] h-[46px] rounded-full bg-primary flex items-center justify-center shadow-btn-primary">
                <Icon name="plus" size={24} stroke="#fff" sw={2.4} />
              </div>
              <span className="font-semibold text-[15px] text-ink">Plan a new trip</span>
            </button>
          )}
        </div>
      )}

      {confirmTrip && (
        <ConfirmDelete trip={confirmTrip}
          onCancel={() => setConfirmTrip(null)}
          onConfirm={() => { deleteTrip(confirmTrip.id); setConfirmTrip(null); }} />
      )}
    </div>
  );
}
