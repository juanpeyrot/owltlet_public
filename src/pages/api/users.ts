import UserController from "@/backend/controllers/UserController";
import dbConnect from "@/backend/db/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  
  switch (req.method) {  
    case 'POST':
      await UserController.createUser(req, res);
      break;

    default:
      res.status(405).end();
      break;
  }
}