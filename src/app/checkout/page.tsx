"use client";

import { withAuth } from "@/components/auth/withAuth";
import { CheckoutOrderDetail } from "@/components/checkout/CheckoutOrderDetail";
import { CheckoutProducts } from "@/components/checkout/CheckoutProducts";
import { OrderSuccess } from "@/components/paypal/OrderSuccess";
import { useService } from "@/hooks/useService";
import { getOrderById } from "@/services/orderService";
import { getProductById } from "@/services/productService";
import { BaseOrder } from "@/types/order";
import { OrderProduct } from "@/types/product";
import { Skeleton } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const params = useSearchParams();
  const orderId = params?.get("order");
  const { execute, error, result, loading } = useService(() =>
    getOrderById(orderId ?? "")
  );
  const [order, setOrder] = useState<BaseOrder | null>(null);
  const [productsInOrder, setProductsInOrder] = useState<OrderProduct[]>([]);

  useEffect(() => {
    if (!orderId) return;
    execute();
  }, [orderId]);

  useEffect(() => {
    if (result) {
      setOrder(result);
      fetchProductsInOrder();
    }
  }, [result]);

  const fetchProductsInOrder = async () => {
    const products: Promise<OrderProduct>[] = [];

    result?.productIds.forEach(async (p) =>
      products.push(
        new Promise(async (res, rej) => {
          await getProductById(p.id).then((response) =>
            res({ product: response.data, quantity: p.quantity })
          );
        })
      )
    );

    await Promise.all(products).then((products) =>
      setProductsInOrder(products)
    );
  };

  return (
    <section className="flex flex-col items-start">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 sm:p-8 w-full h-full">
        {loading ? (
          <Skeleton
            height={400}
            animation="wave"
            variant="rectangular"
            className="w-full"
          />
        ) : (
          <div className="w-full">
            {result?.isPaid ? (
              <OrderSuccess date={result.paidAt as Date} />
            ) : (
              result &&
              orderId && (
                <CheckoutOrderDetail
                  customFunction={execute}
                  orderId={orderId}
                  productsInOrder={productsInOrder}
                  result={result}
                />
              )
            )}
          </div>
        )}

        <div className="w-full flex justify-center items-center">
          <div className="w-3/4 flex justify-center">
            {loading ? (
              <Skeleton
                height={300}
                animation="wave"
                variant="rounded"
                className="w-full"
              />
            ) : (
              <CheckoutProducts productsInOrder={productsInOrder} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default withAuth(Page);
