/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { duplicatesStyles as styles } from '../DuplicateStyle';
import { formatBytes } from '../../../utils/formatters';
import { theme } from '../../../theme/Theme';

const StatusIcon = ({ isOriginal }: { isOriginal: boolean }) => (
  <Svg width={4} height={32} viewBox="0 0 4 32">
    <Path
      d="M0 4C0 1.79086 1.79086 0 4 0V32C1.79086 32 0 30.2091 0 28V4Z"
      fill={isOriginal ? theme.colors.success : theme.colors.error}
    />
  </Svg>
);

const FileRow: React.FC<{
  file: any;
  isOriginal: boolean;
  onDelete: () => void;
}> = ({ file, isOriginal, onDelete }) => (
  <View style={styles.fileRow}>
    <View style={{ width: 4 }}>
      <StatusIcon isOriginal={isOriginal} />
    </View>
    <View style={{ flex: 1, marginLeft: 12 }}>
      <Text style={styles.filePath} numberOfLines={1}>
        {file.path.replace(file.name, '')}
      </Text>
      {isOriginal && <Text style={styles.originalTag}>Original (Keep)</Text>}
    </View>
    {!isOriginal && (
      <TouchableOpacity style={styles.deleteAction} onPress={onDelete}>
        <Text style={styles.deleteActionText}>DELETE</Text>
      </TouchableOpacity>
    )}
  </View>
);

export const DuplicateGroupCard: React.FC<{
  item: any;
  index: number;
  onDeleteFile: (p: string, h: string) => void;
}> = React.memo(({ item, index, onDeleteFile }) => {
  const anims = useRef({
    scale: new Animated.Value(0),
    opacity: new Animated.Value(0),
  }).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(anims.scale, {
        toValue: 1,
        tension: 50,
        friction: 7,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(anims.opacity, {
        toValue: 1,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [anims.opacity, anims.scale, index]);

  return (
    <Animated.View
      style={[
        styles.groupCard,
        { transform: [{ scale: anims.scale }], opacity: anims.opacity },
      ]}
    >
      <View style={styles.groupHeader}>
        <View style={styles.groupInfo}>
          <Text style={styles.groupName} numberOfLines={1}>
            {item.files[0].name}
          </Text>
          <Text style={styles.groupMeta}>
            {item.files.length} copies • {formatBytes(item.files[0].size)} each
          </Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            Save {formatBytes(item.totalSize - item.files[0].size)}
          </Text>
        </View>
      </View>
      {item.files.map((file: any, idx: number) => (
        <FileRow
          key={file.path}
          file={file}
          isOriginal={idx === 0}
          onDelete={() => onDeleteFile(file.path, item.hash)}
        />
      ))}
    </Animated.View>
  );
});
