import { IProduct } from "@/backend/db/models/Product";

export type BaseProduct = Pick<IProduct, '_id' | 'publicId' | 'name' | 'price' | 'category' | 'description' | 'discountPercentage'>;

export type CheckoutProduct = { id: string, quantity: number };

export type OrderProduct = { product: BaseProduct, quantity: number };