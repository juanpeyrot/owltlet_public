import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import MaxWidthWrapper from "../common/MaxWidthWrapper"
import { MdFavorite } from "react-icons/md"
import { FavoriteItems } from "./FavoriteItems"
import { ShoppingBag } from "lucide-react"
import { MyOrders } from "./MyOrders"

export const ProfileContent = () => {
  return (
    <MaxWidthWrapper>
      <article>
        <Accordion type="single" collapsible>
          <AccordionItem value="orders" className="dark:bg-dark-cards rounded-md">
            <AccordionTrigger>
              <div className="flex items-center gap-5 dark:bg-dark-cards px-5">
                <ShoppingBag className="w-8 h-8 text-black dark:text-dark-items" />
                My Orders
              </div>
            </AccordionTrigger>
            <AccordionContent className="py-0">
              <MyOrders/>
            </AccordionContent>
          </AccordionItem>


          <AccordionItem value="wishlist" className="dark:bg-dark-cards rounded-md">
            <AccordionTrigger>
              <div className="flex items-center gap-5 dark:bg-dark-cards px-5">
                <MdFavorite className="w-8 h-8 text-black dark:text-dark-items" />
                Wishlist
              </div>
            </AccordionTrigger>
            <AccordionContent className="py-0">
              <FavoriteItems/>
            </AccordionContent>
          </AccordionItem>
      </Accordion>
      </article>
    </MaxWidthWrapper>
  )
}
