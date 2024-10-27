import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { CategoryFilters } from "./CategoryFilters";
import { SortByFilters } from "./SortByFilters";
import { Dispatch, SetStateAction } from "react";
import { BaseCategory } from "@/types/category";
import { ORDER_FILTERS } from "@/types/enums";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  selectedCategories: BaseCategory[];
  setSelectedCategories: Dispatch<SetStateAction<BaseCategory[]>>;
  order: ORDER_FILTERS;
  setOrder: Dispatch<SetStateAction<ORDER_FILTERS>>;
}

export const Filters = ({ selectedCategories, setSelectedCategories, order, setOrder }: Props) => {
  return (
    <Sheet>
      <SheetTitle>
        <VisuallyHidden.Root>
          Filters
        </VisuallyHidden.Root>
      </SheetTitle>
      <div className="w-full justify-center items-center">
        <div className="w-full flex justify-center items-center">
          <SheetTrigger className='group flex justify-center gap-3 items-center w-32 h-10 bg-black text-white rounded-lg my-5'>
            <SlidersHorizontal />{' '} Filters
          </SheetTrigger>
        </div>
      </div>
      <SheetContent className="dark:bg-dark-bg">
        <div className="flex flex-col justify-center items-center">
          <span className="text-lg font-extrabold">Find what you need</span>
          <CategoryFilters 
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories} 
          />
          <Button
          className="mt-6"
          onClick={() => setSelectedCategories([])}
          >Clear all
          </Button>
          <SortByFilters 
          order={order}
          setOrder={setOrder}
          />
        </div>
      </SheetContent>
      <SheetDescription>
        <VisuallyHidden.Root>
          Apply filters
        </VisuallyHidden.Root>
      </SheetDescription>
    </Sheet>
  )
}
