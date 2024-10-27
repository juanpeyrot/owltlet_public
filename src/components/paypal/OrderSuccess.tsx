import { CheckCircleIcon } from "lucide-react";
import './styles/order-success.css';
import Link from "next/link";

interface Props {
  date: string | Date;
}

export const OrderSuccess = ({ date }: Props) => {
  const transactionDate = new Date(date);

  const formattedDate = transactionDate.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedTime = transactionDate.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-5 mt-5 max-w-md w-full animate-scale-in">
      <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
        <CheckCircleIcon className="w-10 h-10 text-green-500" />
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Order Confirmed</h2>
      <p className="text-gray-600 text-center mb-8">
        Thank you for your purchase!
      </p>
      <p className="text-gray-600 text-center mb-8">
        Transaction completed on {formattedDate} at {formattedTime}
      </p>
      <Link href={'/profile'} className="w-full">
        <button className="w-full bg-green-600 text-white py-3 rounded-md font-medium hover:bg-green-500 transition-all duration-300">
          View Orders
        </button>
      </Link>
    </div>
  );
};
