import CartController from "@/backend/controllers/CartController";
import dbConnect from "@/backend/db/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  
  if (req.method === 'GET') return await CartController.getCart(req, res);

  if (req.method === 'PUT') return await CartController.updateDatabaseCart(req, res);

  res.status(405).end();
}