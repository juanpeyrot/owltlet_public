import { NextApiRequest, NextApiResponse } from "next";
import User, { IUser } from "../db/models/User";
import { sendVerificationEmail } from "@/utils/sendVerificationEmail";
import { APIError, APIResponse, APIResponseNoData } from "@/types/api";
import { StoredUser } from "@/types/user";
import { mapToStoredUser } from "@/utils/mappers";

class UserController {
  async verifyEmailByToken(req: NextApiRequest, res: NextApiResponse<APIResponseNoData | APIError>){
    const { token } = req.body;

    try {
      const user: IUser | null = await User.findOne({ verificationToken: token });

      if (!user) {
        return res.status(400).json({ error: 'Invalid or expired token' });
      }

      user.isVerified = true;
      user.verificationToken = null;
      await user.save();

      res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error verifying email' });
    }
  }

  async logUser(req: NextApiRequest, res: NextApiResponse<APIResponse<StoredUser> | APIError>) {
    const { email, password } = req.body;
    try {
      const user: IUser | null = await User.findOne({ email });
      if (!user || user.password !== password) return res.status(404).json({ error: 'Incorrect email or password' });
      
      const parsedUser = mapToStoredUser(user);
      res.status(200).json({ message: 'Logged in successfully' ,data: parsedUser });
    } catch (error) {
      res.status(400).json({ error: 'Information provided is incorrect' });
    }
  }

  async createUser(req: NextApiRequest, res: NextApiResponse<APIResponse<StoredUser> | APIError>) {
    try {
      const { email, password } = req.body;
      const verificationToken = crypto.randomUUID();
      const newUser: IUser = new User({
        email,
        password,
        verificationToken,
      });
      
			try {
				await sendVerificationEmail(email, verificationToken);
			} catch (error) {
				res.status(400).json({ error: 'Verification email could not be sent, please try again' });
			}

      const savedUser = await newUser.save();
      const parsedUser = mapToStoredUser(savedUser);
      
      res.status(201).json({ message: 'User created succesfully', data: parsedUser});
    } catch (error) {
      res.status(400).json({ error: 'Email already registered' });
    }
  }
}

export default new UserController();
