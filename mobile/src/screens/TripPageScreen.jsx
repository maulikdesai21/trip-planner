import React from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Modal, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TOKENS, COVERS } from '../tokens';
import { fmtRange, nights, tripStatus } from '../data';
import Cover from '../components/Cover';
import StatusChip from '../components/StatusChip';
import Btn from '../components/Btn';
import Icon from '../components/Icon';

function SectionTitle({ children }) {
  return <Text style={{ fontSize: 19, fontWeight: '700', color: TOKENS.ink, letterSpacing: -0.3 }}>{children}</Text>;
}

export default function TripPageScreen({ trip, isNew, startInEdit, onBack, onSave, onDelete }) {
  const insets = useSafeAreaInsets();
  const [editing, setEditing] = React.useState(!!startInEdit);
  const [draft, setDraft] = React.useState({ ...trip });
  const [confirm, setConfirm] = React.useState(false);
  const [tried, setTried] = React.useState(false);

  const set = (k, v) => setDraft(d => ({ ...d, [k]: v }));
  const valid = draft.city.trim().length > 0;
  const view = editing ? draft : trip;

  const save = () => { setTried(true); if (!valid) return; onSave(draft); setEditing(false); };
  const cancel = () => { if (isNew) return onBack(); setDraft({ ...trip }); setTried(false); setEditing(false); };

  const status = tripStatus(view);

  return (
    <View style={{ flex: 1, backgroundColor: TOKENS.bg }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* hero */}
        <View style={{ position: 'relative' }}>
          <Cover coverKey={view.cover} city={view.city || 'New'} height={280} faded={status.key === 'past' && !editing}>
            <View style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(40,24,18,0.4)' }} />
          </Cover>
          {/* top controls */}
          <View style={[s.heroControls, { top: insets.top + 10 }]}>
            <TouchableOpacity onPress={isNew ? cancel : onBack} style={s.ctrlBtn}>
              <Icon name="back" size={20} sw={2.2} stroke={TOKENS.ink} />
            </TouchableOpacity>
            {!editing && (
              <TouchableOpacity onPress={() => setConfirm(true)} style={s.ctrlBtn}>
                <Icon name="trash" size={19} sw={2} stroke="#c0492f" />
              </TouchableOpacity>
            )}
          </View>
          {/* hero caption */}
          {!editing ? (
            <View style={s.heroCaption}>
              <StatusChip trip={view} />
              <Text style={s.heroCity}>{view.city}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 }}>
                <Icon name="pin" size={15} sw={1.9} stroke="rgba(255,255,255,0.9)" />
                <Text style={s.heroMeta}>{view.country}  ·  {fmtRange(view.start, view.end)}</Text>
              </View>
            </View>
          ) : (
            <View style={s.heroCaption}>
              <Text style={s.heroEditTitle}>{isNew ? 'New trip' : 'Edit trip'}</Text>
            </View>
          )}
        </View>

        {/* body */}
        <View style={s.body}>
          {!editing ? (
            <>
              {/* quick facts */}
              <View style={{ flexDirection: 'row', gap: 10 }}>
                {[['Dates', fmtRange(view.start, view.end).replace(/, \d+$/, '')], ['Length', `${nights(view.start, view.end)} nights`], ['Status', status.label]].map(([k, v]) => (
                  <View key={k} style={s.factCard}>
                    <Text style={s.factLabel}>{k}</Text>
                    <Text style={s.factValue}>{v}</Text>
                  </View>
                ))}
              </View>
              {/* notes */}
              <View style={{ marginTop: 26 }}>
                <SectionTitle>Notes</SectionTitle>
                <Text style={[s.notesText, !view.notes && { color: TOKENS.inkFaint }]}>
                  {view.notes || 'No notes yet.'}
                </Text>
              </View>
              {/* itinerary placeholder */}
              <View style={{ marginTop: 28 }}>
                <SectionTitle>Itinerary</SectionTitle>
                <View style={s.itinBox}>
                  <View style={s.itinIcon}>
                    <Icon name="calendar" size={20} stroke={TOKENS.inkFaint} sw={1.8} />
                  </View>
                  <View>
                    <Text style={{ fontSize: 14.5, fontWeight: '600', color: TOKENS.ink }}>Day-by-day planning</Text>
                    <Text style={{ fontSize: 11.5, color: TOKENS.inkSoft, marginTop: 3, fontVariant: ['tabular-nums'] }}>// coming in phase 2</Text>
                  </View>
                </View>
              </View>
            </>
          ) : (
            // edit form
            <View style={{ gap: 18 }}>
              <View>
                <Text style={s.label}>Destination</Text>
                <TextInput style={[s.input, tried && !valid && s.inputError]}
                  value={draft.city} placeholder="Where to?" placeholderTextColor={TOKENS.inkFaint}
                  onChangeText={v => set('city', v)} />
                {tried && !valid && <Text style={s.errTxt}>Give your trip a destination.</Text>}
              </View>
              <View>
                <Text style={s.label}>Country / Region</Text>
                <TextInput style={s.input} value={draft.country} placeholder="e.g. Portugal" placeholderTextColor={TOKENS.inkFaint} onChangeText={v => set('country', v)} />
              </View>
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <View style={{ flex: 1 }}>
                  <Text style={s.label}>Start date</Text>
                  <TextInput style={s.input} value={draft.start} placeholder="YYYY-MM-DD" placeholderTextColor={TOKENS.inkFaint} onChangeText={v => set('start', v)} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.label}>End date</Text>
                  <TextInput style={s.input} value={draft.end} placeholder="YYYY-MM-DD" placeholderTextColor={TOKENS.inkFaint} onChangeText={v => set('end', v)} />
                </View>
              </View>
              <View>
                <Text style={s.label}>Cover colour</Text>
                <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
                  {Object.keys(COVERS).map(k => {
                    const [c1] = COVERS[k];
                    const on = draft.cover === k;
                    return (
                      <TouchableOpacity key={k} onPress={() => set('cover', k)}
                        style={[s.swatch, { backgroundColor: c1 }, on && s.swatchActive]} />
                    );
                  })}
                </View>
              </View>
              <View>
                <Text style={s.label}>Notes</Text>
                <TextInput style={[s.input, { minHeight: 96, textAlignVertical: 'top', paddingTop: 13 }]}
                  value={draft.notes} placeholder="Ideas, must-dos, reminders…" placeholderTextColor={TOKENS.inkFaint}
                  multiline onChangeText={v => set('notes', v)} />
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* sticky bottom actions */}
      <View style={[s.bottomBar, { paddingBottom: insets.bottom + 14 }]}>
        {editing ? (
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Btn kind="soft" size="lg" onPress={cancel}>Cancel</Btn>
            <Btn kind="primary" icon="check" size="lg" full onPress={save}>{isNew ? 'Create trip' : 'Save'}</Btn>
          </View>
        ) : (
          <Btn kind="primary" icon="edit" size="lg" full onPress={() => setEditing(true)}>Edit trip</Btn>
        )}
      </View>

      {/* delete confirm */}
      <Modal transparent visible={confirm} animationType="fade" onRequestClose={() => setConfirm(false)}>
        <Pressable style={s.confirmOverlay} onPress={() => setConfirm(false)}>
          <Pressable style={s.confirmBox} onPress={() => {}}>
            <View style={s.trashCircle}>
              <Icon name="trash" size={22} stroke="#c0492f" sw={2} />
            </View>
            <Text style={s.confirmTitle}>Delete {trip.city}?</Text>
            <Text style={s.confirmBody}>This trip and its plans will be removed. This can't be undone.</Text>
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 22 }}>
              <Btn kind="soft" full onPress={() => setConfirm(false)}>Keep it</Btn>
              <TouchableOpacity style={s.deleteBtn} onPress={() => { setConfirm(false); onDelete(trip.id); }}>
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
  heroControls:  { position: 'absolute', left: 0, right: 0, paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between' },
  ctrlBtn:       { width: 40, height: 40, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.92)', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.18, shadowRadius: 6 },
  heroCaption:   { position: 'absolute', left: 0, right: 0, bottom: 26, paddingHorizontal: 24 },
  heroCity:      { fontSize: 38, fontWeight: '700', color: '#fff', marginTop: 12, letterSpacing: -1, lineHeight: 42 },
  heroMeta:      { fontSize: 14, fontWeight: '500', color: 'rgba(255,255,255,0.9)' },
  heroEditTitle: { fontSize: 30, fontWeight: '700', color: '#fff', letterSpacing: -0.6 },
  body:          { backgroundColor: TOKENS.bg, borderRadius: 26, marginTop: -22, padding: 24, minHeight: 300 },
  factCard:      { flex: 1, backgroundColor: '#fff', borderRadius: 14, padding: 14, shadowColor: '#3a2b25', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
  factLabel:     { fontSize: 11.5, fontWeight: '700', color: TOKENS.inkFaint, letterSpacing: 0.3, textTransform: 'uppercase' },
  factValue:     { fontSize: 14, fontWeight: '600', color: TOKENS.ink, marginTop: 5, lineHeight: 18 },
  notesText:     { fontSize: 15.5, lineHeight: 26, color: TOKENS.ink, marginTop: 10 },
  itinBox:       { marginTop: 10, borderRadius: 14, padding: 18, borderWidth: 1.5, borderStyle: 'dashed', borderColor: TOKENS.line, flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: 'rgba(255,255,255,0.5)' },
  itinIcon:      { width: 42, height: 42, borderRadius: 12, backgroundColor: '#f0e3d6', alignItems: 'center', justifyContent: 'center' },
  label:         { fontSize: 12.5, fontWeight: '700', color: TOKENS.inkSoft, letterSpacing: 0.3, textTransform: 'uppercase', marginBottom: 7 },
  input:         { paddingHorizontal: 15, paddingVertical: 13, borderRadius: 13, borderWidth: 1.5, borderColor: TOKENS.line, backgroundColor: '#fff', fontSize: 15.5, fontWeight: '500', color: TOKENS.ink },
  inputError:    { borderColor: '#dd6a4e' },
  errTxt:        { color: '#c0492f', fontSize: 12.5, fontWeight: '500', marginTop: 6 },
  swatch:        { width: 44, height: 44, borderRadius: 13 },
  swatchActive:  { shadowColor: TOKENS.ink, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 1, shadowRadius: 0, borderWidth: 3, borderColor: '#fff', elevation: 8 },
  bottomBar:     { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: 20, paddingTop: 14, backgroundColor: 'transparent' },
  confirmOverlay:{ flex: 1, backgroundColor: 'rgba(58,43,37,0.4)', alignItems: 'center', justifyContent: 'flex-end', padding: 16 },
  confirmBox:    { backgroundColor: '#fff', borderRadius: 24, padding: 26, width: '100%', shadowColor: '#3a2b25', shadowOffset: { width: 0, height: 20 }, shadowOpacity: 0.3, shadowRadius: 30 },
  trashCircle:   { width: 48, height: 48, borderRadius: 999, backgroundColor: '#fbe6df', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  confirmTitle:  { fontSize: 21, fontWeight: '700', color: TOKENS.ink },
  confirmBody:   { fontSize: 14.5, color: TOKENS.inkSoft, marginTop: 8, lineHeight: 22 },
  deleteBtn:     { flex: 1, backgroundColor: '#c0492f', borderRadius: 999, alignItems: 'center', justifyContent: 'center', paddingVertical: 11 },
});
