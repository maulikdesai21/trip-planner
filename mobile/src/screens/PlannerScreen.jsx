import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TOKENS } from '../tokens';
import { fmtRange, nights, tripStatus } from '../data';
import Logo from '../components/Logo';
import Cover from '../components/Cover';
import StatusChip from '../components/StatusChip';
import Btn from '../components/Btn';
import Avatar from '../components/Avatar';
import Icon from '../components/Icon';

export default function PlannerScreen({ trips, onOpen, onNew, onEdit, onDelete }) {
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = React.useState('all');
  const [menuId, setMenuId] = React.useState(null);
  const [confirmTrip, setConfirmTrip] = React.useState(null);

  const isPast = t => tripStatus(t).key === 'past';
  const shown = trips.filter(t =>
    filter === 'all' ? true : filter === 'past' ? isPast(t) : !isPast(t));
  const upcomingCount = trips.filter(t => !isPast(t)).length;
  const filters = [['all','All'], ['upcoming','Upcoming'], ['past','Past']];

  return (
    <View style={[s.screen, { paddingTop: insets.top }]}>
      {/* top bar */}
      <View style={s.topBar}>
        <View style={s.logoRow}>
          <Logo size={32} />
          <Text style={s.wordmark}>Trip Planner</Text>
        </View>
        <Avatar size={36} />
      </View>

      {/* header */}
      <View style={s.header}>
        <Text style={s.welcome}>WELCOME BACK, MAYA</Text>
        <Text style={s.heading}>Your trips</Text>
        <Text style={s.subheading}>
          {upcomingCount > 0 ? `${upcomingCount} ${upcomingCount === 1 ? 'adventure' : 'adventures'} on the horizon` : 'Time to dream up your next escape'}
        </Text>
      </View>

      {/* filters */}
      <View style={s.filterRow}>
        {filters.map(([k, lbl]) => (
          <TouchableOpacity key={k} onPress={() => setFilter(k)}
            style={[s.filterBtn, filter === k && s.filterBtnActive]}>
            <Text style={[s.filterTxt, filter === k && s.filterTxtActive]}>{lbl}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* list */}
      {shown.length === 0 ? (
        <View style={s.empty}>
          <Icon name="pin" size={40} stroke={TOKENS.inkFaint} sw={1.6} />
          <Text style={s.emptyTitle}>Nothing here yet</Text>
          <Text style={s.emptyBody}>Start planning your next escape.</Text>
          <View style={{ marginTop: 20 }}><Btn kind="primary" icon="plus" onPress={onNew}>Plan a new trip</Btn></View>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120, gap: 16 }} showsVerticalScrollIndicator={false}>
          {shown.map(t => (
            <TouchableOpacity key={t.id} activeOpacity={0.92} onPress={() => onOpen(t)}
              style={s.card}>
              <Cover coverKey={t.cover} city={t.city} height={160} faded={isPast(t)}>
                <View style={{ position: 'absolute', top: 12, left: 12 }}><StatusChip trip={t} /></View>
                <TouchableOpacity onPress={() => setMenuId(menuId === t.id ? null : t.id)}
                  style={s.dotsBtn}>
                  <Icon name="dots" size={18} sw={2.4} stroke={TOKENS.ink} />
                </TouchableOpacity>
              </Cover>
              <View style={s.cardBody}>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <Text style={s.cardCity}>{t.city}</Text>
                  <Text style={s.cardNights}>{nights(t.start, t.end)} nights</Text>
                </View>
                <Text style={s.cardCountry}>{t.country}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 12 }}>
                  <Icon name="calendar" size={16} sw={1.9} stroke={TOKENS.primary} />
                  <Text style={s.cardDate}>{fmtRange(t.start, t.end)}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* FAB */}
      <View style={[s.fab, { paddingBottom: insets.bottom + 14 }]}>
        <Btn kind="primary" icon="plus" size="lg" full onPress={onNew}>New trip</Btn>
      </View>

      {/* context menu modal */}
      <Modal transparent visible={!!menuId} animationType="fade" onRequestClose={() => setMenuId(null)}>
        <Pressable style={s.menuOverlay} onPress={() => setMenuId(null)}>
          <View style={s.menuBox}>
            <TouchableOpacity style={s.menuRow} onPress={() => { const t = trips.find(x => x.id === menuId); setMenuId(null); onEdit(t); }}>
              <Icon name="edit" size={17} stroke={TOKENS.ink} sw={2} />
              <Text style={s.menuTxt}>Edit trip</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.menuRow} onPress={() => { const t = trips.find(x => x.id === menuId); setMenuId(null); setConfirmTrip(t); }}>
              <Icon name="trash" size={17} stroke="#c0492f" sw={2} />
              <Text style={[s.menuTxt, { color: '#c0492f' }]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* delete confirm */}
      <Modal transparent visible={!!confirmTrip} animationType="fade" onRequestClose={() => setConfirmTrip(null)}>
        <Pressable style={s.confirmOverlay} onPress={() => setConfirmTrip(null)}>
          <Pressable style={s.confirmBox} onPress={() => {}}>
            <View style={s.trashCircle}>
              <Icon name="trash" size={22} stroke="#c0492f" sw={2} />
            </View>
            <Text style={s.confirmTitle}>Delete {confirmTrip?.city}?</Text>
            <Text style={s.confirmBody}>This trip and its plans will be removed. This can't be undone.</Text>
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 22 }}>
              <Btn kind="soft" full onPress={() => setConfirmTrip(null)}>Keep it</Btn>
              <TouchableOpacity style={s.deleteBtn} onPress={() => { onDelete(confirmTrip.id); setConfirmTrip(null); }}>
                <Text style={{ color: '#fff', fontWeight: '600', fontSize: 14.5 }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  screen:       { flex: 1, backgroundColor: TOKENS.bg },
  topBar:       { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 14, paddingBottom: 4 },
  logoRow:      { flexDirection: 'row', alignItems: 'center', gap: 11 },
  wordmark:     { fontSize: 17, fontWeight: '700', color: TOKENS.ink, letterSpacing: -0.3 },
  header:       { paddingHorizontal: 20, paddingTop: 14 },
  welcome:      { color: TOKENS.primary, fontWeight: '700', fontSize: 13.5, letterSpacing: 0.3 },
  heading:      { fontSize: 32, fontWeight: '700', color: TOKENS.ink, marginTop: 6, letterSpacing: -1 },
  subheading:   { color: TOKENS.inkSoft, fontSize: 14.5, fontWeight: '500', marginTop: 4 },
  filterRow:    { flexDirection: 'row', gap: 8, paddingHorizontal: 20, paddingTop: 18, paddingBottom: 4 },
  filterBtn:    { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 999 },
  filterBtnActive: { backgroundColor: TOKENS.ink },
  filterTxt:    { fontWeight: '600', fontSize: 13.5, color: TOKENS.inkSoft },
  filterTxtActive: { color: '#fff' },
  empty:        { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30 },
  emptyTitle:   { fontSize: 20, fontWeight: '700', color: TOKENS.ink, marginTop: 14 },
  emptyBody:    { fontSize: 14.5, color: TOKENS.inkSoft, marginTop: 6 },
  card:         { backgroundColor: '#fff', borderRadius: 22, overflow: 'hidden', shadowColor: '#3a2b25', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.07, shadowRadius: 20, elevation: 4 },
  dotsBtn:      { position: 'absolute', top: 12, right: 12, width: 32, height: 32, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.92)', alignItems: 'center', justifyContent: 'center' },
  cardBody:     { padding: 15 },
  cardCity:     { fontSize: 21, fontWeight: '700', color: TOKENS.ink, letterSpacing: -0.4 },
  cardNights:   { fontSize: 12.5, fontWeight: '600', color: TOKENS.inkFaint },
  cardCountry:  { fontSize: 13.5, color: TOKENS.inkSoft, fontWeight: '500', marginTop: 2 },
  cardDate:     { fontSize: 13.5, color: TOKENS.inkSoft, fontWeight: '500' },
  fab:          { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: 20, paddingTop: 14, backgroundColor: 'transparent' },
  menuOverlay:  { flex: 1, backgroundColor: 'rgba(58,43,37,0.3)', alignItems: 'center', justifyContent: 'center' },
  menuBox:      { backgroundColor: '#fff', borderRadius: 14, padding: 6, minWidth: 180, shadowColor: '#3a2b25', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.22, shadowRadius: 16 },
  menuRow:      { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderRadius: 9 },
  menuTxt:      { fontSize: 14.5, fontWeight: '500', color: TOKENS.ink },
  confirmOverlay: { flex: 1, backgroundColor: 'rgba(58,43,37,0.4)', alignItems: 'center', justifyContent: 'flex-end', padding: 16 },
  confirmBox:   { backgroundColor: '#fff', borderRadius: 24, padding: 26, width: '100%', shadowColor: '#3a2b25', shadowOffset: { width: 0, height: 20 }, shadowOpacity: 0.3, shadowRadius: 30 },
  trashCircle:  { width: 48, height: 48, borderRadius: 999, backgroundColor: '#fbe6df', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  confirmTitle: { fontSize: 21, fontWeight: '700', color: TOKENS.ink },
  confirmBody:  { fontSize: 14.5, color: TOKENS.inkSoft, marginTop: 8, lineHeight: 22 },
  deleteBtn:    { flex: 1, backgroundColor: '#c0492f', borderRadius: 999, alignItems: 'center', justifyContent: 'center', paddingVertical: 11 },
});
