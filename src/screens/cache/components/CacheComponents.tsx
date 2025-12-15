// src/screens/cache/components/CacheComponents.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { cacheStyles as styles } from '../CacheStyle';

interface CacheItemProps {
  icon: string;
  title: string;
  subtitle: string;
}

// Cache Item Component
export const CacheItem: React.FC<CacheItemProps> = ({
  icon,
  title,
  subtitle,
}) => (
  <View style={styles.cacheItem}>
    <View style={styles.cacheItemIcon}>
      <Text style={styles.cacheItemIconText}>{icon}</Text>
    </View>
    <View style={styles.cacheItemContent}>
      <Text style={styles.cacheItemTitle}>{title}</Text>
      <Text style={styles.cacheItemSubtitle}>{subtitle}</Text>
    </View>
  </View>
);

// Note Card Component
export const NoteCard: React.FC = () => (
  <View style={styles.noteCard}>
    <Text style={styles.noteIcon}>ℹ️</Text>
    <Text style={styles.noteText}>
      Cannot clear other apps' private cache due to Android security
      restrictions. Your personal files are safe.
    </Text>
  </View>
);

// Info Section Component
export const InfoSection: React.FC = () => (
  <View style={styles.infoSection}>
    <Text style={styles.infoTitle}>What Will Be Cleaned?</Text>

    <CacheItem
      icon="📦"
      title="App Cache Files"
      subtitle="Temporary data from this app"
    />
    <CacheItem
      icon="🖼️"
      title="Thumbnail Images"
      subtitle="Generated preview images"
    />
    <CacheItem
      icon="⬇️"
      title="Temporary Downloads"
      subtitle="Incomplete or temp downloads"
    />
    <CacheItem
      icon="🗑️"
      title="System Temp Files"
      subtitle=".tmp, .cache, and temp folders"
    />

    <NoteCard />
  </View>
);
