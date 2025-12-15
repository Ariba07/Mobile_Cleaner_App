import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Animated,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { storageStyles as styles } from './StorageStyle';
import CustomHeader from '../../components/CustomHeader';
import { AppDispatch, RootState } from '../../store';
import { analyzeStorage } from '../../services/storageAnalyzer';
import { setFolders } from '../../store/slices/filesSlice';
import { theme } from '../../theme/Theme';
import { StorageChart } from './components/StorageChart';
import { StorageListItem } from './components/StorageListItems';

const StorageAnalyzerScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { folders } = useSelector((state: RootState) => state.files);
  const [loading, setLoading] = useState(true);
  const chartAnim = useRef({
    opacity: new Animated.Value(0),
    scale: new Animated.Value(0.8),
  }).current;

  useEffect(() => {
    analyzeStorage().then(res => {
      dispatch(setFolders(res));
      setLoading(false);
      Animated.parallel([
        Animated.timing(chartAnim.opacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(chartAnim.scale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, [chartAnim.opacity, chartAnim.scale, dispatch]);

  const totalSize = useMemo(
    () => folders.reduce((acc, curr) => acc + curr.size, 0),
    [folders],
  );
  const palette = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <View style={styles.container}>
      <CustomHeader title="Storage Analysis" />
      {loading ? (
        <View style={styles.centerState}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Analyzing Storage...</Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <StorageChart
            folders={folders}
            chartOpacity={chartAnim.opacity}
            chartScale={chartAnim.scale}
            totalSize={totalSize}
          />
          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.listContainer}>
            {folders.map((item, index) => (
              <StorageListItem
                key={item.path}
                item={item}
                index={index}
                totalSize={totalSize}
                color={palette[index % palette.length]}
              />
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};
export default StorageAnalyzerScreen;
