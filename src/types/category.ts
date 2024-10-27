import { ICategory } from "@/backend/db/models/Category";

export type BaseCategory = Pick<ICategory, "_id" | "publicId" | "name">;