import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearCart } from '@/store/slices/cartSlice';
import { logOut } from '@/store/slices/userSlice';
import { AppDispatch } from '@/store/store';

export const logoutAndClearCart = createAsyncThunk<void, void, { dispatch: AppDispatch }>(
  'user/logoutAndClearCart',
  async (_, { dispatch }) => {
    dispatch(logOut());
    dispatch(clearCart());
  }
);
