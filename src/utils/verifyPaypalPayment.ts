import { PayPalOrderStatusResponse } from "@/types/paypal";

export const verifyPaypalPayment = async (
  paypalTransactionId: string,
  bearerToken: string
): Promise<PayPalOrderStatusResponse | null>  => {

  const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`;
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer ${ bearerToken }`
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const resp = await fetch(paypalOrderUrl, {
      ...requestOptions,
      cache: 'no-store'
    }).then( r => r.json() );
    return resp;
    
  } catch (error) {
    console.error(error);
    return null;
  }

};