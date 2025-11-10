"use client";
import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/index";


const Shop = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const categories = [
    { id: "all", name: "All Products", slug: "all" },
    { id: "other", name: "other", slug: "other" },

  ];
  const selectedCategory = params?.get("category") || "all";
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

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  const handleCategoryChange = (categorySlug: string) => {
    if (categorySlug === "all") {
      router.push("/shop");
    } else {
      router.push(`/shop?category=${categorySlug}`);
    }
  };

  

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Shop Collection
          </h1>
          <p className="text-gray-600 text-lg">
            Browse our entire collection of premium jewelry
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 animate-fade-in">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-600" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.slug ? "default" : "outline"
                }
                onClick={() => handleCategoryChange(category.slug)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No products found matching your criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
