import React from 'react';
import { View, Text, Animated, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TOKENS } from '../tokens';
import Icon from '../components/Icon';

const { width: W } = Dimensions.get('window');

export default function SplashScreen({ onDone }) {
  const progress = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(progress, { toValue: 1, duration: 3000, useNativeDriver: false }).start();
    const timer = setTimeout(onDone, 3000);
    return () => clearTimeout(timer);
  }, []);

  const progressWidth = progress.interpolate({ inputRange: [0, 1], outputRange: [0, 150] });

  return (
    <LinearGradient
      colors={['#f7b27e', TOKENS.primary, TOKENS.primaryDk]}
      locations={[0, 0.45, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={s.container}
    >
      <View style={s.content}>
        <View style={s.iconBox}>
          <Icon name="plane" size={46} stroke="#fff" sw={2} />
        </View>
        <Text style={s.title}>Trip Planner</Text>
        <Text style={s.subtitle}>Every journey, beautifully planned</Text>
      </View>
      <View style={s.progressTrack}>
        <Animated.View style={[s.progressFill, { width: progressWidth }]} />
      </View>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  container:    { flex: 1, alignItems: 'center', justifyContent: 'center' },
  content:      { alignItems: 'center' },
  iconBox:      { width: 92, height: 92, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.16)', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 18 }, shadowOpacity: 0.18, shadowRadius: 25 },
  title:        { fontSize: 38, fontWeight: '700', color: '#fff', marginTop: 22, letterSpacing: -0.6 },
  subtitle:     { fontSize: 15.5, color: 'rgba(255,255,255,0.85)', marginTop: 6, fontWeight: '500' },
  progressTrack:{ position: 'absolute', bottom: 90, width: 150, height: 4, borderRadius: 99, backgroundColor: 'rgba(255,255,255,0.25)', overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#fff', borderRadius: 99 },
});
