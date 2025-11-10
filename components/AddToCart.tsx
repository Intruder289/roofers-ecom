"use client";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
export default function CartButton(product: any) {
  const { addToCart } = useCart();
  console.log(product);

  return (
     
      <Button
        size="lg"
        onClick={() => addToCart(product)}
        // disabled={!product.inStock}
        className="w-full gap-2"
      > 
        <ShoppingCart className="h-5 w-5" />
        {/* {product.inStock ? "Add to Cart" : "Out of Stock"} */}
        Add to Cart
      </Button>
    
  );
}
