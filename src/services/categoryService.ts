import { APIResponse } from "@/types/api";
import { BaseCategory } from "@/types/category";

export const getAllCategories = async(): Promise<APIResponse<BaseCategory[]>> => {
  const response = await fetch(`/api/categories`, {
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