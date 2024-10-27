'use client';

import { addFavoriteItem, removeFavoriteItem } from "@/store/slices/userSlice";
import { RootState } from "@/store/store";
import { BaseProduct } from "@/types/product";
import { useEffect, useState } from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  product: BaseProduct;
}

export const MarkAsFavorite = ({ product }: Props) => {
  const { favoriteItems } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(favoriteItems.some(it => it._id === product._id));

  useEffect(() => {
    if (verifyIsFavorite()) return setIsFavorite(true);
    setIsFavorite(false);
  }, [favoriteItems]);

  const handleClick = () => {
    if (!product) return;

    if (isFavorite) {
      setIsFavorite(false);
      return dispatch(removeFavoriteItem(product));
    }

    setIsFavorite(true);
    return dispatch(addFavoriteItem(product));
  };

  const verifyIsFavorite = () => favoriteItems.some(it => it._id === product._id);

  return (
    <button
      className="h-12 w-12 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95 focus:outline-none"
      onClick={handleClick}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? (
        <MdFavorite className="w-8 h-8 text-red-500 transition-colors duration-200 hover:text-red-600" />
      ) : (
        <MdFavoriteBorder className="w-8 h-8 text-gray-500 transition-colors duration-200 hover:text-gray-600" />
      )}
    </button>
  );
};
