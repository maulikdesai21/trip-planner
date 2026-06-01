import React from 'react';
import { TOKENS } from '../tokens.js';
import { fmtRange, nights, tripStatus } from '../data.js';
import Icon from '../components/Icon.jsx';
import Logo from '../components/Logo.jsx';
import Cover from '../components/Cover.jsx';
import StatusChip from '../components/StatusChip.jsx';
import Btn from '../components/Btn.jsx';
import Avatar from '../components/Avatar.jsx';
import ConfirmDelete from '../components/ConfirmDelete.jsx';

export default function Planner({ trips, onOpen, onNew, onEdit, onDelete }) {
  const [filter, setFilter] = React.useState('all');
  const [menuId, setMenuId] = React.useState(null);
  const [confirmTrip, setConfirmTrip] = React.useState(null);

  const isPast = t => tripStatus(t).key === 'past';
  const shown = trips.filter(t =>
    filter === 'all' ? true : filter === 'past' ? isPast(t) : !isPast(t));
  const upcomingCount = trips.filter(t => !isPast(t)).length;
  const filters = [['all','All'], ['upcoming','Upcoming'], ['past','Past']];

  const card = (t) => (
    <div key={t.id} className="tcard" onClick={() => onOpen(t)}
      style={{ position: 'relative', background: '#fff', borderRadius: 22, overflow: 'hidden',
        cursor: 'pointer', boxShadow: '0 1px 2px rgba(58,43,37,0.05), 0 10px 30px rgba(58,43,37,0.07)' }}>
      <Cover coverKey={t.cover} city={t.city} height={150} faded={isPast(t)}>
        <div style={{ position: 'absolute', top: 12, left: 12 }}><StatusChip trip={t} /></div>
        <button className="iconbtn" onClick={(e) => { e.stopPropagation(); setMenuId(menuId === t.id ? null : t.id); }}
          style={{ position: 'absolute', top: 12, right: 12, width: 32, height: 32, borderRadius: 999,
            background: 'rgba(255,255,255,0.92)', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: TOKENS.ink,
            boxShadow: '0 2px 8px rgba(58,43,37,0.14)' }}>
          <Icon name="dots" size={18} sw={2.4} />
        </button>
        {menuId === t.id && (
          <>
            <div onClick={(e) => { e.stopPropagation(); setMenuId(null); }} style={{ position: 'fixed', inset: 0, zIndex: 40 }} />
            <div style={{ position: 'absolute', top: 48, right: 12, zIndex: 41, background: '#fff',
              borderRadius: 14, padding: 6, minWidth: 150, boxShadow: '0 8px 30px rgba(58,43,37,0.22)' }}>
              {[['edit','Edit trip', () => onEdit(t)], ['trash','Delete', () => setConfirmTrip(t)]].map(([ic, lbl, fn]) => (
                <button key={lbl} className="menurow"
                  onClick={(e) => { e.stopPropagation(); setMenuId(null); fn(); }}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', border: 'none',
                    background: 'transparent', cursor: 'pointer', padding: '10px 12px', borderRadius: 9,
                    fontFamily: TOKENS.body, fontSize: 14.5, fontWeight: 500,
                    color: ic === 'trash' ? '#c0492f' : TOKENS.ink }}>
                  <Icon name={ic} size={17} sw={2} /> {lbl}
                </button>
              ))}
            </div>
          </>
        )}
      </Cover>
      <div style={{ padding: '15px 17px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
          <span style={{ fontFamily: TOKENS.display, fontWeight: 700, fontSize: 21, letterSpacing: -0.4, color: TOKENS.ink }}>{t.city}</span>
          <span style={{ fontSize: 12.5, fontWeight: 600, color: TOKENS.inkFaint }}>{nights(t.start, t.end)} nights</span>
        </div>
        <div style={{ fontSize: 13.5, color: TOKENS.inkSoft, fontWeight: 500, marginTop: 2 }}>{t.country}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 12, color: TOKENS.inkSoft, fontSize: 13.5, fontWeight: 500 }}>
          <Icon name="calendar" size={16} sw={1.9} stroke={TOKENS.primary} />
          {fmtRange(t.start, t.end)}
        </div>
      </div>
    </div>
  );

  const addCard = (
    <button className="addcard" onClick={onNew}
      style={{ border: `2px dashed ${TOKENS.line}`, background: 'rgba(255,255,255,0.4)', borderRadius: 22,
        cursor: 'pointer', minHeight: 220, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 12, fontFamily: TOKENS.body }}>
      <div style={{ width: 46, height: 46, borderRadius: 999, background: TOKENS.primary,
        display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 16px rgba(231,111,81,0.3)' }}>
        <Icon name="plus" size={24} stroke="#fff" sw={2.4} />
      </div>
      <span style={{ fontWeight: 600, fontSize: 15, color: TOKENS.ink }}>Plan a new trip</span>
    </button>
  );

  return (
    <div style={{ position: 'absolute', inset: 0, background: TOKENS.bg, overflow: 'auto', fontFamily: TOKENS.body }}>
      {/* top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 40px 8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <Logo size={34} />
          <span style={{ fontFamily: TOKENS.display, fontWeight: 700, fontSize: 18, letterSpacing: -0.3, color: TOKENS.ink }}>Trip Planner</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button className="iconbtn" style={{ width: 40, height: 40, borderRadius: 999, border: 'none',
            background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: TOKENS.inkSoft, boxShadow: '0 2px 10px rgba(58,43,37,0.08)' }}>
            <Icon name="search" size={19} sw={2} />
          </button>
          <Avatar size={40} />
        </div>
      </div>

      {/* header */}
      <div style={{ padding: '20px 40px 0', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <div style={{ color: TOKENS.primary, fontWeight: 700, fontSize: 13.5, letterSpacing: 0.3 }}>WELCOME BACK, MAYA</div>
          <h1 style={{ fontFamily: TOKENS.display, fontWeight: 700, fontSize: 40, letterSpacing: -1, color: TOKENS.ink, margin: '6px 0 0' }}>Your trips</h1>
          <div style={{ color: TOKENS.inkSoft, fontSize: 15.5, fontWeight: 500, marginTop: 4 }}>
            {upcomingCount > 0 ? `${upcomingCount} ${upcomingCount === 1 ? 'adventure' : 'adventures'} on the horizon` : 'Time to dream up your next escape'}
          </div>
        </div>
        <Btn kind="primary" icon="plus" onClick={onNew}>New trip</Btn>
      </div>

      {/* filters */}
      <div style={{ display: 'flex', gap: 8, padding: '24px 40px 4px' }}>
        {filters.map(([k, lbl]) => (
          <button key={k} onClick={() => setFilter(k)} style={{
            border: 'none', cursor: 'pointer', padding: '8px 16px', borderRadius: 999,
            fontFamily: TOKENS.body, fontWeight: 600, fontSize: 13.5,
            background: filter === k ? TOKENS.ink : 'transparent',
            color: filter === k ? '#fff' : TOKENS.inkSoft, transition: 'all .15s ease',
          }}>{lbl}</button>
        ))}
      </div>

      {/* grid */}
      {shown.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px 30px 30px', color: TOKENS.inkSoft }}>
          <div style={{ opacity: 0.5, marginBottom: 14, display: 'flex', justifyContent: 'center' }}>
            <Icon name="pin" size={40} stroke={TOKENS.inkFaint} sw={1.6} />
          </div>
          <div style={{ fontFamily: TOKENS.display, fontWeight: 700, fontSize: 20, color: TOKENS.ink }}>Nothing here yet</div>
          <div style={{ fontSize: 14.5, marginTop: 6, marginBottom: 20 }}>Start planning your next escape.</div>
          <Btn kind="primary" icon="plus" onClick={onNew}>Plan a new trip</Btn>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 22, padding: '20px 40px 48px' }}>
          {shown.map(card)}
          {filter !== 'past' && addCard}
        </div>
      )}

      {confirmTrip && (
        <ConfirmDelete trip={confirmTrip}
          onCancel={() => setConfirmTrip(null)}
          onConfirm={() => { onDelete(confirmTrip.id); setConfirmTrip(null); }} />
      )}
    </div>
  );
}
