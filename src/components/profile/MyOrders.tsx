'use client';

import { useService } from "@/hooks/useService";
import { getOrdersByUser } from "@/services/orderService";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Skeleton from '@mui/material/Skeleton';

export const MyOrders = () => {

	const { email } = useSelector((state: RootState) => state.user);
	const { execute, loading, result, error } = useService(() => getOrdersByUser(email));
	const router = useRouter();

	useEffect(() => {
		execute();
	}, [email])


	if (loading) return (
		<div className="w-full flex justify-center">
			<Skeleton height={200} animation="wave" variant="rectangular" className="w-full"/>
		</div>
	);

	if (error) return <div>Error fetching orders, please try again.</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-6 py-3 font-semibold text-gray-700">Payment Date</th>
            <th className="text-left px-6 py-3 font-semibold text-gray-700">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {result?.map((order) => (
            <tr 
						onClick={() => router.push(`/checkout?order=${order.orderId}`)}
						className="border-t hover:bg-slate-300"
						key={order.orderId} 
						>
              <td className="px-6 py-4 text-gray-600">
                {order.paidAt 
                  ? new Date(order.paidAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"
                }
              </td>
              <td className="px-6 py-4 text-gray-600">
                ${order.total.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
