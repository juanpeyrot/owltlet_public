export interface CartItem {
  id: string;
  publicId: string;
  name: string;
  quantity: number;
  price: number;
}

export type Item = Omit<CartItem, "quantity">; 

export interface CartState {
  items: CartItem[];
}