'use client';

import { useCart } from "@/hooks/useCart";
import { CartItem } from "@/types/cart";
import { useEffect, useState } from "react";

interface Props {
  product: CartItem;
}

export const ProductCounter = ({ product }: Props) => {
  const { addToCart, removeFromCart } = useCart();
  const [counter, setCounter] = useState(product.quantity);

  useEffect(() => {
    setCounter(product.quantity);
  }, [product.quantity]);
  
  return (
    <div className="flex items-center rounded-full bg-gray-100 text-black border border-gray-300 shadow-md w-32 h-12 overflow-hidden">
      <button
        className="w-1/3 h-full text-black flex items-center justify-center"
        onClick={() => removeFromCart(product)}
      >
        -
      </button>
      <span className="h-4/5 w-[1px] bg-gray-300"></span>
      <div className="w-1/3 text-center font-semibold text-lg">
        {counter}
      </div>
      <span className="h-4/5 w-[1px] bg-gray-300"></span>
      <button
        className="w-1/3 h-full text-black flex items-center justify-center"
        onClick={() => addToCart(product)}
      >
        +
      </button>
    </div>
  );
};