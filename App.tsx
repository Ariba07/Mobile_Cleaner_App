// App.tsx
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { requestStoragePermission } from './src/utils/permissions';
import { RootStackParamList } from './src/types';

// Screens
import HomeScreen from './src/screens/home/HomeScreen';
import LargeFilesScreen from './src/screens/largeFile/LargeFilesScreen';
import DuplicatesScreen from './src/screens/duplicate/DuplicatesScreen';
import CacheCleanerScreen from './src/screens/cache/CacheCleanerScreen';
import StorageAnalyzerScreen from './src/screens/storage/StorageAnalyzerScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  useEffect(() => {
    requestStoragePermission();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false, // Hide native header globally
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: '#F8FAFC' }, // Match theme background
          navigationBarHidden: true,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="LargeFiles" component={LargeFilesScreen} />
        <Stack.Screen name="Duplicates" component={DuplicatesScreen} />
        <Stack.Screen name="CacheCleaner" component={CacheCleanerScreen} />
        <Stack.Screen
          name="StorageAnalyzer"
          component={StorageAnalyzerScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
