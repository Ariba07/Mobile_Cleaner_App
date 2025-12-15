import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  AppState,
  NativeModules,
  Platform,
  Alert,
  Text,
  Animated,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { homeStyles as styles } from './HomeStyle';
import { theme } from '../../theme/Theme';
import { DashboardCard } from './components/DashboardCard';

const { StoragePermissionModule } = NativeModules;
type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const anims = useRef({
    fade: new Animated.Value(0),
    slide: new Animated.Value(-20),
  }).current;
  const appState = useRef(AppState.currentState);

  const checkPermission = useCallback(async () => {
    if (Platform.OS === 'android') {
      try {
        setHasPermission(
          await StoragePermissionModule.hasManageExternalStoragePermission(),
        );
      } catch (e) {
        console.error(e);
      }
    } else {
      setHasPermission(true);
    }
  }, []);

  useEffect(() => {
    checkPermission();
    Animated.parallel([
      Animated.timing(anims.fade, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(anims.slide, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
    const sub = AppState.addEventListener('change', next => {
      if (appState.current.match(/inactive|background/) && next === 'active')
        checkPermission();
      appState.current = next;
    });
    return () => sub.remove();
  }, [anims.fade, anims.slide, checkPermission]);

  const requestAccess = () => {
    if (Platform.OS === 'android') {
      Alert.alert('Permission Needed', 'Enable "All Files Access"', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Settings',
          onPress:
            StoragePermissionModule.requestManageExternalStoragePermission,
        },
      ]);
    }
  };

  const menu = [
    {
      title: 'Large Files',
      sub: 'Clean heavy media',
      screen: 'LargeFiles',
      color: '#3B82F6',
      bg: '#EFF6FF',
    },
    {
      title: 'Duplicates',
      sub: 'Remove copies',
      screen: 'Duplicates',
      color: '#8B5CF6',
      bg: '#F5F3FF',
    },
    {
      title: 'Cache',
      sub: 'Free up RAM',
      screen: 'CacheCleaner',
      color: '#F59E0B',
      bg: '#FFFBEB',
    },
    {
      title: 'Storage',
      sub: 'Analyze usage',
      screen: 'StorageAnalyzer',
      color: '#10B981',
      bg: '#ECFDF5',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View
          style={[
            styles.headerContainer,
            { opacity: anims.fade, transform: [{ translateY: anims.slide }] },
          ]}
        >
          <Text style={styles.greeting}>Good Morning</Text>
          <Text style={styles.title}>Device Optimizer</Text>
          <Text style={styles.subtitle}>
            Your device storage summary and optimization tools.
          </Text>
        </Animated.View>

        {!hasPermission && (
          <Animated.View
            style={[styles.permissionContainer, { opacity: anims.fade }]}
          >
            <Text style={styles.permissionText}>Storage access required</Text>
            <TouchableOpacity
              onPress={requestAccess}
              style={styles.permissionButton}
            >
              <Text style={styles.permissionButtonText}>Enable</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        <View style={styles.gridContainer}>
          <View style={styles.row}>
            {menu.slice(0, 2).map((item, i) => (
              <DashboardCard
                key={i}
                item={item}
                index={i}
                onPress={() =>
                  hasPermission
                    ? navigation.navigate(item.screen as any)
                    : requestAccess()
                }
              />
            ))}
          </View>
          <View style={styles.row}>
            {menu.slice(2, 4).map((item, i) => (
              <DashboardCard
                key={i}
                item={item}
                index={i + 2}
                onPress={() =>
                  hasPermission
                    ? navigation.navigate(item.screen as any)
                    : requestAccess()
                }
              />
            ))}
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Version 1.0.0 • Secure & Private
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};
export default HomeScreen;
