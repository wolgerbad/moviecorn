import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import favoritesSlice from './favoritesSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedFavorites = persistReducer(persistConfig, favoritesSlice);

export const store = configureStore({
  reducer: { favorites: persistedFavorites },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
