import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FileInfo, DuplicateGroup, FolderInfo } from '../../types';

interface FilesState {
  largeFiles: FileInfo[];
  duplicates: DuplicateGroup[];
  folders: FolderInfo[];
  selectedFiles: string[];
  cacheSize: number;
}

const initialState: FilesState = {
  largeFiles: [],
  duplicates: [],
  folders: [],
  selectedFiles: [],
  cacheSize: 0,
};

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    setLargeFiles: (state, action: PayloadAction<FileInfo[]>) => {
      state.largeFiles = action.payload;
    },
    setDuplicates: (state, action: PayloadAction<DuplicateGroup[]>) => {
      state.duplicates = action.payload;
    },
    setFolders: (state, action: PayloadAction<FolderInfo[]>) => {
      state.folders = action.payload;
    },
    toggleFileSelection: (state, action: PayloadAction<string>) => {
      const idx = state.selectedFiles.indexOf(action.payload);
      if (idx > -1) {
        state.selectedFiles.splice(idx, 1);
      } else {
        state.selectedFiles.push(action.payload);
      }
    },
    clearSelection: state => {
      state.selectedFiles = [];
    },
    removeFiles: (state, action: PayloadAction<string[]>) => {
      state.largeFiles = state.largeFiles.filter(
        f => !action.payload.includes(f.path),
      );
    },
    setCacheSize: (state, action: PayloadAction<number>) => {
      state.cacheSize = action.payload;
    },
    clearAll: () => initialState,
  },
});

export const {
  setLargeFiles,
  setDuplicates,
  setFolders,
  toggleFileSelection,
  clearSelection,
  removeFiles,
  setCacheSize,
  clearAll,
} = filesSlice.actions;

export default filesSlice.reducer;
