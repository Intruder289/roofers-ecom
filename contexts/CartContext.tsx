"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem, CartContextType } from "@/types/index";
import { toast } from "@/hooks/use-toast";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("cart", JSON.stringify(cart));
      } catch (error) {
        console.error("Failed to save cart to localStorage:", error);
      }
    }
  }, [cart]);

  const addToCart = (product: Product | { product: Product }) => {
    setCart((currentCart: CartItem[]) => {
      // Extract the actual product if it's nested
      const actualProduct = 'product' in product ? product.product : product;
      
      // Check if the product is already in the cart
      const existingItem = currentCart.find(
        (item) => item.product.id === actualProduct.id
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.product.id === actualProduct.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Add new item to cart with proper structure
      return [
        ...currentCart,
        {
          product: actualProduct,
          quantity: 1,
        },
      ] as CartItem[];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.product.id !== productId)
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
