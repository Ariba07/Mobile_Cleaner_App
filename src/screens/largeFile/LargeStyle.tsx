// src/screens/largeFile/LargeStyle.ts
import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { theme } from '../../theme/Theme';

export const largeFilesStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  topBar: {
    flexDirection: 'row',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('1.5%'),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statsText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  sortIndicator: {
    backgroundColor: theme.colors.ripple,
    width: wp('18%'),
    height: hp('3%'),
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  sortText: {
    fontSize: wp('3.5%'),
    color: theme.colors.textTertiary,
    fontWeight: '700',
  },

  // Search & Filter Container
  filterContainer: {
    paddingBottom: hp('1%'),
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: wp('4%'),
    height: hp('6%'),
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginHorizontal: wp('5%'),
    marginBottom: hp('1.5%'),
  },
  searchInput: {
    flex: 1,
    marginLeft: wp('2%'),
    fontSize: 16,
    color: theme.colors.textPrimary,
  },

  // NEW: Horizontal Type Chips
  typeFilterScroll: {
    paddingHorizontal: wp('5%'),
    paddingBottom: hp('1%'),
    gap: 8,
  },
  typeChip: {
    width: wp('22%'),
    height: hp('4%'),
    borderRadius: theme.radius.round,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeChipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  typeChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  typeChipTextActive: {
    color: '#FFFFFF',
  },

  listContent: {
    paddingHorizontal: wp('5%'),
    paddingBottom: hp('12%'),
    paddingTop: hp('1%'),
  },

  // FAB
  fabContainer: {
    position: 'absolute',
    bottom: hp('4%'),
    alignSelf: 'center',
    backgroundColor: theme.colors.error,
    paddingHorizontal: wp('6%'),
    paddingVertical: hp('1.8%'),
    borderRadius: theme.radius.round,
    ...theme.shadows.lg,
    zIndex: 10,
  },
  fabText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // Empty State
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('8%'),
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginTop: 16,
  },
  emptySub: {
    fontSize: 16,
    color: theme.colors.textTertiary,
    marginTop: 8,
    marginBottom: 24,
    textAlign: 'center',
    maxWidth: '80%',
  },
  emptyBtn: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: theme.radius.round,
  },
  emptyBtnText: {
    color: '#FFF',
    fontWeight: '600',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    width: wp('85%'),
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.xl,
    padding: wp('6%'),
    ...theme.shadows.lg,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  numberInput: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: theme.radius.md,
    padding: 12,
    fontSize: 18,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    fontWeight: '600',
  },
  unitText: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.textTertiary,
    marginLeft: 12,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.divider,
    marginVertical: 16,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  chip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
  },
  chipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.textSecondary,
  },
  chipTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  modalActions: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: theme.radius.lg,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
  },
  cancelText: {
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  scanBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
  },
  scanText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  // Loading Overlay
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  loadingBox: {
    backgroundColor: '#FFFFFF',
    padding: 32,
    borderRadius: theme.radius.xl,
    alignItems: 'center',
    ...theme.shadows.lg,
  },
  loadingTitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  loadingSub: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.textSecondary,
  },
});
