// src/screens/storage/StorageStyle.ts
import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { theme } from '../../theme/Theme';

export const storageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    paddingBottom: hp('5%'),
  },

  // Loading
  centerState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    color: theme.colors.textSecondary,
    fontSize: 16,
    fontWeight: '500',
  },

  // Chart Card
  chartCard: {
    backgroundColor: theme.colors.surface,
    margin: wp('5%'),
    padding: wp('5%'),
    borderRadius: theme.radius.xl,
    alignItems: 'center',
    ...theme.shadows.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  chartWrapper: {
    marginVertical: hp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerLabel: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  centerText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },

  // Legend
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: hp('2%'),
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },

  // List Section
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginLeft: wp('5%'),
    marginBottom: hp('1.5%'),
  },
  listContainer: {
    paddingHorizontal: wp('5%'),
  },

  // List Item
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: wp('4%'),
    marginBottom: hp('1.5%'),
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  itemContent: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  folderName: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  folderSize: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  progressBg: {
    height: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  fileCount: {
    fontSize: 11,
    color: theme.colors.textTertiary,
    fontWeight: '500',
  },
});
