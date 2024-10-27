import OrderController from "@/backend/controllers/OrderController";
import dbConnect from "@/backend/db/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  
	if (req.method === 'GET'){
		if (req.query && req.query.order) return OrderController.getOrderById(req, res);
		if (req.query && req.query.transaction) return OrderController.checkTransactionStatus(req, res);
	}

	if (req.method === 'PUT'){
		if (req.query && req.query.user) return OrderController.getUserOrders(req, res);
		return OrderController.addTransactionId(req, res);
	}

  if (req.method === 'POST') return OrderController.createOrder(req, res);
		  
  res.status(405).end()
}