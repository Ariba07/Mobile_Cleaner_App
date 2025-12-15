// src/screens/cache/components/CacheDisplayCircle.tsx
import React from 'react';
import { Text, Animated } from 'react-native';
import { cacheStyles as styles } from '../CacheStyle';
import { formatBytes } from '../../../utils/formatters';
import { theme } from '../../../theme/Theme';
import { RefreshIcon, SparklesIcon, TrashIcon } from '../../../components/SvgIcons';

interface CacheDisplayCircleProps {
  cacheSize: number;
  scanning: boolean;
  scaleAnim: Animated.Value;
  pulseAnim: Animated.Value;
  rotation: Animated.AnimatedInterpolation<string | number>;
}

export const CacheDisplayCircle: React.FC<CacheDisplayCircleProps> = ({
  cacheSize,
  scanning,
  scaleAnim,
  pulseAnim,
  rotation,
}) => {
  const isClean = cacheSize === 0;

  return (
    <Animated.View
      style={[
        styles.circleContainer,
        {
          transform: [
            { scale: scanning ? scaleAnim : isClean ? pulseAnim : 1 },
          ],
        },
      ]}
    >
      {scanning ? (
        <>
          <Animated.View style={{ transform: [{ rotate: rotation }] }}>
            <RefreshIcon size={60} color={theme.colors.primary} />
          </Animated.View>
          <Text style={styles.scanningText}>Analyzing...</Text>
        </>
      ) : isClean ? (
        <>
          <SparklesIcon size={80} />
          <Text style={[styles.sizeText, { color: theme.colors.success }]}>
            Clean
          </Text>
          <Text style={styles.label}>All Optimized</Text>
        </>
      ) : (
        <>
          <TrashIcon size={80} color={theme.colors.warning} />
          <Text style={[styles.sizeText, { color: theme.colors.warning }]}>
            {formatBytes(cacheSize)}
          </Text>
          <Text style={styles.label}>Cache Found</Text>
        </>
      )}
    </Animated.View>
  );
};
