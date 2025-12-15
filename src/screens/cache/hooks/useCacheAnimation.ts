// src/screens/cache/hooks/useCacheAnimations.ts
import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export const useCacheAnimations = (scanning: boolean, cacheSize: number) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Initial entrance animation
  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  // Rotation animation for scanning
  useEffect(() => {
    if (scanning) {
      const rotationAnimation = Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      );
      rotationAnimation.start();

      return () => {
        rotationAnimation.stop();
        rotateAnim.setValue(0);
      };
    }
  }, [scanning, rotateAnim]);

  // Pulse animation for clean state
  useEffect(() => {
    if (cacheSize === 0) {
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      );
      pulseAnimation.start();

      return () => {
        pulseAnimation.stop();
        pulseAnim.setValue(1);
      };
    }
  }, [cacheSize, pulseAnim]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return {
    scaleAnim,
    pulseAnim,
    rotation,
  };
};
