import { useState, useRef } from 'react';
import { useParams, useNavigate, useSearchParams, Navigate } from 'react-router-dom';
import { useTrips } from '../context/TripContext';
import { COVERS } from '../tokens';
import { Trip, fmtRange, nights, tripStatus, uid } from '../data';
import Icon from '../components/Icon';
import Cover from '../components/Cover';
import StatusChip from '../components/StatusChip';
import Btn from '../components/Btn';
import ConfirmDelete from '../components/ConfirmDelete';

const ctrlCls = 'iconbtn w-10 h-10 rounded-full border-none cursor-pointer flex items-center justify-center';
const ctrlStyle = { background: 'rgba(255,255,255,0.92)', boxShadow: '0 2px 10px rgba(40,24,18,0.18)' };
const labelCls = 'text-[12.5px] font-bold text-ink-soft tracking-[0.3px] uppercase mb-[7px] block';

function SectionTitle({ children }: { children: string }) {
  return <h3 className="font-display font-bold text-[19px] tracking-[-0.3px] text-ink m-0">{children}</h3>;
}

export default function TripPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { trips, saveTrip, deleteTrip } = useTrips();

  const isNew = id === 'new';
  const startInEdit = isNew || searchParams.get('edit') === 'true';

  const newDraftRef = useRef<Trip | null>(null);
  if (isNew && !newDraftRef.current) {
    newDraftRef.current = { id: uid(), city: '', country: '', cover: 'coral', start: '', end: '', notes: '' };
  }

  const trip = isNew ? newDraftRef.current! : (trips.find(t => t.id === id) ?? null);

  const [editing, setEditing] = useState(startInEdit);
  const [draft, setDraft] = useState<Trip>(() => trip ? { ...trip } : { id: '', city: '', country: '', cover: 'coral', start: '', end: '', notes: '' });
  const [confirm, setConfirm] = useState(false);
  const [tried, setTried] = useState(false);

  if (!trip) return <Navigate to="/planner" replace />;

  const set = <K extends keyof Trip>(k: K, v: Trip[K]) => setDraft(d => ({ ...d, [k]: v }));
  const valid = draft.city.trim().length > 0;
  const view = editing ? draft : trip;

  const save = () => {
    setTried(true);
    if (!valid) return;
    saveTrip(draft);
    if (isNew) navigate('/planner');
    else setEditing(false);
  };
  const cancel = () => {
    if (isNew) return navigate('/planner');
    setDraft({ ...trip }); setTried(false); setEditing(false);
  };

  const inputCls = (err = false) =>
    `w-full box-border px-[15px] py-[13px] rounded-[13px] border-[1.5px] ${err ? 'border-[#dd6a4e]' : 'border-ink/10'} bg-white font-sans text-[15.5px] font-medium text-ink outline-none`;

  return (
    <div className="absolute inset-0 bg-cream overflow-auto font-sans">
      <div className="relative">
        <Cover coverKey={view.cover} city={view.city || 'New'} height={260} faded={tripStatus(view).key === 'past' && !editing}>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(40,24,18,0.55), transparent 55%)' }} />
        </Cover>
        <div className="absolute top-[18px] left-0 right-0 px-4 flex justify-between">
          <button onClick={isNew ? cancel : () => navigate(-1)} className={ctrlCls} style={ctrlStyle}>
            <Icon name="back" size={20} sw={2.2} stroke="#3a2b25" />
          </button>
          {!editing && (
            <button onClick={() => setConfirm(true)} className={ctrlCls} style={ctrlStyle}>
              <Icon name="trash" size={19} sw={2} stroke="#c0492f" />
            </button>
          )}
        </div>
        {!editing ? (
          <div className="absolute left-0 right-0 bottom-[26px] px-6 text-white">
            <StatusChip trip={view} />
            <h1 className="font-display font-bold text-[44px] tracking-[-1px] mt-3 mb-0 leading-none">{view.city}</h1>
            <div className="flex items-center gap-2 mt-2.5 text-[15px] font-medium opacity-95">
              <Icon name="pin" size={16} sw={1.9} /> {view.country}
              <span className="opacity-50">·</span>
              {fmtRange(view.start, view.end)}
            </div>
          </div>
        ) : (
          <div className="absolute left-0 right-0 bottom-[22px] px-6 text-white">
            <div className="font-display font-bold text-[34px] tracking-[-0.6px]">{isNew ? 'New trip' : 'Edit trip'}</div>
          </div>
        )}
      </div>

      <div className="relative bg-cream rounded-[26px_26px_0_0] -mt-[22px] px-8 pt-[30px] pb-12 min-h-[260px]">
        {!editing ? (
          <>
            <div className="grid grid-cols-3 gap-3">
              {([['Dates', fmtRange(view.start, view.end).replace(/, \d+$/, '')], ['Length', `${nights(view.start, view.end)} nights`], ['Status', tripStatus(view).label]] as [string,string][]).map(([k, v]) => (
                <div key={k} className="bg-white rounded-2xl p-[14px_15px] shadow-[0_1px_2px_rgba(58,43,37,0.05)]">
                  <div className="text-[11.5px] font-bold text-ink-faint tracking-[0.3px] uppercase">{k}</div>
                  <div className="text-[15px] font-semibold text-ink mt-[5px] leading-tight">{v}</div>
                </div>
              ))}
            </div>
            <div className="mt-[26px]">
              <SectionTitle>Notes</SectionTitle>
              <p className="text-[15.5px] leading-relaxed text-ink mt-2.5 mb-0" style={{ fontWeight: 450 }}>
                {view.notes || <span className="text-ink-faint">No notes yet.</span>}
              </p>
            </div>
            <div className="mt-7">
              <SectionTitle>Itinerary</SectionTitle>
              <div className="mt-2.5 rounded-2xl p-[22px_18px] border-[1.5px] border-dashed border-ink/10 bg-white/50 flex items-center gap-[14px]">
                <div className="w-[42px] h-[42px] rounded-xl flex-shrink-0 flex items-center justify-center"
                  style={{ background: 'repeating-linear-gradient(45deg, #f0e3d6, #f0e3d6 6px, #f7ece1 6px, #f7ece1 12px)' }}>
                  <Icon name="calendar" size={20} stroke="#b8a99f" sw={1.8} />
                </div>
                <div>
                  <div className="text-[14.5px] font-semibold text-ink">Day-by-day planning</div>
                  <div className="font-mono text-[11.5px] text-ink-soft mt-[3px]">// coming in phase 2</div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-[30px]">
              <Btn kind="primary" icon="edit" onClick={() => setEditing(true)}>Edit trip</Btn>
              <Btn kind="danger" icon="trash" onClick={() => setConfirm(true)}>Delete</Btn>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-[18px]">
            <div>
              <label className={labelCls}>Destination</label>
              <input className={inputCls(tried && !valid)} value={draft.city} placeholder="Where to?" onChange={e => set('city', e.target.value)} />
              {tried && !valid && <span className="text-[#c0492f] text-[12.5px] font-medium mt-1.5 block">Give your trip a destination.</span>}
            </div>
            <div>
              <label className={labelCls}>Country / Region</label>
              <input className={inputCls()} value={draft.country} placeholder="e.g. Portugal" onChange={e => set('country', e.target.value)} />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className={labelCls}>Start</label>
                <input type="date" className={inputCls()} value={draft.start} onChange={e => set('start', e.target.value)} />
              </div>
              <div className="flex-1">
                <label className={labelCls}>End</label>
                <input type="date" className={inputCls()} value={draft.end} min={draft.start || undefined} onChange={e => set('end', e.target.value)} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Cover colour</label>
              <div className="flex gap-2.5 flex-wrap">
                {(Object.keys(COVERS) as (keyof typeof COVERS)[]).map(k => {
                  const [c1, c2] = COVERS[k];
                  return (
                    <button key={k} onClick={() => set('cover', k)}
                      className="w-11 h-11 rounded-[13px] cursor-pointer border-none transition-transform duration-[120ms]"
                      style={{ background: `linear-gradient(145deg, ${c1}, ${c2})`, boxShadow: draft.cover === k ? '0 0 0 3px #fff, 0 0 0 5px #3a2b25' : '0 2px 6px rgba(58,43,37,0.15)' }} />
                  );
                })}
              </div>
              <div className="mt-3 rounded-xl px-[14px] py-[11px] border-[1.5px] border-dashed border-ink/10 flex items-center gap-2.5 text-[13px] text-ink-soft">
                <Icon name="image" size={18} sw={1.8} stroke="#b8a99f" />
                <span className="font-mono text-[11.5px]">cover photo upload — phase 2</span>
              </div>
            </div>
            <div>
              <label className={labelCls}>Notes</label>
              <textarea className={`${inputCls()} resize-y min-h-[96px] leading-relaxed`}
                value={draft.notes} placeholder="Ideas, must-dos, reminders…" onChange={e => set('notes', e.target.value)} />
            </div>
            <div className="flex gap-3 mt-1">
              <Btn kind="primary" icon="check" onClick={save}>{isNew ? 'Create trip' : 'Save changes'}</Btn>
              <Btn kind="soft" onClick={cancel}>Cancel</Btn>
            </div>
          </div>
        )}
      </div>

      {confirm && (
        <ConfirmDelete trip={trip} onCancel={() => setConfirm(false)} onConfirm={() => { deleteTrip(trip.id); navigate('/planner'); }} />
      )}
    </div>
  );
}
