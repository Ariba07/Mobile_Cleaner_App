import React from 'react';
import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { largeFilesStyles as styles } from '../LargeStyle';
import { theme } from '../../../theme/Theme';
import { SearchIcon } from '../../../components/SvgIcons';

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (t: string) => void;
  fileTypeFilter: string;
  setFileTypeFilter: (t: any) => void;
}

export const FilterBar: React.FC<FilterBarProps> = React.memo(
  ({ searchQuery, setSearchQuery, fileTypeFilter, setFileTypeFilter }) => {
    const filters = ['all', 'video', 'image', 'audio', 'document', 'other'];
    return (
      <View style={styles.filterContainer}>
        <View style={styles.searchBox}>
          <SearchIcon size={16} color={theme.colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={theme.colors.textTertiary}
          />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.typeFilterScroll}
        >
          {filters.map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeChip,
                fileTypeFilter === type && styles.typeChipActive,
              ]}
              onPress={() => setFileTypeFilter(type)}
            >
              <Text
                style={[
                  styles.typeChipText,
                  fileTypeFilter === type && styles.typeChipTextActive,
                ]}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  },
);
