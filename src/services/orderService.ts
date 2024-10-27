import { APIError, APIResponse } from "@/types/api";
import { BaseOrder } from "@/types/order";
import { CheckoutProduct } from "@/types/product";


export const createOrder = async(isPaid: boolean, productIds: CheckoutProduct[], total: number, tax: number, userEmail: string): Promise<APIResponse<BaseOrder>> => {
  const response = await fetch(`/api/orders`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
		'x-api-key': process.env.NEXT_PUBLIC_API_KEY ?? '',
  },
  body: JSON.stringify({isPaid, productIds, total, tax, userEmail}),
  });

  if (!response.ok) {
    const errorData: APIError = await response.json();
    throw new Error(errorData.error || 'An error occurred');
  }

  return response.json();
}

export const getOrderById = async(orderId: string): Promise<APIResponse<BaseOrder>> => {
  const response = await fetch(`/api/orders?order=${orderId}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
		'x-api-key': process.env.NEXT_PUBLIC_API_KEY ?? '',
  },
	});

  if (!response.ok) {
    const errorData: APIError = await response.json();
    throw new Error(errorData.error || 'An error occurred');
  }

  return response.json();
}

export const getOrdersByUser = async(userEmail: string): Promise<APIResponse<BaseOrder[]>> => {
  const response = await fetch(`/api/orders?user=${userEmail}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
		'x-api-key': process.env.NEXT_PUBLIC_API_KEY ?? '',
  },
	});

  if (!response.ok) {
    const errorData: APIError = await response.json();
    throw new Error(errorData.error || 'An error occurred');
  }

  return response.json();
}

export const bindTransactionId = async(orderId: string, transactionId: string): Promise<APIResponse<BaseOrder>> => {
  const response = await fetch(`/api/orders`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
		'x-api-key': process.env.NEXT_PUBLIC_API_KEY ?? '',
  },
  body: JSON.stringify({orderId, transactionId}),
  });

  if (!response.ok) {
    const errorData: APIError = await response.json();
    throw new Error(errorData.error || 'An error occurred');
  }

  return response.json();
}

export const checkPaypalPayment = async (transactionId: string): Promise<APIResponse<{ ok: boolean }>> => {
	const response = await fetch(`/api/orders?transaction=${transactionId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'x-api-key': process.env.NEXT_PUBLIC_API_KEY ?? '',
		},
	});
	
	if (!response.ok) {
		const errorData: APIError = await response.json();
		throw new Error(errorData.error || 'An error occurred');
	}
	
	return response.json();
}