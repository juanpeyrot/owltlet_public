import ProductController from "@/backend/controllers/ProductController";
import dbConnect from "@/backend/db/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  
  if (req.method !== 'GET') return res.status(405).end();

  if (req.query.filter?.toString().toLowerCase() == 'new') return await ProductController.getNewest(req, res);

  if (req.query.productId) return await ProductController.getById(req, res);

  if (req.query.relatedTo) return await ProductController.getRelated(req, res);

  return await ProductController.getByFilters(req, res);
}