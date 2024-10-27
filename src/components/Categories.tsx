'use client';

import { useService } from "@/hooks/useService";
import { getAllCategories } from "@/services/categoryService";
import { CldImage } from "next-cloudinary";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const Categories = () => {
  const { loading, result, execute } = useService(() => getAllCategories());

  useEffect(() => {
    execute();
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      {loading ? (
        <ClipLoader loading={loading}/>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6 w-full max-w-4xl">
          {result?.map(c => (
            <div
            key={c.publicId} 
            className="md:w-30 md:h-60 lg:w-50 lg:h-50 cursor-pointer flex flex-col items-center text-center bg-white dark:bg-slate-300 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <CldImage
                alt={c.name}
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v1724531867/owltlet/categories/${c.publicId}.png`}
                width={200}
                height={200}
                className="md:w-40 md:h-50 object-contain mb-2"
              />
              <span className="text-lg font-medium text-gray-800">{c.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Categories;