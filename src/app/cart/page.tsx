'use client';

import { useCart } from "@/hooks/useCart";
import { EmptyCart } from "@/components/common/cart/EmptyCart";
import { OrderSummary } from "@/components/common/cart/OrderSummary";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import { CartProductList } from "@/components/products/ProductList";


const Page = () => {
  const { items } = useCart();

  return (
    <section className="flex flex-col items-start">
      <div className="grid grid-cols-1 md:grid-cols-2 p-4 sm:p-8 w-full h-full">
        <div className="max-w-6xl mx-auto w-full">
          
          <div className="flex flex-col md:flex-row justify-center items-center h-full">
            <div className="lg:col-span-2 flex items-center justify-center w-full">
              {items.length === 0 ? (
                <EmptyCart />
              ) : (
              <MaxWidthWrapper>
								<div className="flex flex-col w-full items-center">
                	<CartProductList items={items} />
              	</div>
							</MaxWidthWrapper>
              )}
            </div>

          </div>
        </div>
      {items.length > 0 && <OrderSummary items={items} />}
    </div>
    </section>);
};

export default Page;
