'use client';

import { Filters } from "@/components/products/Filters";
import { InfiniteScroll } from "@/components/common/InfiniteScroll";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import { ProductsGrid } from "@/components/products/ProductsGrid";
import { useProductFilters } from "@/hooks/useProductFilters";

const Page = () => {

  const { itemsRemaining, loading, order, setOrder, 
    selectedCategories, setSelectedCategories, quantity,
    products, handleLoadMore } = useProductFilters();

  return (
    <MaxWidthWrapper>
      <section className="w-full flex-col items-center text-center">
          <Filters
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          order={order} 
          setOrder={setOrder} 
          />
        <InfiniteScroll
          hasMore={itemsRemaining}
          loadMore={() => handleLoadMore()}
        >
          <ProductsGrid products={products} loading={loading} quantity={quantity}/>
        </InfiniteScroll>
      </section>
    </MaxWidthWrapper>
  )
}

export default Page;