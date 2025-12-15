import React, { useMemo, useCallback } from 'react';
import { View, Text, Animated } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { storageStyles as styles } from '../StorageStyle';
import { formatBytes } from '../../../utils/formatters';

interface StorageChartProps {
  folders: any[];
  chartOpacity: Animated.Value;
  chartScale: Animated.Value;
  totalSize: number;
}

const CenterLabel: React.FC<{
  totalSize: number;
  animatedValue: Animated.Value;
}> = ({ totalSize, animatedValue }) => (
  <Animated.View style={[styles.centerLabel, { opacity: animatedValue }]}>
    <Text style={styles.centerValue}>{formatBytes(totalSize)}</Text>
    <Text style={styles.centerText}>Used</Text>
  </Animated.View>
);

export const StorageChart: React.FC<StorageChartProps> = React.memo(
  ({ folders, chartOpacity, chartScale, totalSize }) => {
    const pieData = useMemo(() => {
      const palette = [
        '#3B82F6',
        '#10B981',
        '#F59E0B',
        '#EF4444',
        '#8B5CF6',
        '#EC4899',
        '#6366F1',
      ];
      return folders.map((folder, index) => ({
        value: folder.size,
        color: palette[index % palette.length],
        name: folder.name,
      }));
    }, [folders]);

    const renderCenterLabel = useCallback(
      () => <CenterLabel totalSize={totalSize} animatedValue={chartOpacity} />,
      [totalSize, chartOpacity],
    );

    return (
      <Animated.View
        style={[
          styles.chartCard,
          { opacity: chartOpacity, transform: [{ scale: chartScale }] },
        ]}
      >
        <View style={styles.chartWrapper}>
          <PieChart
            data={pieData}
            donut
            radius={80}
            innerRadius={60}
            centerLabelComponent={renderCenterLabel}
          />
        </View>
        <View style={styles.legendContainer}>
          {pieData.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View
                style={[styles.legendDot, { backgroundColor: item.color }]}
              />
              <Text style={styles.legendText} numberOfLines={1}>
                {item.name}
              </Text>
            </View>
          ))}
        </View>
      </Animated.View>
    );
  },
);
