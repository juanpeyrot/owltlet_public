'use client';

import { AppDispatch, RootState } from "@/store/store";
import { CartItem } from "@/types/cart";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, clearCart } from "@/store/slices/cartSlice";
import { debounce } from 'lodash';
import { updateCartInDatabase, UpdateCartPayload } from "@/store/thunks/updateCartInDatabase";
import { useEffect } from "react";


const debouncedUpdateCart = debounce((dispatch, {email, items}: UpdateCartPayload) => {
  dispatch(updateCartInDatabase({email, items}));
}, 3000);

export const useCart = () => {

  const dispatch: AppDispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  const {isLogged, email} = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (isLogged && email){
      debouncedUpdateCart(dispatch, {email, items});
    }
  }, [items])

  const addToCart = (item: CartItem) => {
    dispatch(addItem(item));
  };

  const removeFromCart = (item: CartItem) => {
    dispatch(removeItem(item));
  };

  const clearCartItems = () => {
    dispatch(clearCart());
  };

  return {
    items,
    addToCart,
    removeFromCart,
    clearCartItems,
  };
}