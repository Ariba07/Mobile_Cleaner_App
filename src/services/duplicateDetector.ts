import RNFS from 'react-native-fs';
import { FileInfo, DuplicateGroup } from '../types';
import { getFileExtension } from '../utils/formatters';

const computeHash = async (path: string): Promise<string> => {
  try {
    const hash = await RNFS.hash(path, 'md5');
    return hash;
  } catch (err) {
    console.error('Hash error:', path, err);
    return '';
  }
};

export const findDuplicates = async (
  onProgress?: (progress: number, file: string) => void,
): Promise<DuplicateGroup[]> => {
  const hashMap = new Map<string, FileInfo[]>();
  const files: FileInfo[] = [];

  const RESTRICTED_PATHS = ['/Android/data', '/Android/obb', '/System'];

  const scanDir = async (path: string, depth: number = 0): Promise<void> => {
    if (depth > 15) return;
    if (RESTRICTED_PATHS.some(restricted => path.includes(restricted))) return;

    try {
      const items = await RNFS.readDir(path);
      for (const item of items) {
        if (item.isFile()) {
          if (item.size > 0) {
            files.push({
              id: item.path,
              name: item.name,
              path: item.path,
              size: item.size,
              type: getFileExtension(item.name),
              modifiedDate: new Date(item.mtime ?? 0).getTime(),
            });
          }
        } else if (item.isDirectory() && !item.name.startsWith('.')) {
          await scanDir(item.path, depth + 1);
        }
      }
    } catch (err) {
      // console.log('Access denied:', path);
      console.log(err);
    }
  };

  const rootPath = RNFS.ExternalStorageDirectoryPath;
  console.log('Starting scan...');
  await scanDir(rootPath);
  console.log(`Found ${files.length} files to check`);

  // --- UPDATED PHASE 2: Group by Size AND Name ---
  const candidateMap = new Map<string, FileInfo[]>();

  files.forEach(file => {
    const key = `${file.size}_${file.name}`;
    if (!candidateMap.has(key)) {
      candidateMap.set(key, []);
    }
    candidateMap.get(key)!.push(file);
  });

  // Filter: Only process files that have at least one "twin"
  let processed = 0;
  const filesToHash = files.filter(f => {
    const key = `${f.size}_${f.name}`;
    const group = candidateMap.get(key) || [];
    return group.length > 1;
  });

  console.log(
    `Hashing ${filesToHash.length} potential duplicates (matched by Name + Size)`,
  );

  // --- PHASE 3: MD5 Verification ---
  for (const file of filesToHash) {
    processed++;
    if (onProgress && processed % 5 === 0) {
      onProgress((processed / filesToHash.length) * 100, file.name);
    }

    const hash = await computeHash(file.path);
    if (hash) {
      if (!hashMap.has(hash)) {
        hashMap.set(hash, []);
      }
      hashMap.get(hash)!.push({ ...file, hash });
    }
  }

  if (onProgress) {
    onProgress(100, 'Complete');
  }

  const duplicates: DuplicateGroup[] = [];
  hashMap.forEach((fileList, hash) => {
    if (fileList.length > 1) {
      duplicates.push({
        hash,
        files: fileList,
        totalSize: fileList.reduce((sum, f) => sum + f.size, 0),
      });
    }
  });

  return duplicates.sort((a, b) => b.totalSize - a.totalSize);
};

// --- ADDED MISSING EXPORT HERE ---
export const deleteFiles = async (paths: string[]): Promise<number> => {
  let deletedCount = 0;
  for (const path of paths) {
    try {
      const exists = await RNFS.exists(path);
      if (exists) {
        await RNFS.unlink(path);
        deletedCount++;
      }
    } catch (error) {
      console.error(`Failed to delete file: ${path}`, error);
    }
  }
  return deletedCount;
};
