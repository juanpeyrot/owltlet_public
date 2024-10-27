import { NextApiRequest, NextApiResponse } from "next";
import Category, { ICategory } from "../db/models/Category";
import { APIError, APIResponse } from "@/types/api";
import { BaseCategory } from "@/types/category";
import { mapToBaseCategoryCollection } from "@/utils/mappers";

class CategoryController {

  async getAll(req: NextApiRequest, res: NextApiResponse<APIResponse<BaseCategory[]> | APIError>)  {
    try {
      const categories: ICategory[] = await Category.find({});
      const parsedCategories = mapToBaseCategoryCollection(categories);
      res.status(200).json({ message: "Categories successfully fetched", data: parsedCategories });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching products' });
    }
  }

}

export default new CategoryController();
