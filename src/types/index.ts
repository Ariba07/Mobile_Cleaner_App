export interface FileInfo {
  id: string;
  name: string;
  path: string;
  size: number;
  type: string;
  modifiedDate: number;
  hash?: string;
}

export interface DuplicateGroup {
  hash: string;
  files: FileInfo[];
  totalSize: number;
}

export interface FolderInfo {
  path: string;
  name: string;
  size: number;
  fileCount: number;
}

export interface ScanProgress {
  isScanning: boolean;
  progress: number;
  currentFile: string;
}

export type RootStackParamList = {
  Home: undefined;
  LargeFiles: undefined;
  Duplicates: undefined;
  CacheCleaner: undefined;
  StorageAnalyzer: undefined;
};
