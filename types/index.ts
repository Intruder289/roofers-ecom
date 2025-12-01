export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  inStock?: boolean;
  featured?: boolean;
  category?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  product: Product;
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
  getCartCount: () => number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  pdfUrl?: string;
}