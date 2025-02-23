
import { 
  Sheet, 
  SheetContent,
  SheetHeader, 
  SheetTitle 
} from "@/components/ui/sheet";
import { useContext, useState } from "react";
import { CartContext } from "../contexts/cart";
import CartProductItem from "./cartProductItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/app/helpers/format-currency";
import FinishOrderDialog from "./finishOrderDialog";

const CartSheet = () => {
  const [finishOrderDialogIsOpen, setFinishOrderDialogIsOpen] = useState(false)
  const { isOpen, toggleCart, products, total } = useContext(CartContext)
  return ( 
    <Sheet open={isOpen} onOpenChange={toggleCart}>
    <SheetContent className="w-[80%]">
      <SheetHeader>
        <SheetTitle className="text-left">Sacola</SheetTitle>
      </SheetHeader>
      <div className="flex h-full flex-col py-5">
        <div className="flex-auto">
          {products.map(product => (
          <CartProductItem key={product.id} product={product} />
          ))}
        </div>
        <Card className="mb-6">
          <CardContent>
            <div className="flex justify-between">
              <p className="text-sm font-semibold">Total</p>
              <p className="text-sm font-semibold">{formatCurrency(total)}</p>
            </div>
          </CardContent>
        </Card>
        <Button 
        className="w-full rounded-full"
        onClick={() => setFinishOrderDialogIsOpen(true)}
        >Finalizar pedido</Button>
        <FinishOrderDialog 
          open={finishOrderDialogIsOpen}
          onOpenChange={setFinishOrderDialogIsOpen}
        />
      </div>
    </SheetContent>
  </Sheet>
   );
}
 
export default CartSheet;