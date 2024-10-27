'use client';

import { useCart } from "@/hooks/useCart";
import { countCartItems } from "@/utils/countCartItems";
import { useEffect, useState } from "react";

export const CartCounter = () => {
  
  const { items } = useCart();
  const [counter, setCounter] = useState<number>(countCartItems(items));
  
  useEffect(() => {
    const newValue = countCartItems(items);
    setCounter(newValue);
  }, [items])

  return (
    <span className='ml-2 text-sm font-medium text-gray-700 dark:text-dark-text'
    >{counter}
    </span>
  )
}
