import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Animated,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { largeFilesStyles as styles } from './LargeStyle';
import CustomHeader from '../../components/CustomHeader';
import FileItem from '../../components/FileItem';
import { FilterBar } from './components/FilterBar';
import { ScanSettingsModal } from './components/ScanSettingsModal';
import { AppDispatch, RootState } from '../../store';
import {
  toggleFileSelection,
  removeFiles,
  clearSelection,
  setLargeFiles,
} from '../../store/slices/filesSlice';
import { scanLargeFiles, deleteFiles } from '../../services/fileScanner';
import {
  startScan,
  updateProgress,
  completeScan,
} from '../../store/slices/scanSlice';
import {
  formatBytes,
  getFileExtension,
  getFileType,
} from '../../utils/formatters';
import { theme } from '../../theme/Theme';

const LargeFilesScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { largeFiles, selectedFiles } = useSelector(
    (state: RootState) => state.files,
  );
  const { isScanning, progress } = useSelector(
    (state: RootState) => state.scan,
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [minSizeMB, setMinSizeMB] = useState('10');
  const [sortBy, setSortBy] = useState<'size' | 'name'>('size');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [fileTypeFilter, setFileTypeFilter] = useState<any>('all');
  const [showSettings, setShowSettings] = useState(true);
  const fabAnim = useRef({
    scale: new Animated.Value(0),
    opacity: new Animated.Value(0),
  }).current;

  useEffect(() => {
    const toValue = selectedFiles.length > 0 ? 1 : 0;
    Animated.parallel([
      Animated.spring(fabAnim.scale, {
        toValue,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(fabAnim.opacity, {
        toValue,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fabAnim.opacity, fabAnim.scale, selectedFiles.length]);

  const filteredFiles = useMemo(() => {
    let result = Array.from(new Map(largeFiles.map(f => [f.path, f])).values()); // Unique paths
    if (searchQuery)
      result = result.filter(f =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    if (fileTypeFilter !== 'all')
      result = result.filter(
        f =>
          getFileType(getFileExtension(f.name)).toLowerCase() ===
          fileTypeFilter,
      );
    return result.sort(
      (a, b) =>
        (sortBy === 'size' ? a.size - b.size : a.name.localeCompare(b.name)) *
        (sortOrder === 'asc' ? 1 : -1),
    );
  }, [largeFiles, searchQuery, sortBy, sortOrder, fileTypeFilter]);

  const handleScan = async () => {
    const sizeLimit = parseFloat(minSizeMB) * 1024 * 1024;
    if (isNaN(sizeLimit) || sizeLimit <= 0)
      return Alert.alert('Invalid Input', 'Enter valid size.');
    setShowSettings(false);
    dispatch(startScan());
    try {
      const files = await scanLargeFiles(sizeLimit, (p, f) =>
        dispatch(updateProgress({ progress: p, file: f })),
      );
      dispatch(setLargeFiles(files));
      if (files.length === 0)
        Alert.alert('Scan Complete', `No files > ${minSizeMB}MB found.`);
    } catch (e) {
      console.log(e);
    }
    dispatch(completeScan());
  };

  const handleDelete = () => {
    Alert.alert('Confirm Delete', `Delete ${selectedFiles.length} files?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteFiles(selectedFiles);
          dispatch(removeFiles(selectedFiles));
          dispatch(clearSelection());
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Large Files" />
      <View style={styles.topBar}>
        <Text style={styles.statsText}>{filteredFiles.length} files found</Text>
        <TouchableOpacity
          onPress={() => setShowSettings(true)}
          style={styles.sortIndicator}
        >
          <Text style={styles.sortText}>Filter</Text>
          <Icon
            name="filter"
            size={15}
            color={theme.colors.textTertiary}
            type="ionicon"
          />
        </TouchableOpacity>
      </View>

      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        fileTypeFilter={fileTypeFilter}
        setFileTypeFilter={setFileTypeFilter}
      />

      <FlatList
        data={filteredFiles}
        keyExtractor={item => item.path}
        renderItem={({ item }) => (
          <FileItem
            file={item}
            isSelected={selectedFiles.includes(item.path)}
            onToggle={() => dispatch(toggleFileSelection(item.path))}
          />
        )}
        contentContainerStyle={styles.listContent}
        initialNumToRender={10}
        windowSize={5}
      />

      {selectedFiles.length > 0 && !isScanning && (
        <Animated.View
          style={[
            styles.fabContainer,
            { transform: [{ scale: fabAnim.scale }], opacity: fabAnim.opacity },
          ]}
        >
          <TouchableOpacity onPress={handleDelete} activeOpacity={0.8}>
            <Text style={styles.fabText}>
              Delete {selectedFiles.length} (
              {formatBytes(
                largeFiles
                  .filter(f => selectedFiles.includes(f.path))
                  .reduce((a, b) => a + b.size, 0),
              )}
              )
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      <ScanSettingsModal
        visible={showSettings}
        onClose={() => setShowSettings(false)}
        onScan={handleScan}
        minSize={minSizeMB}
        setMinSize={setMinSizeMB}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        isScanning={isScanning}
      />

      {isScanning && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={styles.loadingTitle}>Scanning Storage</Text>
            <Text style={styles.loadingSub}>
              {Math.round(progress)}% Complete
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};
export default LargeFilesScreen;
