import { APIError, APIResponse } from "@/types/api";
import { BaseOrder } from "@/types/order";
import { NextApiRequest, NextApiResponse } from "next";
import Order, { IOrder } from "../db/models/Order";
import { mapToBaseOrder } from "@/utils/mappers";
import { verifyPaypalPayment } from "@/utils/verifyPaypalPayment";
import { getPaypalToken } from "@/utils/getPaypalToken";


class OrderController {
  async createOrder(req: NextApiRequest, res: NextApiResponse<APIResponse<BaseOrder> | APIError>){
    try {
			
			const { isPaid, productIds, total, tax, userEmail } = req.body as BaseOrder;
			
			await Order.deleteMany({ userEmail, isPaid: false });
			
			const orderId = crypto.randomUUID();
      
			const newOrder: IOrder = new Order({
        isPaid, 
        productIds,
        total,
				subTotal: (total - (total*tax)).toFixed(2),
				tax,
        userEmail,
				orderId,
      });
      
      const savedOrder = await newOrder.save();
      const parsedOrder = mapToBaseOrder(savedOrder);
      res.status(200).json({ message: 'Order successfully created' , data: parsedOrder });
    } catch (error) {
      res.status(400).json({ error: 'Information provided is incorrect' });
    }
  }

	async getOrderById(req: NextApiRequest, res: NextApiResponse<APIResponse<BaseOrder> | APIError>){
		try {
			const { order: orderId } = req.query;
			const found: IOrder | null = await Order.findOne({ orderId });

			if (!found) {
				return res.status(404).json({ error: 'Order not found' });
			}

			const parsedOrder = mapToBaseOrder(found);
			res.status(200).json({ message: 'Order successfully fetched', data: parsedOrder });
		}
		catch (error){
			res.status(500).json({ error: 'An error occurred while fetching order' });
		}
	}

	async getUserOrders(req: NextApiRequest, res: NextApiResponse<APIResponse<BaseOrder[]> | APIError>){
		try {
			const { user: userEmail } = req.query;
			const ordersFound: IOrder[] | null = await Order.find({ userEmail });

			if (!ordersFound) {
				return res.status(404).json({ error: 'No orders found' });
			}

			const parsedOrders: BaseOrder[] = [];

			ordersFound.forEach(ord => parsedOrders.push(mapToBaseOrder(ord)));

			res.status(200).json({ message: 'Order successfully fetched', data: parsedOrders });
		}
		catch (error){
			res.status(500).json({ error: 'An error occurred while fetching user orders' });
		}
	}

	async addTransactionId(req: NextApiRequest, res: NextApiResponse<APIResponse<BaseOrder> | APIError>){
    try {
			const { orderId, transactionId } = req.body;
      const foundOrder: IOrder | null = await Order.findOne({ orderId });
    
			if (!foundOrder) {
				return res.status(404).json({ error: 'Order not found' });
			}

			foundOrder.transactionId = transactionId;

			await foundOrder.save();
			const parsedOrder = mapToBaseOrder(foundOrder);

    	res.status(200).json({ message: 'Transaction ID added successfully', data: parsedOrder });
    } catch (error) {
      res.status(400).json({ error: 'Information provided is incorrect' });
    }
  }

	async checkTransactionStatus(req: NextApiRequest, res: NextApiResponse<APIResponse<{ ok: boolean }> | APIError>){
		try {
			const authToken = await getPaypalToken();

			if (!authToken) {
				return {
					ok: false,
					message: "No se pudo obtener token de verificación",
				};
			}

			const { transaction } = req.query;
			const transactionId = Array.isArray(transaction) ? transaction[0] : transaction;

			if (!transactionId) return res.status(400).json({ error: "Transaction ID is required" });

			const resp = await verifyPaypalPayment(transactionId, authToken);

			if (!resp) {
				return res.status(500).json({ error: "Error verifying payment" })
			}
			
			const { status, purchase_units } = resp;
			const { invoice_id: orderId } = purchase_units[0];

			if ( status !== 'COMPLETED' ) {
				return res.status(500).json({ error: "Payment is not completed" })
			}

			const foundOrder: IOrder | null = await Order.findOne({ transactionId });
			
			if (!foundOrder) {
				return res.status(404).json({ error: 'Order not found' });
			}
			
			foundOrder.isPaid = true;
			foundOrder.paidAt = new Date();
			await foundOrder.save();

			res.status(200).json({ message: 'Order successfully fetched', data: { ok: true } });
		}
		catch (error){
			res.status(500).json({ error: 'An error occurred while fetching order' });
		}
	}
}

export default new OrderController();