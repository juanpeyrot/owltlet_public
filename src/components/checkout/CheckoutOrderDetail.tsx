import { BaseOrder } from "@/types/order";
import MaxWidthWrapper from "../common/MaxWidthWrapper";
import { PayPalButton } from "../paypal/PayPalButton";
import { OrderProduct } from "@/types/product";

interface Props {
  result: BaseOrder;
  productsInOrder: OrderProduct[];
  orderId: string;
  customFunction: () => void;
}

export const CheckoutOrderDetail = ({
  result,
  productsInOrder,
  orderId,
  customFunction,
}: Props) => {
  const orderSubtotal = productsInOrder
    .reduce((acc, item) => {
      return item.product.discountPercentage
        ? acc +
            (item.product.price -
              item.product.price * (item.product.discountPercentage / 100)) *
              item.quantity
        : acc + item.product.price * item.quantity;
    }, 0)
    .toFixed(2);

  return (
      <div className="w-[80%] md:w-full flex flex-wrap flex-col justify-center items-center gap-6 p-8 bg-gradient-to-r from-white to-gray-100 shadow-xl rounded-2xl max-w-lg mx-auto border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
          Order Detail
        </h2>
        <div className="w-full border-t border-gray-300"></div>
        <div className="text-xl text-left w-full">
          <div className="flex justify-between">
            <span className="text-gray-600 font-light">Subtotal:</span>
            <span className="font-light text-slate-500">${orderSubtotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-light">Taxes:</span>
            <span className="font-light text-slate-500">
              ${(result.total * result.tax).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-lg font-normal text-gray-700">Total:</span>
            <span className="text-lg font-normal text-gray-700">
              ${result.total.toFixed(2)}
            </span>
          </div>
        </div>
        <div className="w-full border-t border-gray-300"></div>
        {result && (
          <div className="max-w-3/4 w-full">
						<div className="w-full flex justify-center mt-6">
							<PayPalButton
								orderId={orderId}
								amount={Number(result.total.toFixed(2))}
								customFunction={customFunction}
							/>
          	</div>
					</div>
        )}
      </div>
  );
};
