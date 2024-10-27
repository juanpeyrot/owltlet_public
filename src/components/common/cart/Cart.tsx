import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "../../ui/sheet";
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { CartCounter } from "./CartCounter";
import { CartContent } from "./CartContent";


const Cart = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTitle>
        <VisuallyHidden.Root>
          Cart
        </VisuallyHidden.Root>
      </SheetTitle>
      <SheetTrigger className='group -m-2 flex items-center p-2 w-20'>
        <ShoppingCart
          aria-hidden='true'
          className='h-6 w-6 flex-shrink-0 text-gray-400 dark:text-dark-text'
        />
        <CartCounter/>
      </SheetTrigger>
      <SheetContent className="dark:bg-dark-bg">
        <CartContent onClose={() => setOpen(false)} />
      </SheetContent>
      <SheetDescription>
        <VisuallyHidden.Root>
          Customize your order
        </VisuallyHidden.Root>
      </SheetDescription>
    </Sheet>
  )
}

export default Cart;
