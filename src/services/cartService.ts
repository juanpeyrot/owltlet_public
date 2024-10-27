import { APIError } from "@/types/api";
import { CartItem } from "@/types/cart";


export const updateDatabaseCart = async(email: string, items: CartItem[]) => {
  const response = await fetch(`/api/carts`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
			'x-api-key': process.env.NEXT_PUBLIC_API_KEY ?? '',
    },
    body: JSON.stringify({email, items}),
    });
  
    if (!response.ok) {
      const errorData: APIError = await response.json();
      throw new Error(errorData.error || 'An error occurred');
    }
  
  return response.json();
}

export const getCart = async (email: string) => {
  const response = await fetch(`/api/carts?email=${email}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
			'x-api-key': process.env.NEXT_PUBLIC_API_KEY ?? '',
    }
    });
  
    if (!response.ok) {
      const errorData: APIError = await response.json();
      throw new Error(errorData.error || 'An error occurred');
    }
  
    return response.json();
}