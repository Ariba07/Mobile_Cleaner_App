import { NativeModules, Platform } from 'react-native';

const { StoragePermissionModule } = NativeModules;

export const requestStoragePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      // 1. Check if we already have permission
      const hasPermission =
        await StoragePermissionModule.hasManageExternalStoragePermission();

      if (!hasPermission) {
        // 2. If not, open the Settings page
        await StoragePermissionModule.requestManageExternalStoragePermission();
      } else {
        console.log('Already has access to all files!');
      }
    } catch (err) {
      console.error(err);
    }
  }
};
