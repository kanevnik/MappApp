import {configureStore} from '@reduxjs/toolkit';

import mapReducer from '../slices/mapSlice';

const store = configureStore({
  reducer: {
    map: mapReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: {warnAfter: 128},
      serializableCheck: {warnAfter: 128},
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
