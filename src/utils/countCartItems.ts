import { CartItem } from "@/types/cart";


export const countCartItems = (items: CartItem[]): number => {
  return items.reduce((acc, item) => acc+= item.quantity,0);
}