import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { homeStyles as styles } from '../HomeStyle';
import { FolderIcon, CopyIcon, BoltIcon, ChartIcon } from '../../../components/SvgIcons';

export const DashboardCard: React.FC<{
  item: any;
  index: number;
  onPress: () => void;
}> = ({ item, index, onPress }) => {
  const anims = useRef({
    scale: new Animated.Value(0),
    opacity: new Animated.Value(0),
  }).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(anims.scale, {
        toValue: 1,
        tension: 50,
        friction: 7,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(anims.opacity, {
        toValue: 1,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [anims.opacity, anims.scale, index]);

  const onPressHandlers = {
    in: () =>
      Animated.spring(anims.scale, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start(),
    out: () =>
      Animated.spring(anims.scale, {
        toValue: 1,
        tension: 50,
        friction: 3,
        useNativeDriver: true,
      }).start(),
  };


  const iconMap = {
    'Large Files': FolderIcon,
    Duplicates: CopyIcon,
    Cache: BoltIcon,
    Storage: ChartIcon,
  };

  const IconComponent =
    iconMap[item.title as keyof typeof iconMap] || FolderIcon;

  return (
    <Animated.View
      style={{ transform: [{ scale: anims.scale }], opacity: anims.opacity }}
    >
      <TouchableOpacity
        style={styles.card}
        onPress={onPress}
        onPressIn={onPressHandlers.in}
        onPressOut={onPressHandlers.out}
        activeOpacity={1}
      >
        <View style={[styles.iconBox, { backgroundColor: item.bg }]}>
          <IconComponent size={28} color={item.color} />
        </View>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSubtitle}>{item.sub}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
