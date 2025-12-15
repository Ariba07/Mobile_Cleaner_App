// src/screens/home/HomeStyle.ts
import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { theme } from '../../theme/Theme';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerContainer: {
    paddingHorizontal: wp('6%'),
    paddingTop: hp('3%'),
    paddingBottom: hp('2%'),
  },
  greeting: {
    fontSize: hp('2%'),
    color: theme.colors.textSecondary,
    marginBottom: hp('0.5%'),
    fontWeight: '500',
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.textPrimary,
    marginBottom: hp('1%'),
  },
  subtitle: {
    fontSize: hp('1.8%'),
    color: theme.colors.textSecondary,
    lineHeight: hp('2.5%'),
    maxWidth: '80%',
  },
  permissionContainer: {
    marginHorizontal: wp('6%'),
    marginBottom: hp('3%'),
    padding: wp('4%'),
    backgroundColor: '#FEF2F2', // Soft red bg
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  permissionText: {
    color: theme.colors.error,
    fontWeight: '600',
    fontSize: hp('1.6%'),
  },
  permissionButton: {
    backgroundColor: theme.colors.error,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    borderRadius: theme.radius.md,
  },
  permissionButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: hp('1.5%'),
  },

  gridContainer: {
    paddingHorizontal: wp('6%'),
    paddingBottom: hp('4%'),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
  },

  card: {
    width: wp('42%'),
    backgroundColor: theme.colors.surface,
    padding: wp('5%'),
    borderRadius: theme.radius.xl,
    ...theme.shadows.md,
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  iconBox: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: theme.radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  cardTitle: {
    fontSize: hp('2%'),
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: hp('0.5%'),
  },
  cardSubtitle: {
    fontSize: hp('1.5%'),
    color: theme.colors.textSecondary,
    lineHeight: hp('2%'),
  },

  footer: {
    alignItems: 'center',
    paddingVertical: hp('2%'),
    opacity: 0.6,
  },
  footerText: {
    fontSize: hp('1.4%'),
    color: theme.colors.textTertiary,
  },
});
