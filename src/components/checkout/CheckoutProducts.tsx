import { OrderProduct } from "@/types/product";
import { CldImage } from "next-cloudinary";

interface Props {
  productsInOrder: OrderProduct[];
}

export const CheckoutProducts = ({ productsInOrder }: Props) => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-full w-full pb-10">
      <div className="lg:col-span-2 flex items-center justify-center w-full">
        <div className="flex flex-col w-full">
          <ul className="w-full flex flex-col gap-10 items-center max-h-[calc(3*10rem+2*1.25rem)] overflow-custom">
            {productsInOrder.map(({ product, quantity }) => (
              <li
                key={product._id as string}
                className="w-full flex flex-wrap flex-col sm:flex-row items-center justify-between bg-gray-200 dark:bg-dark-cards p-4 shadow rounded-lg"
              >
                <div className="w-full flex flex-wrap flex-col sm:flex-row items-center">
                  <div className="flex flex-wrap justify-center items-center w-full h-full">
                    <CldImage
                      alt={product.name}
                      src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v1724531867/owltlet/products/${product.publicId}.png`}
                      width={200}
                      height={200}
                      className="max-w-28 max-h-40 object-cover rounded-lg"
                    />
                  </div>
                  <div className="w-full h-40 flex flex-wrap flex-col justify-evenly items-center text-center rounded-lg p-4">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {product.name}
                    </span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-gray-300">
                      Units: {quantity}
                    </span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-yellow-400">
                      Total: U$S{" "}
                      {product.discountPercentage
                        ? (
                            (product.price -
                              product.price *
                                (product.discountPercentage / 100)) *
                            quantity
                          ).toFixed(2)
                        : (product.price * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
