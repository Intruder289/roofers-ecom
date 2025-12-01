import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";


export default async function FeaturedProducts() {

  const getProducts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product`)
  const featuredProducts = await getProducts.json()

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
