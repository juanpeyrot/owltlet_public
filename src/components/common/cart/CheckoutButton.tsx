'use client';

import { createOrder } from "@/services/orderService";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";


export const CheckoutButton = () => {
  
	const [disabled, setDisabled] = useState(false); 
  const [loading, setLoading] = useState(false);
  const { items } = useSelector((state: RootState) => state.cart);
  const { email, isLogged } = useSelector((state: RootState) => state.user)
  const router = useRouter();

  const handleCheckout = async () => {
    setLoading(true);

		if (!isLogged) return router.push('/auth/log-in');

    const productIds = items.map(item => ({ id: item.id, quantity: item.quantity }));
    const total = items.reduce((total, item) => total + (item.price * item.quantity), 0);
		const taxes = 0.05;
    const totalWithTaxes = Number((total + (total * taxes)).toFixed(2));

		setDisabled(true);
    await createOrder(false, productIds, totalWithTaxes, taxes, email)
    .then(res =>  {
      router.push(`/checkout?order=${res.data.orderId}`)
    })
    .catch(err => {
			setDisabled(false);
		})
    .finally(() => setLoading(false));
  }

  return (
    <button
		disabled={disabled}
    className={`${loading || disabled ? 'opacity-50' : ''} w-full bg-red-600 dark:bg-dark-title text-white text-lg font-semibold mt-6 py-3 rounded-lg transition-colors duration-300`}
    onClick={handleCheckout}>
      { loading ? <ClipLoader color="white" /> : 'Checkout' }
    </button>
  )
}
