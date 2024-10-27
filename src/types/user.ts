import { IUser } from "@/backend/db/models/User";

export type StoredUser = Pick<IUser, 'email' | 'password' | 'isVerified' | 'createdAt' | 'favoriteItems'> & {
  isLogged: boolean;
};