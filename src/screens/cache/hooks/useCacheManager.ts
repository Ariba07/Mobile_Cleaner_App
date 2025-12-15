// src/screens/cache/hooks/useCacheManager.ts
import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { getCacheSize, clearCache } from '../../../services/storageAnalyzer';
import { setCacheSize } from '../../../store/slices/filesSlice';
import { formatBytes } from '../../../utils/formatters';

export const useCacheManager = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [scanning, setScanning] = useState(false);
  const [cleaning, setCleaning] = useState(false);

  const loadCacheSize = useCallback(async () => {
    setScanning(true);
    try {
      const size = await getCacheSize();
      dispatch(setCacheSize(size));
    } catch (error) {
      console.error('Failed to get cache size:', error);
      Alert.alert('Error', 'Failed to calculate cache size.');
    } finally {
      setScanning(false);
    }
  }, [dispatch]);

  const handleClean = useCallback(
    async (cacheSize: number) => {
      if (cacheSize === 0 || cleaning) return;

      Alert.alert(
        'Clear Cache',
        `This will delete ${formatBytes(
          cacheSize,
        )} of temporary files.\n\nYour personal files will not be affected.\n\nContinue?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Clear Cache',
            style: 'destructive',
            onPress: async () => {
              setCleaning(true);
              try {
                const success = await clearCache();

                if (success) {
                  dispatch(setCacheSize(0));
                  Alert.alert(
                    '✨ Success',
                    'Cache cleared successfully! Your device storage has been freed up.',
                    [{ text: 'OK' }],
                  );
                } else {
                  Alert.alert(
                    'Partial Success',
                    'Some cache files were cleared, but some could not be deleted due to system restrictions.',
                    [{ text: 'OK', onPress: () => loadCacheSize() }],
                  );
                }
              } catch (error) {
                console.error('Failed to clear cache:', error);
                Alert.alert(
                  'Error',
                  'Failed to clear cache. Please try again.',
                  [{ text: 'OK' }],
                );
              } finally {
                setCleaning(false);
              }
            },
          },
        ],
      );
    },
    [cleaning, dispatch, loadCacheSize],
  );

  return {
    scanning,
    cleaning,
    loadCacheSize,
    handleClean,
  };
};
