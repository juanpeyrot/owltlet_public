'use client';

import { useCart } from "@/hooks/useCart";
import { Trash2 } from "lucide-react";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";
import { CartNoContent } from "./CartNoContent";

interface Props {
  onClose: () => void;
}

export const CartContent = ({ onClose }: Props) => {
  
  const { items, removeFromCart } = useCart();
  const router = useRouter();
  
  return (
      <div className="w-full h-full flex flex-col items-center justify-center p-5 z-40">
        {
          items.length === 0 
          ? <CartNoContent />
          : (<>
            <ul className="w-full h-full pt-6 flex flex-col items-center justify-start gap-5 overflow-custom">
            {
              items.map(it => (
                <li key={it.id} className="w-full flex flex-col md:flex-row gap-3 items-center justify-between p-4 bg-gray-200 dark:bg-dark-cards shadow rounded-lg">
                  <div className="w-full h-full flex flex-col justify-evenly items-center">
                      <span
											onClick={() => {
												onClose();
												router.push(`/products/${it.id}`);
											}}
                      className="text-lg font-semibold text-gray-800 dark:text-light-bg text-pretty cursor-pointer">{it.name}</span>
                      <div className="w-20 m-auto">
                        <p className="text-sm text-gray-500 dark:text-dark-items">Quantity: {it.quantity}</p>
                      </div>
                  </div>
                  <div className="w-full h-full flex flex-col items-center justify-between gap-5">
                    <div className="h-full w-16 flex flex-col items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-200">Total: </span>
                        <div className="w-20 m-auto">
                          <span className="text-sm text-gray-500 dark:text-gray-200">${(it.price * it.quantity).toFixed(2)}</span>                          
                        </div>
                    </div>
                    <button onClick={() => removeFromCart(it)}>
                      <Trash2 color="red"/>
                    </button>
                  </div>
                </li>
              ))
            }
            </ul>
            <Button 
            size='lg'
            className='w-full dark:bg-dark-title mt-5'
            onClick={() => {
              onClose();
              router.push('/cart');
            }}>
              View Cart
            </Button>
          </>)
        }
      </div>
  )
}
