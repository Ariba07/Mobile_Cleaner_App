// src/screens/duplicate/DuplicateStyle.ts
import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { theme } from '../../theme/Theme';

export const duplicatesStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerStats: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: hp('2%'),
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
  },
  statItem: { alignItems: 'center', flex: 1 },
  statDivider: {
    width: 1,
    height: '60%',
    backgroundColor: theme.colors.divider,
  },
  statValue: { fontSize: 20, fontWeight: '700', color: theme.colors.primary },
  statLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  listContent: {
    padding: wp('4%'),
    paddingBottom: hp('10%'),
  },

  // Group Card
  groupCard: {
    backgroundColor: theme.colors.surface,
    marginBottom: hp('2%'),
    borderRadius: theme.radius.lg,
    padding: wp('4%'),
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: hp('1.5%'),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
    paddingBottom: hp('1.5%'),
  },
  groupInfo: { flex: 1, marginRight: 10 },
  groupName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  groupMeta: {
    fontSize: 13,
    color: theme.colors.textSecondary,
  },
  badge: {
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    color: theme.colors.error,
    fontSize: 11,
    fontWeight: '700',
  },

  // File Rows
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('1.2%'),
  },
  fileIndicator: {
    width: 4,
    height: 32,
    borderRadius: 2,
    marginRight: 12,
  },
  filePath: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    fontFamily: 'System', // Clean sans-serif
  },
  originalTag: {
    fontSize: 10,
    color: theme.colors.success,
    fontWeight: '700',
    marginTop: 2,
  },

  // Delete Button
  deleteAction: {
    marginLeft: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FEF2F2',
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  deleteActionText: {
    color: theme.colors.error,
    fontSize: 11,
    fontWeight: '700',
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp('15%'),
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  emptySub: {
    fontSize: 15,
    color: theme.colors.textSecondary,
    marginTop: 8,
    marginBottom: 24,
  },

  footer: {
    padding: wp('5%'),
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    alignItems: 'center',
    ...theme.shadows.md, // Add a subtle shadow for elevation effect
  },
  scanBtn: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.round,
    ...theme.shadows.md,
    position: 'absolute',
    bottom: hp('4%'),
    alignSelf: 'center',
    paddingHorizontal: wp('6%'),
    paddingVertical: hp('1.8%'),
    ...theme.shadows.lg,
    zIndex: 10,
  },
  scanBtnText: { color: '#FFF', fontWeight: '600', fontSize: 16 },

  // Loading Overlay
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
    fontWeight: '600',
    color: theme.colors.primary,
  },
  loadingHint: {
    marginTop: 4,
    fontSize: 12,
    color: theme.colors.textTertiary,
  },
});
