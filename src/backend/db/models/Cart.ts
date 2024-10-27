import { CartItem } from '@/types/cart';
import mongoose, { Document, Schema } from 'mongoose';

export interface ICart extends Document {
  userEmail: string;
  items: CartItem[];
}

const ProductsInCartSchema: Schema = new Schema({
  id: {type: String, required: true},
  publicId: {type: String},
  name: {type: String},
  quantity: {type: Number},
  price: {type: Number},
});

const CartSchema: Schema = new Schema({
  userEmail: {
    type: String,
    required: true,
    unique: true
  },
  items: [{
    type: ProductsInCartSchema,
    required: true,
  }],
});

const Cart = mongoose.models.Cart || mongoose.model<ICart>('Cart', CartSchema);

export default Cart;