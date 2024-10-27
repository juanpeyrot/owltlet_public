import Link from "next/link";
import { BsCartX } from "react-icons/bs";

export const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 py-16">
      <BsCartX className="text-slate-500 w-48 h-48" />
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-dark-title">Your cart is empty</h2>
      <p className="text-gray-500 text-lg">It looks like you haven’t added anything to your cart yet.</p>
      <Link href="/products">
        <button className="bg-blue-600 text-white text-lg font-semibold px-8 py-3 rounded-lg">
          Continue Shopping
        </button>
      </Link>
    </div>
  );
}