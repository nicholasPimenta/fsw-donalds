"use client"

import Image from "next/image";
import { CartContext, CartProduct } from "../contexts/cart";
import { formatCurrency } from "@/app/helpers/format-currency";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartProductItemProps {
  product: CartProduct
}

const CartProductItem = ({ product }: CartProductItemProps) => {
  const {decreaseProductQuantity, increaseProductQuantity} = useContext(CartContext)
  return ( 
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative w-20 h-20 bg-gray-100">
          <Image src={product.imageUrl} alt={product.name} fill />
        </div>
        <div className="space-y-1">
          <p className="text-xs max-w-[90%] truncate text-ellipsis">{product.name}</p>
          <p className="text-sm font-semibold">{formatCurrency(product.price)}</p>
          <div className="flex items-center gap-1 text-center">
            <Button 
              variant="outline" 
              className="w-8 h-8 rounded-xl" 
              onClick={() => decreaseProductQuantity(product.id)}
            >
              <ChevronLeftIcon />
            </Button>
              <p className="w-8 text-xs">{product.quantity}</p>
            <Button 
            variant="destructive" 
            className="w-8 h-8 rounded-xl"
            onClick={() => increaseProductQuantity(product.id)}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </div>
      <Button variant="outline" className="w-8 h-8 rounded-xl">
        <TrashIcon />
      </Button>
    </div>
  );
}
 
export default CartProductItem;