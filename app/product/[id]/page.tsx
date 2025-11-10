import { ArrowLeft, ShoppingCart, Package, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

import { PageProps, Product } from "@/types/index";
import CartButton from "@/components/AddToCart";


export default async function ProductDetails({ params }: PageProps) {
  const { id } =await  params;
  console.log('Product ID:', id);
  const products: Product[] = [
    {
      id: "1",
      name: "Classic Roofing Tile 2x 12mm thin peice of aluminium panel",
      price: 12000.99,
      description: "Premium quality roofing tile with exceptional durability",
      image: "/images/product1.jpg",
      category: "other",
      inStock: true,
      featured: true,
    },
    {
      id: "2",
      name: "Modern Slate Roof shinning thingie bla bla bla ",
      price: 29900.99,
      description: "Contemporary slate roofing for modern homes",
      image: "/images/product2.jpg",
    },
    {
      id: "3",
      name: "Metal Roofing Sheet",
      price: 15900.99,
      description: "Durable metal roofing for industrial applications",
      image: "/images/product3.jpg",
    },
    {
      id: "4",
      name: "Solar Roof Tiles",
      price: 39980.99,
      description: "Energy-efficient solar roof tiles",
      image: "/images/product4.jpg",
    },
  ];
  const product = products.find((p) => p.id === id);


  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product not found</h1>
          <Link href="/shop">
            <Button>Return to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link href="/shop" className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Shop
        </Link>

        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">
          {/* Images */}
          <div className="space-y-4 animate-fade-in">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>            
          </div>

          {/* Info */}
          <div className="space-y-6 animate-fade-in">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-green-800">
                TZS {product.price.toFixed(2)}
              </p>
            </div>

            <div className="border-t border-border pt-6">
              <h2 className="font-semibold text-foreground mb-2">Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="border-t border-border pt-6">
              <CartButton product={product} />
            </div>

            {/* Features */}
            <div className="border-t border-border pt-6 space-y-4">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium text-black">Free Shipping</h3>
                  <p className="text-sm text-gray-600">On large oders</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium text-black">Authenticity Guaranteed</h3>
                  <p className="text-sm text-gray-600">Certificate included</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium text-foreground">Luxury Packaging</h3>
                  <p className="text-sm text-gray-600">Premium gift box included</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}









