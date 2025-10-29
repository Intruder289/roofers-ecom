import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export default async function FeaturedProducts() {
  const featuredProducts = [
    {
      id: "1",
      name: "Classic Roofing Tile 2x 12mm thin peice of aluminium panel",
      price: 12000.99,
      description: "Premium quality roofing tile with exceptional durability",
      image: "/images/product1.jpg",
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

  return (
    <div>
      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Collection
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our curated selection of exquisite pieces, each crafted
              with meticulous attention to detail
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {Array.isArray(featuredProducts) &&
              featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/shop">
              <Button size="lg" className="gap-2 bg-[#023047] text-white cursor-pointer">
                View All Products
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
