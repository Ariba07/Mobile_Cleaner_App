// src/components/CustomHeader.tsx
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import { theme } from '../theme/Theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface Props {
  title: string;
  rightAction?: React.ReactNode;
  showBack?: boolean;
}

// SVG Back Arrow Icon
const BackIcon = ({ size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 12H5M5 12L12 19M5 12L12 5"
      stroke={theme.colors.textPrimary}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CustomHeader: React.FC<Props> = ({
  title,
  rightAction,
  showBack = true,
}) => {
  const navigation = useNavigation();

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-10)).current;
  const backButtonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 80,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handlePressIn = () => {
    Animated.spring(backButtonScale, {
      toValue: 0.85,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(backButtonScale, {
      toValue: 1,
      tension: 100,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      {showBack ? (
        <Animated.View style={{ transform: [{ scale: backButtonScale }] }}>
          <TouchableOpacity
            onPress={handleBack}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={styles.backButton}
            activeOpacity={1}
          >
            <BackIcon />
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <View style={styles.placeholder} />
      )}

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      <View style={styles.rightAction}>
        {rightAction || <View style={styles.placeholder} />}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.radius.md,
  },
  title: {
    flex: 1,
    fontSize: hp('2.4%'),
    fontWeight: '700',
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginHorizontal: wp('2%'),
  },
  rightAction: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    width: 40,
  },
});

export default CustomHeader;
