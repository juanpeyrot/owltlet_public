import { createAsyncThunk } from '@reduxjs/toolkit';
import { CartItem } from '@/types/cart';
import { updateDatabaseCart } from '@/services/cartService';

export interface UpdateCartPayload {
  email: string;
  items: CartItem[];
}

export const updateCartInDatabase = createAsyncThunk(
  'cart/updateCartInDatabase',
  async ({email, items}: UpdateCartPayload, thunkAPI) => {
    try {
      await updateDatabaseCart(email, items);
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to update cart in database');
    }
  }
);
