import RNFS from 'react-native-fs';
import { FileInfo } from '../types';
import { getFileExtension } from '../utils/formatters';

const SCAN_DIRS = [
  RNFS.ExternalStorageDirectoryPath,
  RNFS.DownloadDirectoryPath,
  RNFS.DocumentDirectoryPath,
];

export const scanLargeFiles = async (
  minSize: number,
  onProgress?: (progress: number, file: string) => void,
): Promise<FileInfo[]> => {
  const largeFiles: FileInfo[] = [];
  let processed = 0;
  const estimated = 1000;

  const scanDir = async (path: string, depth: number = 0): Promise<void> => {
    // Limit recursion depth to avoid performance issues
    if (depth > 5) return;

    try {
      const items = await RNFS.readDir(path);

      for (const item of items) {
        processed++;
        if (onProgress && processed % 10 === 0) {
          onProgress(Math.min((processed / estimated) * 100, 99), item.name);
        }

        if (item.isFile() && item.size >= minSize) {
          largeFiles.push({
            id: item.path,
            name: item.name,
            path: item.path,
            size: item.size,
            type: getFileExtension(item.name),
            modifiedDate: new Date(item.mtime ?? 0).getTime(),
          });
        } else if (item.isDirectory() && !item.name.startsWith('.')) {
          await scanDir(item.path, depth + 1);
        }
      }
    } catch (err) {
      // Skip inaccessible directories
      console.log('Skipping directory:', path);
      console.log('Errors', err);
    }
  };

  for (const dir of SCAN_DIRS) {
    try {
      await scanDir(dir);
    } catch (err) {
      console.log('Cannot access:', dir);
      console.log('Eror:', err);
    }
  }

  if (onProgress) {
    onProgress(100, 'Complete');
  }

  return largeFiles.sort((a, b) => b.size - a.size);
};

export const deleteFiles = async (paths: string[]): Promise<number> => {
  let deleted = 0;

  for (const path of paths) {
    try {
      const exists = await RNFS.exists(path);
      if (exists) {
        await RNFS.unlink(path);
        deleted++;
      }
    } catch (err) {
      console.error('Failed to delete:', path, err);
    }
  }

  return deleted;
};
