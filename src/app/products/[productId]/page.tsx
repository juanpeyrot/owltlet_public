'use client';

import { useService } from "@/hooks/useService";
import { getProductById } from "@/services/productService";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { ProductDetail } from "@/components/products/ProductDetail";
import { ProductDetailSkeleton } from "@/components/skeletons/ProductDetailSkeleton";

const Page = () => {
  const { productId } = useParams<{ productId: string }>() || {};

  const {
    result: product,
    loading,
    error,
    execute,
  } = useService(() => getProductById(productId ?? ''));

  useEffect(() => {
    if (productId) {
      execute();
    }
  }, [productId]);

  const renderContent = () => {
    if (loading) {
      return (
        <section className="p-5">
          <ProductDetailSkeleton />
        </section>
      );
    }

    if (error || !product) {
      return (
        <div className="flex justify-center items-center h-screen text-red-500">
          {error || "Invalid product identifier"}
        </div>
      );
    }

    return (
      <>
        <ProductDetail product={product} />
        <article className="flex justify-center items-center mt-10 mb-16">
          <div className="w-48 h-48">
            <RelatedProducts relatedTo={product} />
          </div>
        </article>
      </>
    );
  };

  return (
    <MaxWidthWrapper>
      <section className="p-5">
        {renderContent()}
      </section>
    </MaxWidthWrapper>
  );
};

export default Page;
