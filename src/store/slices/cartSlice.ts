import { CartItem, CartState } from '@/types/cart';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
      } else {
        state.items = state.items.filter(i => i.id !== action.payload.id);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    updateCart: (state, action: PayloadAction<CartState>) => {
      state.items = [...action.payload.items];
    }
  },
});

export const { addItem, removeItem, clearCart, updateCart } = cartSlice.actions;
export default cartSlice.reducer;