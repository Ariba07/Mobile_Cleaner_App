/* eslint-disable react-native/no-inline-styles */
// src/components/FileItem.tsx
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { theme } from '../theme/Theme';
import { formatBytes, getFileExtension } from '../utils/formatters';

interface Props {
  file: { name: string; path: string; size: number };
  isSelected: boolean;
  onToggle: () => void;
}

// SVG Check Icon
const CheckIcon = () => (
  <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
    <Path
      d="M10 3L4.5 8.5L2 6"
      stroke="#FFFFFF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const FileItem: React.FC<Props> = ({ file, isSelected, onToggle }) => {
  const ext = getFileExtension(file.name).toUpperCase();

  // Animations
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const checkboxScale = useRef(new Animated.Value(isSelected ? 1 : 0)).current;
  const checkboxOpacity = useRef(
    new Animated.Value(isSelected ? 1 : 0),
  ).current;
  const borderColorAnim = useRef(
    new Animated.Value(isSelected ? 1 : 0),
  ).current;

  useEffect(() => {
    if (isSelected) {
      Animated.parallel([
        Animated.spring(checkboxScale, {
          toValue: 1,
          tension: 100,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.timing(checkboxOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(borderColorAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(checkboxScale, {
          toValue: 0,
          tension: 100,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.timing(checkboxOpacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(borderColorAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [borderColorAnim, checkboxOpacity, checkboxScale, isSelected]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 100,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const animatedBorderColor = borderColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.border, theme.colors.primary],
  });

  const animatedBackgroundColor = borderColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.surface, theme.colors.primaryLight],
  });

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
      }}
    >
      <TouchableOpacity
        onPress={onToggle}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <Animated.View
          style={[
            styles.card,
            {
              borderColor: animatedBorderColor,
              backgroundColor: animatedBackgroundColor,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.iconBox,
              {
                backgroundColor: isSelected ? '#FFFFFF' : '#F1F5F9',
              },
            ]}
          >
            <Text style={styles.extText}>{ext}</Text>
          </Animated.View>

          <View style={styles.info}>
            <Text style={styles.name} numberOfLines={1}>
              {file.name}
            </Text>
            <Text style={styles.size}>{formatBytes(file.size)}</Text>
          </View>

          <View style={styles.checkboxContainer}>
            <Animated.View
              style={[
                styles.checkbox,
                {
                  borderColor: isSelected
                    ? theme.colors.primary
                    : theme.colors.textTertiary,
                  backgroundColor: isSelected
                    ? theme.colors.primary
                    : 'transparent',
                },
              ]}
            >
              <Animated.View
                style={{
                  transform: [{ scale: checkboxScale }],
                  opacity: checkboxOpacity,
                }}
              >
                <CheckIcon />
              </Animated.View>
            </Animated.View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 10,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    ...theme.shadows.sm,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  extText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: theme.colors.textSecondary,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  size: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  checkboxContainer: {
    padding: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FileItem;
