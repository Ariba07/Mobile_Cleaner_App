// src/screens/cache/components/CacheActionButtons.tsx
import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { cacheStyles as styles } from '../CacheStyle';
import { theme } from '../../../theme/Theme';
import { RefreshIcon } from '../../../components/SvgIcons';

interface CacheActionButtonsProps {
  scanning: boolean;
  cleaning: boolean;
  cacheSize: number;
  onRefresh: () => void;
  onClean: () => void;
}

export const CacheActionButtons: React.FC<CacheActionButtonsProps> = ({
  scanning,
  cleaning,
  cacheSize,
  onRefresh,
  onClean,
}) => {
  const isDisabled = cacheSize === 0 || cleaning || scanning;
  const isClean = cacheSize === 0;

  return (
    <View style={styles.buttonContainer}>
      {/* Refresh Button */}
      <TouchableOpacity
        style={[styles.refreshBtn, scanning && styles.refreshBtnDisabled]}
        onPress={onRefresh}
        disabled={scanning || cleaning}
        activeOpacity={0.7}
      >
        <View style={styles.buttonContent}>
          {scanning ? (
            <ActivityIndicator color={theme.colors.primary} size="small" />
          ) : (
            <RefreshIcon size={20} color={theme.colors.primary} />
          )}
          <Text style={styles.refreshBtnText}>
            {scanning ? 'Scanning...' : 'Rescan Storage'}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Clean Button */}
      <TouchableOpacity
        style={[styles.cleanBtn, isDisabled && styles.cleanBtnDisabled]}
        onPress={onClean}
        disabled={isDisabled}
        activeOpacity={0.8}
      >
        {cleaning ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.cleanBtnText}>
            {isClean ? '✓ Optimized' : '🧹 Clean Now'}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
