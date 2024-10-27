import { BaseProduct } from "@/types/product";
import { CldImage } from "next-cloudinary";
import React from "react";
import { MarkAsFavorite } from "./MarkAsFavorite";
import AddToCartButton from "../common/cart/AddToCartButton";
import { mapToCartItem } from "@/utils/mappers";

interface Props {
	product: BaseProduct;
}

export const ProductDetail = ({ product }: Props) => {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex justify-center items-center flex-shrink-0 rounded-lg">
        <CldImage
          alt={product.name}
          src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v1724531867/owltlet/products/${product.publicId}.png`}
          width={200}
          height={200}
          className="w-[70%] h-auto object-cover rounded-lg transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <h2 className="text-4xl font-bold text-gray-800 dark:text-dark-items">
            {product.name}
          </h2>
          <MarkAsFavorite product={product} />
          <p className="text-md text-slate-400 py-5 font-semibold">
            <span>{product.category}</span> |{" "}
            <span className="text-green-500">in Stock ✔</span>
          </p>

          <div>
            {product.discountPercentage ? (
              <div className="flex flex-col space-y-2">
                <span className="text-xl text-green-500 dark:text-green-400 font-bold px-2 py-1">
                  {product.discountPercentage}% off
                </span>
                <div className="flex flex-row items-center gap-5">
                  <span className="text-sm text-gray-600 dark:text-gray-300 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-xl font-bold text-red-500 dark:text-pink-500">
                    $
                    {(
                      (product.price * (100 - product.discountPercentage)) /
                      100
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            ) : (
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex flex-col py-5">
            <span className="text-xl font-bold">Description</span>
            <p className="text-md text-gray-700 dark:text-slate-400 mt-4 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
        <div className="mt-6 flex justify-center w-full">
          <AddToCartButton product={mapToCartItem(product)} />
        </div>
      </div>
    </div>
  );
};
