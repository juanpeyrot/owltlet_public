import { APIError, APIResponse, APIResponseNoData } from "@/types/api";
import { StoredUser } from "@/types/user";

export const verifyAccount = async(token: string): Promise<APIResponseNoData> => {
  const response = await fetch(`/api/auth/verify?token=${token}`, {
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

export const createUser = async(email: string, password: string, verificationToken: string): Promise<APIResponse<StoredUser>> => {
    const response = await fetch(`/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
			'x-api-key': process.env.NEXT_PUBLIC_API_KEY ?? '',
    },
    body: JSON.stringify({
      email,
      password,
			verificationToken,
    }),
    });

    if (!response.ok) {
      const errorData: APIError = await response.json();
      throw new Error(errorData.error || 'An error occurred');
    }

    return response.json();
}

export const logInUser = async(email: string, password: string): Promise<APIResponse<StoredUser>> => {
  const response = await fetch(`/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
			'x-api-key': process.env.NEXT_PUBLIC_API_KEY ?? '',
    },
    body: JSON.stringify({
      email,
      password,
    }),
    });

    if (!response.ok) {
      const errorData: APIError = await response.json();
      throw new Error(errorData.error || 'An error occurred');
    }

    return response.json();
}