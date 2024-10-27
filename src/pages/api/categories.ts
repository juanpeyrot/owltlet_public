import CategoryController from "@/backend/controllers/CategoryController";
import dbConnect from "@/backend/db/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  
  if (req.method !== 'GET') res.status(405).end();
  
  await CategoryController.getAll(req, res);
}