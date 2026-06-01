import { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TOKENS } from '../tokens';
import Icon from '../components/Icon';

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
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
      className="flex-1 items-center justify-center"
    >
      <View className="items-center">
        <View className="w-[92px] h-[92px] rounded-[28px] items-center justify-center"
          style={{ backgroundColor: 'rgba(255,255,255,0.16)', shadowColor: '#000', shadowOffset: { width: 0, height: 18 }, shadowOpacity: 0.18, shadowRadius: 25 }}>
          <Icon name="plane" size={46} stroke="#fff" sw={2} />
        </View>
        <Text className="text-[38px] font-bold text-white mt-[22px] tracking-[-0.6px]">Trip Planner</Text>
        <Text className="text-[15.5px] text-white/85 mt-1.5 font-medium">Every journey, beautifully planned</Text>
      </View>
      <View className="absolute bottom-[90px] w-[150px] h-1 rounded-full overflow-hidden"
        style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}>
        <Animated.View className="h-full bg-white rounded-full" style={{ width: progressWidth }} />
      </View>
    </LinearGradient>
  );
}
