import { APIError, APIResponse } from "@/types/api";
import { CartItem } from "@/types/cart";
import { NextApiRequest, NextApiResponse } from "next";
import Cart from "../db/models/Cart";


class CartController {
  async updateDatabaseCart(req: NextApiRequest, res: NextApiResponse<APIResponse<CartItem[]> | APIError>){
    try {
      const { email: userEmail, items }: { email: string; items: CartItem[] } = req.body;
      
      let cart = await Cart.findOne({ userEmail});
    
      if (cart)
        cart.items = [...items];
      else 
        cart = new Cart({userEmail, items});
      
      await cart.save();

      res.status(200).json({ data: items, message: "Cart updated successfully" });
    }
    catch(error: any){
      res.status(500).json({ error: 'Error updating cart' });
    }
  }

  async getCart(req: NextApiRequest, res: NextApiResponse<APIResponse<CartItem[]> | APIError>){
    try{
      const { email: userEmail } = req.query as {email: string};
      let cart = await Cart.findOne({userEmail});
      if (!cart)
        throw new Error('Cart not found');

      res.status(200).json({ data: cart, message: "Cart fetched successfully" })
    }
    catch(error: any){
      res.status(500).json({ error: 'Error fetching cart' });
    }
  }
}

export default new CartController();