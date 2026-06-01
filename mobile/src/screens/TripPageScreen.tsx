import { useState, useRef } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Modal, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COVERS, CoverKey } from '../tokens';
import { Trip, fmtRange, nights, tripStatus } from '../data';
import Cover from '../components/Cover';
import StatusChip from '../components/StatusChip';
import Btn from '../components/Btn';
import Icon from '../components/Icon';

interface Props {
  trip: Trip;
  isNew: boolean;
  startInEdit: boolean;
  onBack: () => void;
  onSave: (t: Trip) => void;
  onDelete: (id: string) => void;
}

const labelCls = 'text-[12.5px] font-bold text-ink-soft tracking-[0.3px] uppercase mb-[7px]';

export default function TripPageScreen({ trip, isNew, startInEdit, onBack, onSave, onDelete }: Props) {
  const insets = useSafeAreaInsets();
  const [editing, setEditing] = useState(startInEdit);
  const [draft, setDraft] = useState<Trip>({ ...trip });
  const [confirm, setConfirm] = useState(false);
  const [tried, setTried] = useState(false);

  const set = <K extends keyof Trip>(k: K, v: Trip[K]) => setDraft(d => ({ ...d, [k]: v }));
  const valid = draft.city.trim().length > 0;
  const view = editing ? draft : trip;
  const status = tripStatus(view);

  const save = () => {
    setTried(true);
    if (!valid) return;
    onSave(draft);
    if (isNew) onBack();
    else setEditing(false);
  };
  const cancel = () => {
    if (isNew) return onBack();
    setDraft({ ...trip }); setTried(false); setEditing(false);
  };

  const inputStyle = (err = false) => ({
    paddingHorizontal: 15, paddingVertical: 13, borderRadius: 13,
    borderWidth: 1.5, borderColor: err ? '#dd6a4e' : 'rgba(58,43,37,0.10)',
    backgroundColor: '#fff', fontSize: 15.5, fontWeight: '500' as const, color: '#3a2b25',
  });

  return (
    <View className="flex-1 bg-cream">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* hero */}
        <View className="relative">
          <Cover coverKey={view.cover} city={view.city || 'New'} height={280} faded={status.key === 'past' && !editing}>
            <View className="absolute inset-0" style={{ backgroundColor: 'rgba(40,24,18,0.4)' }} />
          </Cover>
          <View className="absolute left-0 right-0 flex-row justify-between px-4" style={{ top: insets.top + 10 }}>
            <TouchableOpacity onPress={isNew ? cancel : onBack}
              className="w-10 h-10 rounded-full items-center justify-center"
              style={{ backgroundColor: 'rgba(255,255,255,0.92)', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.18, shadowRadius: 6 }}>
              <Icon name="back" size={20} sw={2.2} stroke="#3a2b25" />
            </TouchableOpacity>
            {!editing && (
              <TouchableOpacity onPress={() => setConfirm(true)}
                className="w-10 h-10 rounded-full items-center justify-center"
                style={{ backgroundColor: 'rgba(255,255,255,0.92)', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.18, shadowRadius: 6 }}>
                <Icon name="trash" size={19} sw={2} stroke="#c0492f" />
              </TouchableOpacity>
            )}
          </View>
          {!editing ? (
            <View className="absolute left-0 right-0 bottom-[26px] px-6">
              <StatusChip trip={view} />
              <Text className="text-[38px] font-bold text-white mt-3 tracking-[-1px] leading-[42px]">{view.city}</Text>
              <View className="flex-row items-center gap-2 mt-2">
                <Icon name="pin" size={15} sw={1.9} stroke="rgba(255,255,255,0.9)" />
                <Text className="text-[14px] font-medium text-white/90">{view.country}  ·  {fmtRange(view.start, view.end)}</Text>
              </View>
            </View>
          ) : (
            <View className="absolute left-0 right-0 bottom-[22px] px-6">
              <Text className="text-[30px] font-bold text-white tracking-[-0.6px]">{isNew ? 'New trip' : 'Edit trip'}</Text>
            </View>
          )}
        </View>

        {/* body */}
        <View className="bg-cream rounded-[26px_26px_0_0] -mt-[22px] p-6 min-h-[300px]">
          {!editing ? (
            <>
              <View className="flex-row gap-2.5">
                {([['Dates', fmtRange(view.start, view.end).replace(/, \d+$/, '')], ['Length', `${nights(view.start, view.end)} nights`], ['Status', status.label]] as [string,string][]).map(([k, v]) => (
                  <View key={k} className="flex-1 bg-white rounded-2xl p-[14px]"
                    style={{ shadowColor: '#3a2b25', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 }}>
                    <Text className="text-[11.5px] font-bold text-ink-faint tracking-[0.3px] uppercase">{k}</Text>
                    <Text className="text-[14px] font-semibold text-ink mt-[5px] leading-[18px]">{v}</Text>
                  </View>
                ))}
              </View>
              <View className="mt-[26px]">
                <Text className="text-[19px] font-bold text-ink tracking-[-0.3px]">Notes</Text>
                <Text className="text-[15.5px] text-ink mt-2.5 leading-[26px]" style={{ fontWeight: view.notes ? '400' : '400', color: view.notes ? '#3a2b25' : '#b8a99f' }}>
                  {view.notes || 'No notes yet.'}
                </Text>
              </View>
              <View className="mt-7">
                <Text className="text-[19px] font-bold text-ink tracking-[-0.3px]">Itinerary</Text>
                <View className="mt-2.5 rounded-2xl p-[18px] flex-row items-center gap-[14px] bg-white/50"
                  style={{ borderWidth: 1.5, borderStyle: 'dashed', borderColor: 'rgba(58,43,37,0.10)' }}>
                  <View className="w-[42px] h-[42px] rounded-xl bg-[#f0e3d6] items-center justify-center">
                    <Icon name="calendar" size={20} stroke="#b8a99f" sw={1.8} />
                  </View>
                  <View>
                    <Text className="text-[14.5px] font-semibold text-ink">Day-by-day planning</Text>
                    <Text className="text-[11.5px] text-ink-soft mt-[3px]">// coming in phase 2</Text>
                  </View>
                </View>
              </View>
            </>
          ) : (
            <View className="gap-[18px]">
              <View>
                <Text className={labelCls}>Destination</Text>
                <TextInput style={inputStyle(tried && !valid)} value={draft.city} placeholder="Where to?" placeholderTextColor="#b8a99f" onChangeText={v => set('city', v)} />
                {tried && !valid && <Text className="text-[#c0492f] text-[12.5px] font-medium mt-1.5">Give your trip a destination.</Text>}
              </View>
              <View>
                <Text className={labelCls}>Country / Region</Text>
                <TextInput style={inputStyle()} value={draft.country} placeholder="e.g. Portugal" placeholderTextColor="#b8a99f" onChangeText={v => set('country', v)} />
              </View>
              <View className="flex-row gap-3">
                <View className="flex-1">
                  <Text className={labelCls}>Start date</Text>
                  <TextInput style={inputStyle()} value={draft.start} placeholder="YYYY-MM-DD" placeholderTextColor="#b8a99f" onChangeText={v => set('start', v)} />
                </View>
                <View className="flex-1">
                  <Text className={labelCls}>End date</Text>
                  <TextInput style={inputStyle()} value={draft.end} placeholder="YYYY-MM-DD" placeholderTextColor="#b8a99f" onChangeText={v => set('end', v)} />
                </View>
              </View>
              <View>
                <Text className={labelCls}>Cover colour</Text>
                <View className="flex-row gap-2.5 flex-wrap">
                  {(Object.keys(COVERS) as CoverKey[]).map(k => {
                    const [c1] = COVERS[k];
                    return (
                      <TouchableOpacity key={k} onPress={() => set('cover', k)}
                        style={{ width: 44, height: 44, borderRadius: 13, backgroundColor: c1,
                          borderWidth: draft.cover === k ? 3 : 0, borderColor: '#fff',
                          shadowColor: '#3a2b25', shadowOffset: { width: 0, height: 2 }, shadowOpacity: draft.cover === k ? 0.4 : 0.15, shadowRadius: 4 }} />
                    );
                  })}
                </View>
              </View>
              <View>
                <Text className={labelCls}>Notes</Text>
                <TextInput style={{ ...inputStyle(), minHeight: 96, textAlignVertical: 'top', paddingTop: 13 }}
                  value={draft.notes} placeholder="Ideas, must-dos, reminders…" placeholderTextColor="#b8a99f"
                  multiline onChangeText={v => set('notes', v)} />
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* sticky actions */}
      <View className="absolute left-0 right-0 bottom-0 px-5 pt-[14px]" style={{ paddingBottom: insets.bottom + 14 }}>
        {editing ? (
          <View className="flex-row gap-3">
            <Btn kind="soft" size="lg" onPress={cancel}>Cancel</Btn>
            <Btn kind="primary" icon="check" size="lg" full onPress={save}>{isNew ? 'Create trip' : 'Save'}</Btn>
          </View>
        ) : (
          <Btn kind="primary" icon="edit" size="lg" full onPress={() => setEditing(true)}>Edit trip</Btn>
        )}
      </View>

      {/* delete confirm */}
      <Modal transparent visible={confirm} animationType="fade" onRequestClose={() => setConfirm(false)}>
        <Pressable className="flex-1 justify-end p-4" style={{ backgroundColor: 'rgba(58,43,37,0.4)' }} onPress={() => setConfirm(false)}>
          <Pressable onPress={() => {}} className="bg-white rounded-3xl p-[26px]"
            style={{ shadowColor: '#3a2b25', shadowOffset: { width: 0, height: 20 }, shadowOpacity: 0.3, shadowRadius: 30 }}>
            <View className="w-12 h-12 rounded-full bg-[#fbe6df] items-center justify-center mb-4">
              <Icon name="trash" size={22} stroke="#c0492f" sw={2} />
            </View>
            <Text className="text-[21px] font-bold text-ink">Delete {trip.city}?</Text>
            <Text className="text-[14.5px] text-ink-soft mt-2 leading-[22px]">This trip and its plans will be removed. This can't be undone.</Text>
            <View className="flex-row gap-2.5 mt-[22px]">
              <Btn kind="soft" full onPress={() => setConfirm(false)}>Keep it</Btn>
              <TouchableOpacity className="flex-1 bg-[#c0492f] rounded-full items-center justify-center py-[11px]"
                onPress={() => { setConfirm(false); onDelete(trip.id); }}>
                <Text className="text-white font-semibold text-[14.5px]">Delete</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
