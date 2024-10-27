import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ORDER_FILTERS } from "@/types/enums";
import { Dispatch, SetStateAction } from "react";

interface Props {
  order: ORDER_FILTERS;
  setOrder: Dispatch<SetStateAction<ORDER_FILTERS>>;
}

export const SortByFilters = ({ order, setOrder }: Props) => {
  return (
    <div className="max-w-full w-full flex justify-center items-center pt-6">
      <RadioGroup defaultValue={order} onValueChange={(value) => setOrder(value as ORDER_FILTERS)}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={ORDER_FILTERS.PRICE_ASC} id={ORDER_FILTERS.PRICE_ASC}/>
          <Label htmlFor={ORDER_FILTERS.PRICE_ASC}>Ascending</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={ORDER_FILTERS.PRICE_DESC} id={ORDER_FILTERS.PRICE_DESC} />
          <Label htmlFor={ORDER_FILTERS.PRICE_DESC}>Descending</Label>
        </div>
      </RadioGroup>
    </div>
  )
}
