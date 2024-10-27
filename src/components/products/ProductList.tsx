import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { ProductCounter } from "./ProductCounter";
import { CartItem } from "@/types/cart";

interface Props {
	items: CartItem[];
}

export const CartProductList = ({items}: Props) => {
  return (
    <ul className="w-full flex flex-col gap-5 items-center max-h-[calc(3*10rem+2*1.25rem)] overflow-custom">
      {items.map((product) => (
        <li
          key={product.id}
          className="w-full flex flex-wrap flex-col sm:flex-row items-center justify-between md:justify-center bg-white dark:bg-dark-cards p-4 shadow rounded-lg"
        >
          <div className="w-full flex flex-wrap flex-col sm:flex-row items-center">
            <div className="w-full h-full flex justify-center items-center flex-wrap">
              <CldImage
                alt={product.name}
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v1724531867/owltlet/products/${product.publicId}.png`}
                width={200}
                height={200}
                className="max-w-28 max-h-40 object-cover rounded-lg"
              />
            </div>
            <div className="w-full h-40 flex flex-col justify-evenly items-center text-center">
              <Link
                href={`/products/${product.id}`}
                className="text-lg font-semibold text-gray-800 dark:text-dark-text text-pretty"
              >
                {product.name}
              </Link>
              <span className="text-lg font-semibold text-gray-800 dark:text-dark-items">
                U$S {(product.price * product.quantity).toFixed(2)}
              </span>
            </div>
          </div>
          <div className="w-full h-full flex justify-center items-center mt-4 sm:mt-0 gap-4">
            <ProductCounter product={product} />
          </div>
        </li>
      ))}
    </ul>
  );
};
