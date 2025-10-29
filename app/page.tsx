import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/footer";
import FeaturedProducts from "@/components/sections/featuredProducts";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import FAQ from "@/components/sections/faq";

export default function Home() {

  console.log('fgsgj')
  return (
    <div>
      <Navbar />
      {/* Hero Section */}
      <section
        className="relative 
    bg-linear-to-br from-[#2e4892] to-[#1a3068]  
    text-white py-20 md:py-32 overflow-hidden 
    dark:bg-linear-to-br dark:from-[#0A0908] dark:to-black"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 dark:text-white">
              Top brands under one roof
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 dark:text-gray-400">
              Top supplier of top quality roofing materials in Tanzania known
              for quality and durability in the roofing industry
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto gap-2 hover:cursor-pointer"
                >
                  Shop Collection
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent border-primary-foreground dark:text-white dark:border-white text-primary-foreground hover:bg-primary-foreground hover:text-primary hover:cursor-pointer"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <FeaturedProducts/>
      <FAQ/>
      <Footer/>
    </div>
  );
}
