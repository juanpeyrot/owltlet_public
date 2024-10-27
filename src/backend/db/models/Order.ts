import { CheckoutProduct } from '@/types/product';
import mongoose, { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
  userEmail: string;
  productIds: CheckoutProduct[];
  isPaid: boolean;
  paidAt?: Date;
  subTotal: number;
  tax: number;
  total: number;
  transactionId: string;
	orderId: string;
}

const CheckoutProductSchema: Schema = new Schema({
  id: { type: String, required: true }, 
  quantity: { type: Number, required: true },
});

const OrderSchema: Schema = new Schema({
  userEmail: {
    type: String,
    required: true,
  },
  productIds: [{
    type: CheckoutProductSchema,
    required: true,
  }],
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date, default: null },
  subTotal: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  total: { type: Number, required: true },
  transactionId: { type: String, default: "" },
	orderId: { type: String, default: "", required: true },
});

const Order = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
