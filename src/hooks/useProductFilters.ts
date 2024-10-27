import { getProductsByFilters } from "@/services/productService";
import { BaseCategory } from "@/types/category";
import { ORDER_FILTERS } from "@/types/enums";
import { BaseProduct } from "@/types/product";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type TProductFilters = {
  selectedCategories: BaseCategory[],
  setSelectedCategories: Dispatch<SetStateAction<BaseCategory[]>>,
  order: ORDER_FILTERS,
  setOrder: Dispatch<SetStateAction<ORDER_FILTERS>>,
  itemsRemaining: boolean,
  loading: boolean,
  products: BaseProduct[],
	quantity: number,
	handleLoadMore: () => Promise<void>;
};

const quantity = 6;

export const useProductFilters = (): TProductFilters => {
  const [selectedCategories, setSelectedCategories] = useState<BaseCategory[]>([]);
  const [order, setOrder] = useState(ORDER_FILTERS.PRICE_ASC);
  const [products, setProducts] = useState<BaseProduct[]>([]);
  const [itemsRemaining, setItemsRemaining] = useState(true);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
		setProducts([]);
    handleLoadMore(0);
  }, [selectedCategories, order]);

  const handleLoadMore = async(offset: number = products.length) => {
    setLoading(true);
    const categoryIds = selectedCategories.map(c => c.name);
    await getProductsByFilters(categoryIds, order, quantity, offset)
      .then(res => {
        setProducts(prev => {
					const newProducts = res.data.filter(product => 
						!prev.some(existingProduct => existingProduct._id === product._id)
					);
					return [...prev, ...newProducts];
				});
        if (res.data.length < quantity) return setItemsRemaining(false);
        setItemsRemaining(true)
      })
      .catch(err => {
        console.error(err)
        setItemsRemaining(false);
      })
      .finally(() => setLoading(false))
  }

  return {
    selectedCategories,
    setSelectedCategories,
    order,
    setOrder,
    itemsRemaining,
    loading,
    products,
		quantity,
    handleLoadMore,
  }
}