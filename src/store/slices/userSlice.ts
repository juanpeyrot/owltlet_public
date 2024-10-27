import { BaseProduct } from "@/types/product";
import { StoredUser } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: StoredUser = {
  isLogged: false,
  email: '',
  password: '',
  isVerified: false,
  createdAt: new Date(),
  favoriteItems: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<StoredUser>) => {
      const user = action.payload;
      state.isLogged = true;
      state.email = user.email;
      state.password = user.password;
      state.isVerified = user.isVerified;
      state.createdAt = user.createdAt;
      state.favoriteItems = user.favoriteItems;
    },
    logOut: (state) => {
      state.isLogged = initialState.isLogged;
      state.email = initialState.email;
      state.password = initialState.password;
      state.isVerified = initialState.isVerified;
      state.createdAt = initialState.createdAt;
      state.favoriteItems = initialState.favoriteItems;
    },
    addFavoriteItem: (state, action: PayloadAction<BaseProduct>) => {
      const existingItem = state.favoriteItems.find(item => item._id === action.payload._id);
      if (existingItem) return;
      state.favoriteItems.push(action.payload);
    },
    removeFavoriteItem: (state, action: PayloadAction<BaseProduct>) => {
      state.favoriteItems = state.favoriteItems.filter(i => i._id !== action.payload._id);
    }
  }
});

export const { setUser, logOut, addFavoriteItem, removeFavoriteItem } = userSlice.actions;
export default userSlice.reducer;