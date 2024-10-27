'use client';

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import Skeleton from '@mui/material/Skeleton';
import { CreateOrderData, CreateOrderActions, OnApproveActions, OnApproveData } from '@paypal/paypal-js'
import { bindTransactionId, checkPaypalPayment } from '@/services/orderService';

interface Props {
	orderId: string;
	amount: number;
	customFunction?: () => void;
}

export const PayPalButton = ({ orderId, amount, customFunction }: Props) => {

	const [{ isPending }] = usePayPalScriptReducer();

	const roundedAmount = (Math.round(amount * 100) / 100);

	if (isPending)
		return (
			<div className='w-full pt-5 flex flex-col gap-2'>
				<Skeleton variant="rounded" height={60} animation="wave"/>
				<Skeleton variant="rounded" height={60} animation="wave"/>
			</div>
		);

	const createOrder = async(data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {

		const transactionId = await actions.order.create({
			intent: 'CAPTURE',
			purchase_units: [
				{
					invoice_id: orderId,
					amount: {
						currency_code: 'USD',
						value: `${roundedAmount}`,
					},
				},
			],
		});

		await bindTransactionId(orderId, transactionId);

    return transactionId;
	}

	const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
		const details = await actions.order?.capture();
		if (!details) return;

		await checkPaypalPayment(details.id ?? '');
		customFunction && customFunction();	
	}

	return (
		<div className='h-full w-full min-w-1/4'>
			<PayPalButtons
			className='relative w-full'
			createOrder={ createOrder }
			onApprove={ onApprove }
			/>
		</div>
	)
}
