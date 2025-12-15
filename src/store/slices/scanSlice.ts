import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScanProgress } from '../../types';

interface ScanState extends ScanProgress {
  error: string | null;
}

const initialState: ScanState = {
  isScanning: false,
  progress: 0,
  currentFile: '',
  error: null,
};

const scanSlice = createSlice({
  name: 'scan',
  initialState,
  reducers: {
    startScan: state => {
      state.isScanning = true;
      state.progress = 0;
      state.error = null;
    },
    updateProgress: (
      state,
      action: PayloadAction<{ progress: number; file: string }>,
    ) => {
      state.progress = action.payload.progress;
      state.currentFile = action.payload.file;
    },
    completeScan: state => {
      state.isScanning = false;
      state.progress = 100;
      state.currentFile = '';
    },
    setScanError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isScanning = false;
    },
  },
});

export const { startScan, updateProgress, completeScan, setScanError } =
  scanSlice.actions;
export default scanSlice.reducer;
