import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Trip, fmtRange, nights, tripStatus } from '../data';
import Logo from '../components/Logo';
import Cover from '../components/Cover';
import StatusChip from '../components/StatusChip';
import Btn from '../components/Btn';
import Avatar from '../components/Avatar';
import Icon from '../components/Icon';

interface Props {
  trips: Trip[];
  onOpen: (t: Trip) => void;
  onNew: () => void;
  onEdit: (t: Trip) => void;
  onDelete: (id: string) => void;
}

const FILTERS: [string, string][] = [['all','All'],['upcoming','Upcoming'],['past','Past']];

export default function PlannerScreen({ trips, onOpen, onNew, onEdit, onDelete }: Props) {
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState('all');
  const [menuId, setMenuId] = useState<string | null>(null);
  const [confirmTrip, setConfirmTrip] = useState<Trip | null>(null);

  const isPast = (t: Trip) => tripStatus(t).key === 'past';
  const shown = trips.filter(t => filter === 'all' ? true : filter === 'past' ? isPast(t) : !isPast(t));
  const upcomingCount = trips.filter(t => !isPast(t)).length;

  return (
    <View className="flex-1 bg-cream" style={{ paddingTop: insets.top }}>
      {/* top bar */}
      <View className="flex-row items-center justify-between px-5 pt-[14px] pb-1">
        <View className="flex-row items-center gap-[11px]">
          <Logo size={32} />
          <Text className="text-[17px] font-bold text-ink tracking-[-0.3px]">Trip Planner</Text>
        </View>
        <Avatar size={36} />
      </View>

      {/* header */}
      <View className="px-5 pt-[14px]">
        <Text className="text-primary font-bold text-[13.5px] tracking-[0.3px]">WELCOME BACK, MAYA</Text>
        <Text className="text-[32px] font-bold text-ink mt-1.5 tracking-[-1px]">Your trips</Text>
        <Text className="text-ink-soft text-[14.5px] font-medium mt-1">
          {upcomingCount > 0 ? `${upcomingCount} ${upcomingCount === 1 ? 'adventure' : 'adventures'} on the horizon` : 'Time to dream up your next escape'}
        </Text>
      </View>

      {/* filters */}
      <View className="flex-row gap-2 px-5 pt-[18px] pb-1">
        {FILTERS.map(([k, lbl]) => (
          <TouchableOpacity key={k} onPress={() => setFilter(k)}
            className={`py-2 px-4 rounded-full ${filter === k ? 'bg-ink' : 'bg-transparent'}`}>
            <Text className={`font-semibold text-[13.5px] ${filter === k ? 'text-white' : 'text-ink-soft'}`}>{lbl}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* list */}
      {shown.length === 0 ? (
        <View className="flex-1 items-center justify-center px-[30px]">
          <Icon name="pin" size={40} stroke="#b8a99f" sw={1.6} />
          <Text className="text-[20px] font-bold text-ink mt-[14px]">Nothing here yet</Text>
          <Text className="text-[14.5px] text-ink-soft mt-1.5 mb-5">Start planning your next escape.</Text>
          <Btn kind="primary" icon="plus" onPress={onNew}>Plan a new trip</Btn>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120, gap: 16 }} showsVerticalScrollIndicator={false}>
          {shown.map(t => (
            <TouchableOpacity key={t.id} activeOpacity={0.92} onPress={() => onOpen(t)}
              className="bg-white rounded-[22px] overflow-hidden"
              style={{ shadowColor: '#3a2b25', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.07, shadowRadius: 20, elevation: 4 }}>
              <Cover coverKey={t.cover} city={t.city} height={160} faded={isPast(t)}>
                <View className="absolute top-3 left-3"><StatusChip trip={t} /></View>
                <TouchableOpacity onPress={() => setMenuId(menuId === t.id ? null : t.id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full items-center justify-center"
                  style={{ backgroundColor: 'rgba(255,255,255,0.92)' }}>
                  <Icon name="dots" size={18} sw={2.4} stroke="#3a2b25" />
                </TouchableOpacity>
              </Cover>
              <View className="p-[15px]">
                <View className="flex-row items-baseline justify-between">
                  <Text className="text-[21px] font-bold text-ink tracking-[-0.4px]">{t.city}</Text>
                  <Text className="text-[12.5px] font-semibold text-ink-faint">{nights(t.start, t.end)} nights</Text>
                </View>
                <Text className="text-[13.5px] text-ink-soft font-medium mt-0.5">{t.country}</Text>
                <View className="flex-row items-center gap-[7px] mt-3">
                  <Icon name="calendar" size={16} sw={1.9} stroke="#e76f51" />
                  <Text className="text-[13.5px] text-ink-soft font-medium">{fmtRange(t.start, t.end)}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* FAB */}
      <View className="absolute left-0 right-0 bottom-0 px-5 pt-[14px]" style={{ paddingBottom: insets.bottom + 14 }}>
        <Btn kind="primary" icon="plus" size="lg" full onPress={onNew}>New trip</Btn>
      </View>

      {/* context menu */}
      <Modal transparent visible={!!menuId} animationType="fade" onRequestClose={() => setMenuId(null)}>
        <Pressable className="flex-1 items-center justify-center" style={{ backgroundColor: 'rgba(58,43,37,0.3)' }} onPress={() => setMenuId(null)}>
          <View className="bg-white rounded-[14px] p-1.5 min-w-[180px]"
            style={{ shadowColor: '#3a2b25', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.22, shadowRadius: 16 }}>
            <TouchableOpacity className="flex-row items-center gap-2.5 p-3 rounded-[9px]"
              onPress={() => { const t = trips.find(x => x.id === menuId)!; setMenuId(null); onEdit(t); }}>
              <Icon name="edit" size={17} stroke="#3a2b25" sw={2} />
              <Text className="text-[14.5px] font-medium text-ink">Edit trip</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center gap-2.5 p-3 rounded-[9px]"
              onPress={() => { const t = trips.find(x => x.id === menuId)!; setMenuId(null); setConfirmTrip(t); }}>
              <Icon name="trash" size={17} stroke="#c0492f" sw={2} />
              <Text className="text-[14.5px] font-medium text-[#c0492f]">Delete</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* delete confirm */}
      <Modal transparent visible={!!confirmTrip} animationType="fade" onRequestClose={() => setConfirmTrip(null)}>
        <Pressable className="flex-1 justify-end p-4" style={{ backgroundColor: 'rgba(58,43,37,0.4)' }} onPress={() => setConfirmTrip(null)}>
          <Pressable onPress={() => {}} className="bg-white rounded-3xl p-[26px] w-full"
            style={{ shadowColor: '#3a2b25', shadowOffset: { width: 0, height: 20 }, shadowOpacity: 0.3, shadowRadius: 30 }}>
            <View className="w-12 h-12 rounded-full bg-[#fbe6df] items-center justify-center mb-4">
              <Icon name="trash" size={22} stroke="#c0492f" sw={2} />
            </View>
            <Text className="text-[21px] font-bold text-ink">Delete {confirmTrip?.city}?</Text>
            <Text className="text-[14.5px] text-ink-soft mt-2 leading-[22px]">This trip and its plans will be removed. This can't be undone.</Text>
            <View className="flex-row gap-2.5 mt-[22px]">
              <Btn kind="soft" full onPress={() => setConfirmTrip(null)}>Keep it</Btn>
              <TouchableOpacity className="flex-1 bg-[#c0492f] rounded-full items-center justify-center py-[11px]"
                onPress={() => { if (confirmTrip) { onDelete(confirmTrip.id); setConfirmTrip(null); } }}>
                <Text className="text-white font-semibold text-[14.5px]">Delete</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
