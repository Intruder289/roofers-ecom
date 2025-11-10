"use client";
import  Link  from "next/link";
import Image from "next/image"
import { ShoppingCart, Menu, X, Moon, Sun, CircleUser, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import  MiniCart from "@/components/MiniCart"
import { useTheme } from "@/contexts/ThemeContext";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";


const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { getCartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary">
            <Image 
              src={theme === 'dark' ? '/dark-logo.png' : '/logo.png'} 
              width={120} 
              height={120} 
              alt="logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">

            {/* <Link href="/cart"> */}
            <Link href="#">
              <Button variant="ghost" size="icon" className="relative hover:bg-[#ffb703] hover:text-[#0a0a0a]">
                <MiniCart/>
              </Button>
            </Link>

            {/* account button */}
            <Link href="#">
              <Button variant="ghost" size="icon" className="relative hover:bg-[#ffb703] hover:text-[#0a0a0a]">
                <CircleUser className="h-5 w-5" />
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-[#ffb703] hover:text-[#0a0a0a]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 bg-[#ffb703] text-[#0a0a0a]" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="text-foreground hover:text-primary transition-colors font-medium px-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
