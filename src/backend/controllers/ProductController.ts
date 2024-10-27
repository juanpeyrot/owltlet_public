import { NextApiRequest, NextApiResponse } from "next";
import Product, { IProduct } from "../db/models/Product";
import { APIError, APIResponse } from "@/types/api";
import { BaseProduct } from "@/types/product";
import { mapToBaseProduct, mapToBaseProductCollection } from "@/utils/mappers";
import { ORDER_FILTERS } from "@/types/enums";
import { ObjectId } from "mongodb";

class ProductController {

  async getByFilters(req: NextApiRequest, res: NextApiResponse<APIResponse<BaseProduct[]> | APIError>) {
		try {
			const { categories, order, limit, offset } = req.query;
			const filters: {
				category?: { $in: string[] };
			} = {};
	
			if (categories) {
				let categoryFilter: string[] = [];
	
				if (typeof categories === 'string') {
					categoryFilter = categories.split(',');
				} else if (Array.isArray(categories)) {
					categoryFilter = categories;
				}
	
				if (categoryFilter.length > 0) {
					filters.category = { $in: categoryFilter };
				}
			}
	
			const limitValue = parseInt(limit as string);
			const offsetValue = parseInt(offset as string);
	
			const products = await Product.find(filters)
				.sort({ price: order === ORDER_FILTERS.PRICE_ASC ? 1 : -1 })
				.limit(limitValue)
				.skip(offsetValue);

			res.status(200).json({ message: 'Products successfully fetched', data: products });
		} catch (error) {
			res.status(500).json({ error: 'Error fetching products' });
		}
	}

  async getNewest(req: NextApiRequest, res: NextApiResponse<APIResponse<BaseProduct[]> | APIError>) {
    try {
      const products: IProduct[] = await Product.find({})
        .sort({ _id: -1 })
        .limit(5);

      const parsedProducts = mapToBaseProductCollection(products);
      res.status(200).json({ message: 'Products successfully fetched', data: parsedProducts });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching products' });
    }
  }

 async getById(req: NextApiRequest, res: NextApiResponse<APIResponse<BaseProduct> | APIError>) {
    try {
      const { productId } = req.query;
  
      if (!productId) {
        return res.status(400).json({ error: 'Product ID is required' });
      }
  
      const objectId = new ObjectId(productId as string);
      const product: IProduct | null = await Product.findById(objectId);
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      const parsedProduct = mapToBaseProduct(product);
      res.status(200).json({ message: 'Product successfully fetched', data: parsedProduct });
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ error: 'Error fetching product' });
    }
  }

  async getRelated(req: NextApiRequest, res: NextApiResponse<APIResponse<BaseProduct[]> | APIError>) {
    try {
      const { relatedTo } = req.query;
  
      if (!relatedTo) {
        return res.status(400).json({ error: 'Product ID is required' });
      }
  
      const mainProduct = await Product.findById(relatedTo);
      
      if (!mainProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      const category = mainProduct.category;
  
      let relatedProducts: IProduct[] = await Product.find({
        category: category,
        _id: { $ne: relatedTo }
      }).limit(3);
  
      if (relatedProducts.length < 3) {
        const additionalProducts = await Product.aggregate([
          { $match: { _id: { $ne: relatedTo }, category: { $ne: category } } },
          { $sample: { size: 3 - relatedProducts.length } }
        ]);
        
        relatedProducts = relatedProducts.concat(additionalProducts);
      }
  
      const parsedProducts = mapToBaseProductCollection(relatedProducts);
  
      res.status(200).json({ message: 'Products successfully fetched', data: parsedProducts });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching products' });
    }
  }

}

export default new ProductController();
