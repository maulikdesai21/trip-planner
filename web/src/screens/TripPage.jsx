import React from 'react';
import { TOKENS, COVERS } from '../tokens.js';
import { fmtRange, nights, tripStatus } from '../data.js';
import Icon from '../components/Icon.jsx';
import Cover from '../components/Cover.jsx';
import StatusChip from '../components/StatusChip.jsx';
import Btn from '../components/Btn.jsx';
import ConfirmDelete from '../components/ConfirmDelete.jsx';

const ctrlBtn = {
  width: 40, height: 40, borderRadius: 999, border: 'none', cursor: 'pointer',
  background: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center',
  justifyContent: 'center', boxShadow: '0 2px 10px rgba(40,24,18,0.18)',
};

function SectionTitle({ children }) {
  return <h3 style={{ fontFamily: TOKENS.display, fontWeight: 700, fontSize: 19, letterSpacing: -0.3, color: TOKENS.ink, margin: 0 }}>{children}</h3>;
}

export default function TripPage({ trip, isNew, startInEdit, onBack, onSave, onDelete }) {
  const [editing, setEditing] = React.useState(!!startInEdit);
  const [draft, setDraft] = React.useState({ ...trip });
  const [confirm, setConfirm] = React.useState(false);
  const [tried, setTried] = React.useState(false);

  const set = (k, v) => setDraft(d => ({ ...d, [k]: v }));
  const valid = draft.city.trim().length > 0;
  const view = editing ? draft : trip;

  const save = () => { setTried(true); if (!valid) return; onSave(draft); setEditing(false); };
  const cancel = () => { if (isNew) return onBack(); setDraft({ ...trip }); setTried(false); setEditing(false); };

  const labelStyle = { fontSize: 12.5, fontWeight: 700, color: TOKENS.inkSoft, letterSpacing: 0.3, textTransform: 'uppercase', marginBottom: 7, display: 'block' };
  const inputStyle = (err) => ({
    width: '100%', boxSizing: 'border-box', padding: '13px 15px', borderRadius: 13,
    border: `1.5px solid ${err ? '#dd6a4e' : TOKENS.line}`, background: '#fff',
    fontFamily: TOKENS.body, fontSize: 15.5, fontWeight: 500, color: TOKENS.ink, outline: 'none',
  });

  return (
    <div style={{ position: 'absolute', inset: 0, background: TOKENS.bg, overflow: 'auto', fontFamily: TOKENS.body }}>
      {/* hero */}
      <div style={{ position: 'relative' }}>
        <Cover coverKey={view.cover} city={view.city || 'New'} height={260} faded={tripStatus(view).key === 'past' && !editing}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(40,24,18,0.55), transparent 55%)' }} />
        </Cover>
        <div style={{ position: 'absolute', top: 18, left: 0, right: 0, padding: '0 16px', display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={isNew ? cancel : onBack} className="iconbtn" style={ctrlBtn}>
            <Icon name="back" size={20} sw={2.2} stroke={TOKENS.ink} />
          </button>
          {!editing && (
            <button onClick={() => setConfirm(true)} className="iconbtn" style={ctrlBtn}>
              <Icon name="trash" size={19} sw={2} stroke="#c0492f" />
            </button>
          )}
        </div>
        {!editing ? (
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 26, padding: '0 24px', color: '#fff' }}>
            <StatusChip trip={view} />
            <h1 style={{ fontFamily: TOKENS.display, fontWeight: 700, fontSize: 44, letterSpacing: -1, margin: '12px 0 0', lineHeight: 1 }}>{view.city}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, fontSize: 15, fontWeight: 500, opacity: 0.95 }}>
              <Icon name="pin" size={16} sw={1.9} /> {view.country}
              <span style={{ opacity: 0.5 }}>·</span>
              {fmtRange(view.start, view.end)}
            </div>
          </div>
        ) : (
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 22, padding: '0 24px', color: '#fff' }}>
            <div style={{ fontFamily: TOKENS.display, fontWeight: 700, fontSize: 34, letterSpacing: -0.6 }}>
              {isNew ? 'New trip' : 'Edit trip'}
            </div>
          </div>
        )}
      </div>

      {/* body */}
      <div style={{ position: 'relative', background: TOKENS.bg, borderRadius: '26px 26px 0 0', marginTop: -22, padding: '30px 32px 48px', minHeight: 260 }}>
        {!editing ? (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              {[
                ['Dates', fmtRange(view.start, view.end).replace(/, \d+$/, '')],
                ['Length', `${nights(view.start, view.end)} nights`],
                ['Status', tripStatus(view).label],
              ].map(([k, v]) => (
                <div key={k} style={{ background: '#fff', borderRadius: 16, padding: '14px 15px', boxShadow: '0 1px 2px rgba(58,43,37,0.05)' }}>
                  <div style={{ fontSize: 11.5, fontWeight: 700, color: TOKENS.inkFaint, letterSpacing: 0.3, textTransform: 'uppercase' }}>{k}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: TOKENS.ink, marginTop: 5, lineHeight: 1.25 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 26 }}>
              <SectionTitle>Notes</SectionTitle>
              <p style={{ fontSize: 15.5, lineHeight: 1.65, color: TOKENS.ink, fontWeight: 450, margin: '10px 0 0' }}>
                {view.notes || <span style={{ color: TOKENS.inkFaint }}>No notes yet.</span>}
              </p>
            </div>
            <div style={{ marginTop: 28 }}>
              <SectionTitle>Itinerary</SectionTitle>
              <div style={{ marginTop: 10, borderRadius: 16, padding: '22px 18px', border: `1.5px dashed ${TOKENS.line}`,
                background: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                  background: 'repeating-linear-gradient(45deg, #f0e3d6, #f0e3d6 6px, #f7ece1 6px, #f7ece1 12px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="calendar" size={20} stroke={TOKENS.inkFaint} sw={1.8} />
                </div>
                <div>
                  <div style={{ fontSize: 14.5, fontWeight: 600, color: TOKENS.ink }}>Day-by-day planning</div>
                  <div style={{ fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 11.5, color: TOKENS.inkSoft, marginTop: 3 }}>// coming in phase 2</div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 30 }}>
              <Btn kind="primary" icon="edit" onClick={() => setEditing(true)}>Edit trip</Btn>
              <Btn kind="danger" icon="trash" onClick={() => setConfirm(true)}>Delete</Btn>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={labelStyle}>Destination</label>
              <input style={inputStyle(tried && !valid)} value={draft.city} placeholder="Where to?" onChange={e => set('city', e.target.value)} />
              {tried && !valid && <span style={{ color: '#c0492f', fontSize: 12.5, fontWeight: 500, marginTop: 6, display: 'block' }}>Give your trip a destination.</span>}
            </div>
            <div>
              <label style={labelStyle}>Country / Region</label>
              <input style={inputStyle()} value={draft.country} placeholder="e.g. Portugal" onChange={e => set('country', e.target.value)} />
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Start</label>
                <input type="date" style={inputStyle()} value={draft.start || ''} onChange={e => set('start', e.target.value)} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>End</label>
                <input type="date" style={inputStyle()} value={draft.end || ''} min={draft.start || undefined} onChange={e => set('end', e.target.value)} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Cover colour</label>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {Object.keys(COVERS).map(k => {
                  const [c1, c2] = COVERS[k];
                  const on = draft.cover === k;
                  return (
                    <button key={k} onClick={() => set('cover', k)} style={{
                      width: 44, height: 44, borderRadius: 13, cursor: 'pointer', border: 'none',
                      background: `linear-gradient(145deg, ${c1}, ${c2})`,
                      boxShadow: on ? `0 0 0 3px #fff, 0 0 0 5px ${TOKENS.ink}` : '0 2px 6px rgba(58,43,37,0.15)',
                      transition: 'transform .12s',
                    }} />
                  );
                })}
              </div>
              <div style={{ marginTop: 12, borderRadius: 12, padding: '11px 14px', border: `1.5px dashed ${TOKENS.line}`,
                display: 'flex', alignItems: 'center', gap: 10, color: TOKENS.inkSoft, fontSize: 13 }}>
                <Icon name="image" size={18} sw={1.8} stroke={TOKENS.inkFaint} />
                <span style={{ fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 11.5 }}>cover photo upload — phase 2</span>
              </div>
            </div>
            <div>
              <label style={labelStyle}>Notes</label>
              <textarea style={{ ...inputStyle(), resize: 'vertical', minHeight: 96, lineHeight: 1.5 }}
                value={draft.notes} placeholder="Ideas, must-dos, reminders…" onChange={e => set('notes', e.target.value)} />
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
              <Btn kind="primary" icon="check" onClick={save}>{isNew ? 'Create trip' : 'Save changes'}</Btn>
              <Btn kind="soft" onClick={cancel}>Cancel</Btn>
            </div>
          </div>
        )}
      </div>

      {confirm && (
        <ConfirmDelete trip={trip} onCancel={() => setConfirm(false)} onConfirm={() => { setConfirm(false); onDelete(trip.id); }} />
      )}
    </div>
  );
}
