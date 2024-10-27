'use client';

import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Trash2 } from "lucide-react";
import { removeFavoriteItem } from "@/store/slices/userSlice";

export const FavoriteItems = () => {
  const { favoriteItems } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <tbody>
          {favoriteItems.map(item => (
            <tr key={item._id as string} className="border-t">
              {/* Columna del nombre del artículo */}
              <td className="px-6 py-4 text-gray-600">
                {item.name}
              </td>
              {/* Columna para el botón de eliminar */}
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => dispatch(removeFavoriteItem(item))}
                  className="focus:outline-none"
                >
                  <Trash2 color="red" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
