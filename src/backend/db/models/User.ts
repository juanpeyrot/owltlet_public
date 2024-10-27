import mongoose, { Document, Schema } from 'mongoose';
import { BaseProduct } from '@/types/product';

export interface IUser extends Document {
  email: string;
  password: string;
  isVerified: boolean;
  verificationToken: string | null;
  createdAt: Date;
  favoriteItems: BaseProduct[];
}

const ItemSchema: Schema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const CartItemSchema: Schema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  favoriteItems: {
    type: [ItemSchema],
    default: [],
  },
  cartItems: {
    type: [CartItemSchema],
    default: [],
  }
});

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
