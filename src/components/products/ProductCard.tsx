import { BaseProduct } from "@/types/product";
import Link from "next/link";
import { CldImage } from "next-cloudinary";

interface Props {
	product: BaseProduct;
}

export const ProductCard = ({ product }: Props) => {
	return (
		<Link
    href={`products/${product._id}`}
    key={product.publicId}
    >
    <div
    className="h-full hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-lg rounded-xl overflow-hidden hover:shadow-xl transform"
    >
     	<div className="p-4 flex flex-col items-center h-full">
      	<CldImage
        	alt={product.name}
          src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v1724531867/owltlet/products/${product.publicId}.png`}
          width={200}
          height={200}
          className="w-36 h-36 object-contain mb-5"
          />
          <div className="flex flex-col justify-between items-center flex-1 text-center">
            <div>
              <span
              className="text-2xl font-bold text-black dark:text-dark-text text-center transition-colors duration-300 cursor-pointer">
                {product.name}
              </span>
              <p className="text-md text-blue-600 dark:text-yellow-500 mb-3 text-center">
                {product.category}
              </p>
            </div>
            <div className="mt-6 text-center">
              {product.discountPercentage ? (
                <div className="flex flex-col items-center space-y-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-xl font-bold text-red-500 dark:text-pink-500">
                    ${((product.price * (100 - product.discountPercentage)) / 100).toFixed(2)}
                  </span>
                  <span className="text-sm text-green-500 dark:text-green-400 font-bold bg-green-100 dark:bg-green-800 px-2 py-1 rounded-full shadow-inner">
                    {product.discountPercentage}% off
                  </span>
                </div>) 
                : (
                  <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    ${product.price.toFixed(2)}
                  </span>)}
              </div>
          </div>
        </div>    
      </div>
  	</Link>
	)
}
