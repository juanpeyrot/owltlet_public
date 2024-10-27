import UserController from '@/backend/controllers/UserController';
import dbConnect from '@/backend/db/dbConnect';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return;
  await dbConnect();
  await UserController.logUser(req, res);
}
