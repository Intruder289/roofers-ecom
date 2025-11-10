import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";

export default function MiniCart() {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <>
      <ShoppingCart className="h-5 w-5" />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-[#ffb703] text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
          {cartCount}
        </span>
      )}
    </>
  );
}
