/* eslint-disable @typescript-eslint/no-unused-vars */
import RNFS from 'react-native-fs';
import { FolderInfo } from '../types';

export const analyzeStorage = async (): Promise<FolderInfo[]> => {
  const folders: FolderInfo[] = [];

  const analyzeDir = async (
    path: string,
    name: string,
    depth: number = 0,
  ): Promise<FolderInfo> => {
    let totalSize = 0;
    let fileCount = 0;

    if (depth > 5) {
      return { path, name, size: 0, fileCount: 0 };
    }

    try {
      const exists = await RNFS.exists(path);
      if (!exists) {
        return { path, name, size: 0, fileCount: 0 };
      }

      const items = await RNFS.readDir(path);

      for (const item of items) {
        if (item.isFile()) {
          totalSize += item.size;
          fileCount++;
        } else if (item.isDirectory() && !item.name.startsWith('.')) {
          const subFolder = await analyzeDir(item.path, item.name, depth + 1);
          totalSize += subFolder.size;
          fileCount += subFolder.fileCount;
        }
      }
    } catch (err) {
      console.log('Cannot analyze:', path, err);
    }

    return { path, name, size: totalSize, fileCount };
  };

  const mainDirs = [
    { path: RNFS.DownloadDirectoryPath, name: 'Downloads' },
    {
      path: `${RNFS.ExternalStorageDirectoryPath}/DCIM`,
      name: 'Camera/Photos',
    },
    { path: `${RNFS.ExternalStorageDirectoryPath}/Pictures`, name: 'Pictures' },
    { path: `${RNFS.ExternalStorageDirectoryPath}/Movies`, name: 'Videos' },
    { path: `${RNFS.ExternalStorageDirectoryPath}/Music`, name: 'Music' },
    {
      path: `${RNFS.ExternalStorageDirectoryPath}/Documents`,
      name: 'Documents',
    },
  ];

  for (const dir of mainDirs) {
    try {
      const info = await analyzeDir(dir.path, dir.name);
      if (info.size > 0) {
        folders.push(info);
      }
    } catch (err) {
      console.log('Skipping:', dir.name, err);
    }
  }

  return folders.sort((a, b) => b.size - a.size);
};

/**
 * Calculate cache/temporary files size
 * Scans:
 * 1. App's own cache directory
 * 2. Temporary files in accessible locations (Downloads, DCIM thumbnails, etc.)
 * 3. Files with .tmp, .cache, .temp extensions
 *
 * Note: Cannot access other apps' cache due to Android sandboxing
 */
export const getCacheSize = async (): Promise<number> => {
  let totalCacheSize = 0;

  // Helper to calculate directory size recursively
  const calculateDirSize = async (
    path: string,
    depth: number = 0,
    onlyTemp: boolean = false,
  ): Promise<number> => {
    if (depth > 3) return 0; // Limit depth to avoid long scans

    try {
      const exists = await RNFS.exists(path);
      if (!exists) return 0;

      const items = await RNFS.readDir(path);
      let size = 0;

      for (const item of items) {
        if (item.isFile()) {
          // If onlyTemp is true, only count temporary file types
          if (onlyTemp) {
            const isTempFile =
              item.name.endsWith('.tmp') ||
              item.name.endsWith('.temp') ||
              item.name.endsWith('.cache') ||
              item.name.startsWith('.') ||
              item.name.includes('thumbnail') ||
              item.name.includes('cache');

            if (isTempFile) {
              size += item.size;
            }
          } else {
            size += item.size;
          }
        } else if (item.isDirectory()) {
          // Check for common cache/temp directory names
          const isCacheDir =
            item.name.toLowerCase().includes('cache') ||
            item.name.toLowerCase().includes('temp') ||
            item.name.toLowerCase().includes('tmp') ||
            item.name.toLowerCase().includes('.thumbnails');

          if (isCacheDir || !onlyTemp) {
            size += await calculateDirSize(item.path, depth + 1, onlyTemp);
          }
        }
      }
      return size;
    } catch (err) {
      console.log('Error calculating cache size for:', path, err);
      return 0;
    }
  };

  try {
    // 1. App's own cache directory (always safe to access)
    const appCacheSize = await calculateDirSize(RNFS.CachesDirectoryPath);
    totalCacheSize += appCacheSize;

    // 2. Scan accessible directories for temporary files
    const scannablePaths = [
      RNFS.DownloadDirectoryPath,
      `${RNFS.ExternalStorageDirectoryPath}/DCIM/.thumbnails`,
      `${RNFS.ExternalStorageDirectoryPath}/.thumbnails`,
      `${RNFS.ExternalStorageDirectoryPath}/Android/data`,
    ];

    for (const dirPath of scannablePaths) {
      try {
        const exists = await RNFS.exists(dirPath);
        if (exists) {
          const dirCacheSize = await calculateDirSize(dirPath, 0, true);
          totalCacheSize += dirCacheSize;
        }
      } catch (err) {
        // Skip directories we don't have permission to access
        console.log('Skipping cache scan for:', dirPath);
      }
    }

    console.log('Total cache size calculated:', totalCacheSize);
    return totalCacheSize;
  } catch (err) {
    console.error('Cache size calculation failed:', err);
    return 0;
  }
};

/**
 * Clear cache files
 * Clears:
 * 1. App's own cache directory
 * 2. Accessible temporary files in Downloads and DCIM
 *
 * Note: Cannot clear other apps' cache due to Android restrictions
 */
export const clearCache = async (): Promise<boolean> => {
  let filesDeleted = 0;

  const deleteRecursive = async (path: string): Promise<void> => {
    try {
      const exists = await RNFS.exists(path);
      if (!exists) return;

      const items = await RNFS.readDir(path);

      for (const item of items) {
        try {
          if (item.isFile()) {
            await RNFS.unlink(item.path);
            filesDeleted++;
          } else if (item.isDirectory()) {
            await deleteRecursive(item.path);
            // Try to remove empty directory
            try {
              await RNFS.unlink(item.path);
            } catch (e) {
              // Directory not empty or cannot be deleted
            }
          }
        } catch (err) {
          console.log('Could not delete:', item.path);
        }
      }
    } catch (err) {
      console.error('Error during recursive delete:', path, err);
    }
  };

  const deleteTempFiles = async (
    dirPath: string,
    depth: number = 0,
  ): Promise<void> => {
    if (depth > 3) return;

    try {
      const exists = await RNFS.exists(dirPath);
      if (!exists) return;

      const items = await RNFS.readDir(dirPath);

      for (const item of items) {
        try {
          if (item.isFile()) {
            // Delete temporary file types
            const isTempFile =
              item.name.endsWith('.tmp') ||
              item.name.endsWith('.temp') ||
              item.name.endsWith('.cache') ||
              item.name.includes('thumbnail');

            if (isTempFile) {
              await RNFS.unlink(item.path);
              filesDeleted++;
            }
          } else if (item.isDirectory()) {
            // Check for cache directories
            const isCacheDir =
              item.name.toLowerCase().includes('cache') ||
              item.name.toLowerCase().includes('temp') ||
              item.name.toLowerCase().includes('.thumbnails');

            if (isCacheDir) {
              await deleteRecursive(item.path);
            } else {
              await deleteTempFiles(item.path, depth + 1);
            }
          }
        } catch (err) {
          console.log('Could not process:', item.path);
        }
      }
    } catch (err) {
      console.error('Error scanning for temp files:', dirPath, err);
    }
  };

  try {
    // 1. Clear app's own cache
    const appCacheExists = await RNFS.exists(RNFS.CachesDirectoryPath);
    if (appCacheExists) {
      await deleteRecursive(RNFS.CachesDirectoryPath);
      await RNFS.mkdir(RNFS.CachesDirectoryPath); // Recreate the directory
    }

    // 2. Clear accessible temporary files
    const cleanablePaths = [
      RNFS.DownloadDirectoryPath,
      `${RNFS.ExternalStorageDirectoryPath}/DCIM/.thumbnails`,
      `${RNFS.ExternalStorageDirectoryPath}/.thumbnails`,
    ];

    for (const dirPath of cleanablePaths) {
      try {
        await deleteTempFiles(dirPath);
      } catch (err) {
        console.log('Could not clean:', dirPath);
      }
    }

    console.log(`Cache cleared: ${filesDeleted} files deleted`);
    return true;
  } catch (err) {
    console.error('Clear cache error:', err);
    return false;
  }
};
