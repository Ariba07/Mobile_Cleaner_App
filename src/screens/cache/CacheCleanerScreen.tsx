// src/screens/cache/CacheCleanerScreen.tsx
import React, { useEffect, useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { cacheStyles as styles } from './CacheStyle';
import CustomHeader from '../../components/CustomHeader';
import { RootState } from '../../store';
import { CacheDisplayCircle } from './components/CacheDisplayCircle';
import { InfoSection } from './components/CacheComponents';
import { CacheActionButtons } from './components/CacheActionButtons';
import { useCacheAnimations } from './hooks/useCacheAnimation';
import { useCacheManager } from './hooks/useCacheManager';

const CacheCleanerScreen: React.FC = () => {
  const { cacheSize } = useSelector((state: RootState) => state.files);

  // Custom hooks for logic separation
  const { scanning, cleaning, loadCacheSize, handleClean } = useCacheManager();
  const { scaleAnim, pulseAnim, rotation } = useCacheAnimations(
    scanning,
    cacheSize,
  );

  // Load cache size on mount
  useEffect(() => {
    loadCacheSize();
  }, [loadCacheSize]);

  // Handle refresh
  const handleRefresh = useCallback(() => {
    loadCacheSize();
  }, [loadCacheSize]);

  // Handle clean with cache size
  const handleCleanClick = useCallback(() => {
    handleClean(cacheSize);
  }, [handleClean, cacheSize]);

  return (
    <View style={styles.container}>
      <CustomHeader title="Cache Cleaner" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Circle Display */}
        <CacheDisplayCircle
          cacheSize={cacheSize}
          scanning={scanning}
          scaleAnim={scaleAnim}
          pulseAnim={pulseAnim}
          rotation={rotation}
        />

        {/* Info Section */}
        <InfoSection />

        {/* Action Buttons */}
        <CacheActionButtons
          scanning={scanning}
          cleaning={cleaning}
          cacheSize={cacheSize}
          onRefresh={handleRefresh}
          onClean={handleCleanClick}
        />
      </ScrollView>
    </View>
  );
};

export default CacheCleanerScreen;
