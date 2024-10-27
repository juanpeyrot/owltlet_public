'use client';

import { getAllCategories } from "@/services/categoryService";
import { BaseCategory } from "@/types/category";
import { Checkbox } from "@/components/ui/checkbox";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useService } from "@/hooks/useService";
import { ClipLoader } from "react-spinners";


interface Props {
  selectedCategories: BaseCategory[];
  setSelectedCategories: Dispatch<SetStateAction<BaseCategory[]>>;
}

export const CategoryFilters = ({ selectedCategories, setSelectedCategories }: Props) => {
  
  const { result, loading, execute } = useService(() => getAllCategories());

  useEffect(() => {
    execute();
  }, []);

  const onCheckChange = (checked: string | boolean, cat: BaseCategory) => {
    checked 
    ? setSelectedCategories(prev => [...prev, cat])
    : setSelectedCategories(prev => prev.filter(c => c.name !== cat.name));
  }

  return (
    loading 
    ? <ClipLoader loading={loading}/>
    : (
      <div className="max-w-full w-full flex justify-center pt-6">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {
              result?.map(c => (
                <li
                className="flex items-center gap-3"
                key={c.publicId}
                >
                  <Checkbox 
                  onCheckedChange={(checked) => onCheckChange(checked, c)}
                  checked={selectedCategories.some(cat => cat.name === c.name)}
                  />
                  <span>{c.name}</span>
                </li>
              ))
            }
          </ul>
    </div>
    )
  )
}
