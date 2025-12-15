import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { storageStyles as styles } from '../StorageStyle';
import { formatBytes } from '../../../utils/formatters';
import { theme } from '../../../theme/Theme';

const FolderIcon = ({ size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 8.2C3 7.08 3 6.52 3.218 6.092C3.41 5.716 3.716 5.41 4.092 5.218C4.52 5 5.08 5 6.2 5H9.68C10.24 5 10.52 5 10.78 5.055C11.012 5.104 11.236 5.188 11.442 5.304C11.674 5.436 11.874 5.626 12.274 6.006L13.726 7.394C14.126 7.774 14.326 7.964 14.558 8.096C14.764 8.212 14.988 8.296 15.22 8.345C15.48 8.4 15.76 8.4 16.32 8.4H17.8C18.92 8.4 19.48 8.4 19.908 8.618C20.284 8.81 20.59 9.116 20.782 9.492C21 9.92 21 10.48 21 11.6V15.8C21 16.92 21 17.48 20.782 17.908C20.59 18.284 20.284 18.59 19.908 18.782C19.48 19 18.92 19 17.8 19H6.2C5.08 19 4.52 19 4.092 18.782C3.716 18.59 3.41 18.284 3.218 17.908C3 17.48 3 16.92 3 15.8V8.2Z"
      stroke={theme.colors.primary}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const StorageListItem: React.FC<{
  item: any;
  index: number;
  totalSize: number;
  color: string;
}> = React.memo(({ item, index, totalSize, color }) => {
  const anims = useRef({
    scale: new Animated.Value(0),
    opacity: new Animated.Value(0),
    progress: new Animated.Value(0),
  }).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(anims.scale, {
        toValue: 1,
        tension: 50,
        friction: 7,
        delay: index * 80,
        useNativeDriver: true,
      }),
      Animated.timing(anims.opacity, {
        toValue: 1,
        duration: 400,
        delay: index * 80,
        useNativeDriver: true,
      }),
    ]).start();
    Animated.timing(anims.progress, {
      toValue: totalSize ? (item.size / totalSize) * 100 : 0,
      duration: 1000,
      delay: index * 80 + 200,
      useNativeDriver: false,
    }).start();
  }, [index, totalSize, item.size, anims.scale, anims.opacity, anims.progress]);

  const animatedWidth = anims.progress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <Animated.View
      style={[
        styles.itemContainer,
        { transform: [{ scale: anims.scale }], opacity: anims.opacity },
      ]}
    >
      <View style={styles.iconBox}>
        <FolderIcon />
      </View>
      <View style={styles.itemContent}>
        <View style={styles.row}>
          <Text style={styles.folderName}>{item.name}</Text>
          <Text style={styles.folderSize}>{formatBytes(item.size)}</Text>
        </View>
        <View style={styles.progressBg}>
          <Animated.View
            style={[
              styles.progressFill,
              { width: animatedWidth, backgroundColor: color },
            ]}
          />
        </View>
        <Text style={styles.fileCount}>
          {item.fileCount} files •{' '}
          {totalSize ? ((item.size / totalSize) * 100).toFixed(1) : 0}%
        </Text>
      </View>
    </Animated.View>
  );
});
