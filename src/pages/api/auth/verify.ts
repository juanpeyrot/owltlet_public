import UserController from '@/backend/controllers/UserController';
import dbConnect from '@/backend/db/dbConnect';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { token } = req.query;

  if (req.method === 'GET') {
    req.body = { token };
    await UserController.verifyEmailByToken(req, res);
  }
  else {
    res.status(405).end();
  }
}
