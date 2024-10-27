import { ICategory } from "@/backend/db/models/Category";
import { IOrder } from "@/backend/db/models/Order";
import { IProduct } from "@/backend/db/models/Product";
import { IUser } from "@/backend/db/models/User";
import { CartItem } from "@/types/cart";
import { BaseCategory } from "@/types/category";
import { BaseOrder } from "@/types/order";
import { BaseProduct } from "@/types/product";
import { StoredUser } from "@/types/user";

export const mapToStoredUser = (user: IUser): StoredUser => {
  return {
    isLogged: true,
    email: user.email,
    password: user.password,
    createdAt: user.createdAt,
    isVerified: user.isVerified,
    favoriteItems: user.favoriteItems,
  };
};

export const mapToBaseProduct = (product: IProduct): BaseProduct => {
  return {
    _id: product._id,
    category: product.category,
    name: product.name,
    price: product.price,
    publicId: product.publicId,
    description: product.description,
    discountPercentage: product.discountPercentage,
  }
}

export const mapToBaseProductCollection = (products: IProduct[]): BaseProduct[] => {
  return products.map(product => ({
    _id: product._id,
    category: product.category,
    name: product.name,
    price: product.price,
    publicId: product.publicId,
    description: product.description,
    discountPercentage: product.discountPercentage,
  }))
}

export const mapToBaseCategoryCollection = (categories: ICategory[]): BaseCategory[] => {
  return categories.map(cat => ({
    _id: cat._id,
    name: cat.name,
    publicId: cat.publicId,
  }))
}

export const mapToCartItem = (p: BaseProduct): CartItem => {
  return {
    id: p._id as string,
    publicId: p.publicId,
    name: p.name,
    price: p.discountPercentage ? (p.price - (p.discountPercentage * p.price / 100 )) : p.price,
    quantity: 1,
  }
}

export const mapToBaseOrder = (order: IOrder): BaseOrder => {
  return {
    isPaid: order.isPaid,
		paidAt: order.paidAt,
    productIds: order.productIds,
    total: order.total,
		tax: order.tax,
    userEmail: order.userEmail,
		orderId: order.orderId,
  }
}