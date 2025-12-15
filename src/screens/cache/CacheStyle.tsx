// src/screens/cache/CacheStyle.ts
import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { theme } from '../../theme/Theme';

export const cacheStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  scrollContent: {
    flexGrow: 1,
    padding: wp('5%'),
    paddingBottom: hp('3%'),
  },

  // Main Circle Display
  circleContainer: {
    width: wp('65%'),
    height: wp('65%'),
    borderRadius: wp('32.5%'),
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: theme.colors.border,
    ...theme.shadows.lg,
    marginTop: hp('3%'),
    marginBottom: hp('4%'),
  },

  sizeText: {
    fontSize: hp('3%'),
    fontWeight: '700',
    color: theme.colors.primary,
    marginTop: hp('2%'),
  },

  label: {
    fontSize: hp('1.8%'),
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginTop: hp('0.5%'),
    fontWeight: '600',
  },

  scanningText: {
    fontSize: hp('2%'),
    color: theme.colors.primary,
    marginTop: hp('2%'),
    fontWeight: '600',
  },

  // Info Section
  infoSection: {
    width: '100%',
    marginBottom: hp('3%'),
  },

  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: hp('2%'),
    paddingHorizontal: wp('2%'),
  },

  // Cache Item
  cacheItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: wp('4%'),
    borderRadius: theme.radius.md,
    marginBottom: hp('1.5%'),
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },

  cacheItemIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('3%'),
  },

  cacheItemIconText: {
    fontSize: 24,
  },

  cacheItemContent: {
    flex: 1,
  },

  cacheItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },

  cacheItemSubtitle: {
    fontSize: 13,
    color: theme.colors.textSecondary,
  },

  // Note Card
  noteCard: {
    flexDirection: 'row',
    backgroundColor: '#FEF3C7',
    padding: wp('4%'),
    borderRadius: theme.radius.md,
    marginTop: hp('2%'),
    borderWidth: 1,
    borderColor: '#FDE68A',
  },

  noteIcon: {
    fontSize: 20,
    marginRight: wp('2%'),
  },

  noteText: {
    flex: 1,
    fontSize: 13,
    color: '#92400E',
    lineHeight: 18,
  },

  // Buttons
  buttonContainer: {
    width: '100%',
    gap: 12,
  },

  refreshBtn: {
    width: '100%',
    backgroundColor: theme.colors.surface,
    paddingVertical: hp('1.8%'),
    borderRadius: theme.radius.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.primary,
    ...theme.shadows.sm,
  },

  refreshBtnDisabled: {
    opacity: 0.5,
    borderColor: theme.colors.border,
  },

  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  refreshBtnText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },

  cleanBtn: {
    width: '100%',
    backgroundColor: theme.colors.primary,
    paddingVertical: hp('2.2%'),
    borderRadius: theme.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.md,
  },

  cleanBtnDisabled: {
    backgroundColor: theme.colors.textTertiary,
    opacity: 0.6,
  },

  cleanBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // Info Card (Legacy - kept for compatibility)
  infoCard: {
    width: '100%',
    backgroundColor: theme.colors.primaryLight,
    padding: wp('4%'),
    borderRadius: theme.radius.md,
    marginBottom: hp('4%'),
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },

  infoText: {
    color: theme.colors.primary,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },

  // Legacy styles kept for compatibility
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: wp('6%'),
  },

  scanningContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  infoNote: {
    marginTop: 12,
    fontSize: 13,
    color: '#64748B',
    fontStyle: 'italic',
  },

  rescanBtn: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },

  rescanBtnText: {
    color: '#475569',
    fontSize: 16,
    fontWeight: '600',
  },
});
