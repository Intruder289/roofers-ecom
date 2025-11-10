export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  inStock?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export interface PageProps {
  params: {
    id: string;
  };
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  inStock?: boolean;
  featured?: boolean;
  category?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}