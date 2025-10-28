"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";

import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  product: any;
}

const ProductCard = ({ product }: ProductCardProps) => {
  // const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    // addToCart(product);
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group bg-card rounded-lg overflow-hidden shadow-sm hover-lift border border-border">
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        <div className="p-4 space-y-3">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              {product.category}
            </p>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mt-1">
              {product.name}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between pt-2">
            <span className="text-xl font-bold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              Add
            </Button>
          </div>
          {!product.inStock && (
            <p className="text-xs text-destructive font-medium">Out of Stock</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
