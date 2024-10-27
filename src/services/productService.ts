import { APIResponse } from "@/types/api";
import { ORDER_FILTERS } from "@/types/enums";
import { BaseProduct } from "@/types/product";

export const getProductsByFilters = async (
  categories: string[],
  order: ORDER_FILTERS,
  limit: number,
	offset: number,
): Promise<APIResponse<BaseProduct[]>> => {
  const response = await fetch(`/api/products?categories=${categories.join(',')}&order=${order}&limit=${limit}&offset=${offset}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'x-api-key': process.env.NEXT_PUBLIC_API_KEY ?? '',
		}
	});
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'An error occurred');
  }
  
  return response.json();
};


export const getNewProducts = async(): Promise<APIResponse<BaseProduct[]>> => {
	const url = `/api/products?filter=new`
	console.log(url)
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
			'x-api-key': process.env.NEXT_PUBLIC_API_KEY ?? '',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'An error occurred');
  }

  return response.json();
}

export const getProductById = async(productId: string): Promise<APIResponse<BaseProduct>> => {
  const response = await fetch(`/api/products?productId=${productId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
			'x-api-key': process.env.NEXT_PUBLIC_API_KEY ?? '',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'An error occurred');
  }

  return response.json();
}

export const getRelatedProducts = async(relatedTo: string): Promise<APIResponse<BaseProduct>> => {
  const response = await fetch(`/api/products?relatedTo=${relatedTo}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
			'x-api-key': process.env.NEXT_PUBLIC_API_KEY ?? '',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'An error occurred');
  }

  return response.json();
}