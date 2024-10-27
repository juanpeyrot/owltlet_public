'use client';

import { useService } from "@/hooks/useService";
import { getRelatedProducts } from "@/services/productService";
import { BaseProduct } from "@/types/product"
import { useEffect, useState } from "react";
import { ImageSlider } from "../ImageSlider";
import { ClipLoader } from "react-spinners";

interface Props {
  relatedTo: BaseProduct;
}

export const RelatedProducts = ({ relatedTo }: Props) => {

  const [productsRelated, setProductsRelated] = useState<BaseProduct[]>([]);
  const { error, loading, result, execute } = useService<BaseProduct[]>(() => getRelatedProducts(relatedTo._id as string));

  useEffect(() => {
    execute();
  },[relatedTo]);

  useEffect(() => {
    if (!result) return;
    setProductsRelated(result);
  }, [result]);

  return (
    <div className="text-center">
      <h3 className="font-bold text-xl text-gray-800 dark:text-dark-text text-pretty mb-5">
        Related Products
      </h3>

      {loading ? (
        <div className="h-full flex justify-center items-center my-10">
          <ClipLoader loading={loading} size={35} color={"#4A90E2"} />
        </div>
      ) : error ? (
        <div className="my-10 text-red-600 dark:text-red-400 text-sm">
          Oops! Something went wrong. Please try again.
        </div>
      ) : (
        <ImageSlider products={productsRelated} />
      )}
    </div>
  );
}