import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartSliceReducer from './slices/cartSlice';
import userSliceReducer from './slices/userSlice';

const cartPersistConfig = {
  key: 'cart',
  storage,
};

const userPersistConfig = {
  key: 'user',
  storage,
};

const cartPersistedReducer = persistReducer(cartPersistConfig, cartSliceReducer);
const userPersistedReducer = persistReducer(userPersistConfig, userSliceReducer);

const store = configureStore({
  reducer: {
    cart: cartPersistedReducer,
    user: userPersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
