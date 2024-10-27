import { BaseProduct } from "@/types/product"
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "../skeletons/ProductCardSkeleton";

interface Props {
  products: BaseProduct[];
  loading: boolean;
	quantity: number;
}

export const ProductsGrid = ({ products, loading, quantity }: Props) => {  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
			{
				products.map((product) => (
					<ProductCard product={product} key={product._id as string} />
				))
			}
      {loading && Array.from({ length: quantity }).map(() => (
        <ProductCardSkeleton key={crypto.randomUUID()} />))
			}
    </div>
  );
};

{/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {loading
        ? Array.from({ length: quantity }).map(() => (
            <ProductCardSkeleton key={crypto.randomUUID()} />
          ))
        : products.map((product) => (
            <ProductCard product={product} key={product._id as string} />
          ))}
    </div> */}