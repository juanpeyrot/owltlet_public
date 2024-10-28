import UserController from '@/backend/controllers/UserController';
import dbConnect from '@/backend/db/dbConnect';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    await UserController.verifyEmailByToken(req, res);
  }
  else {
    res.status(405).end();
  }
}
