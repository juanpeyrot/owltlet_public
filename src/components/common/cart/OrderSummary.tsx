import { CartItem } from "@/types/cart"
import { CheckoutButton } from "./CheckoutButton";

interface Props {
  items: CartItem[];
}

export const OrderSummary = ({ items }: Props) => {

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity) ,0)
  const taxes = subtotal * 0.05;

  return (
    <div className="flex justify-center items-start w-full mt-10 md:mt-0">
      <div className="bg-white p-6 shadow rounded-lg md:ml-10 w-full">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Order summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between text-slate-500">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>Taxes</span>
            <span>${taxes.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-900 font-bold text-lg">
            <span>Total</span>
            <span>${(subtotal + taxes).toFixed(2)}</span>
          </div>
        </div>
        <CheckoutButton/>
      </div>
    </div>
  )
}
