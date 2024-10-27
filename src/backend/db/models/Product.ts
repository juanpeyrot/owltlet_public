import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  publicId: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  discountPercentage?: number | null;
}

const ProductSchema: Schema = new Schema({
  publicId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  discountPercentage: {
    type: Number,
    default: null
  }
});


const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
