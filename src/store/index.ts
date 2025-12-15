import { configureStore } from '@reduxjs/toolkit';
import filesReducer from './slices/filesSlice';
import scanReducer from './slices/scanSlice';

export const store = configureStore({
  reducer: {
    files: filesReducer,
    scan: scanReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
