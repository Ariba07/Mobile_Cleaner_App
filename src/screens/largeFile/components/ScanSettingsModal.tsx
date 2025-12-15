import React from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity } from 'react-native';
import { largeFilesStyles as styles } from '../LargeStyle';

interface Props {
  visible: boolean;
  onClose: () => void;
  onScan: () => void;
  minSize: string;
  setMinSize: (v: string) => void;
  sortBy: 'size' | 'name';
  setSortBy: (v: 'size' | 'name') => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (v: 'asc' | 'desc') => void;
  isScanning: boolean;
}

export const ScanSettingsModal: React.FC<Props> = ({
  visible,
  onClose,
  onScan,
  minSize,
  setMinSize,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  isScanning,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Scan Settings</Text>
          <Text style={styles.label}>Minimum File Size (MB)</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.numberInput}
              value={minSize}
              onChangeText={setMinSize}
              keyboardType="numeric"
              maxLength={4}
            />
            <Text style={styles.unitText}>MB</Text>
          </View>
          <View style={styles.divider} />

          <Text style={styles.label}>Sort By</Text>
          <View style={styles.chipRow}>
            {['size', 'name'].map(opt => (
              <TouchableOpacity
                key={opt}
                style={[styles.chip, sortBy === opt && styles.chipActive]}
                onPress={() => setSortBy(opt as any)}
              >
                <Text
                  style={[
                    styles.chipText,
                    sortBy === opt && styles.chipTextActive,
                  ]}
                >
                  {opt.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.chipRow}>
            <TouchableOpacity
              style={[styles.chip, sortOrder === 'desc' && styles.chipActive]}
              onPress={() => setSortOrder('desc')}
            >
              <Text
                style={[
                  styles.chipText,
                  sortOrder === 'desc' && styles.chipTextActive,
                ]}
              >
                Descending ⬇
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.chip, sortOrder === 'asc' && styles.chipActive]}
              onPress={() => setSortOrder('asc')}
            >
              <Text
                style={[
                  styles.chipText,
                  sortOrder === 'asc' && styles.chipTextActive,
                ]}
              >
                Ascending ⬆
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.scanBtn}
              onPress={onScan}
              disabled={isScanning}
            >
              <Text style={styles.scanText}>Scan Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
