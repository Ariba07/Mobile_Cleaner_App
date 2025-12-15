import React, { useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { duplicatesStyles as styles } from './DuplicateStyle';
import CustomHeader from '../../components/CustomHeader';
import { AppDispatch, RootState } from '../../store';
import { findDuplicates, deleteFiles } from '../../services/duplicateDetector';
import { setDuplicates } from '../../store/slices/filesSlice';
import {
  startScan,
  updateProgress,
  completeScan,
} from '../../store/slices/scanSlice';
import { formatBytes } from '../../utils/formatters';
import { theme } from '../../theme/Theme';
import { DuplicateGroupCard } from './components/DuplicateGroupCard';

const DuplicatesScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { duplicates } = useSelector((state: RootState) => state.files);
  const { isScanning, progress } = useSelector(
    (state: RootState) => state.scan,
  );
  const anims = useRef({
    statsOpacity: new Animated.Value(0),
    buttonScale: new Animated.Value(0.9),
  }).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(anims.statsOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(anims.buttonScale, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [anims.buttonScale, anims.statsOpacity]);

  const handleScan = useCallback(async () => {
    dispatch(startScan());
    try {
      const dups = await findDuplicates((p, f) =>
        dispatch(updateProgress({ progress: p, file: f })),
      );
      dispatch(setDuplicates(dups));
      if (dups.length === 0)
        Alert.alert('Clean System', 'No duplicate files found.');
    } catch (e) {
      console.log('Scan failed', e);
    }
    dispatch(completeScan());
  }, [dispatch]);

  const handleDeleteFile = useCallback(
    (path: string, groupHash: string) => {
      Alert.alert('Delete Duplicate?', 'This cannot be undone.', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteFiles([path]);
            const newDuplicates = duplicates
              .map(g => {
                if (g.hash === groupHash) {
                  const files = g.files.filter((f: any) => f.path !== path);
                  return {
                    ...g,
                    files,
                    totalSize: files.reduce(
                      (s: number, f: any) => s + f.size,
                      0,
                    ),
                  };
                }
                return g;
              })
              .filter(g => g.files.length > 1);
            dispatch(setDuplicates(newDuplicates));
          },
        },
      ]);
    },
    [duplicates, dispatch],
  );

  const totalWasted = duplicates.reduce(
    (sum, g) => sum + (g.totalSize - g.files[0].size),
    0,
  );

  return (
    <View style={styles.container}>
      <CustomHeader title="Duplicate Files" />
      <Animated.View
        style={[styles.headerStats, { opacity: anims.statsOpacity }]}
      >
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{duplicates.length}</Text>
          <Text style={styles.statLabel}>Groups</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.colors.error }]}>
            {formatBytes(totalWasted)}
          </Text>
          <Text style={styles.statLabel}>Wasted</Text>
        </View>
      </Animated.View>

      <FlatList
        data={duplicates}
        keyExtractor={item => item.hash}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <DuplicateGroupCard
            item={item}
            index={index}
            onDeleteFile={handleDeleteFile}
          />
        )}
      />

      <Animated.View
        style={[styles.scanBtn, { transform: [{ scale: anims.buttonScale }] }]}
      >
        <TouchableOpacity
          onPress={handleScan}
          disabled={isScanning}
          activeOpacity={0.8}
        >
          <Text style={styles.scanBtnText}>START SCAN</Text>
        </TouchableOpacity>
      </Animated.View>

      {isScanning && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={styles.loadingTitle}>Comparing Files</Text>
            <Text style={styles.loadingSub}>
              {progress > 0
                ? `${Math.round(progress)}% Verified`
                : 'Calculating Hashes...'}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};
export default DuplicatesScreen;
