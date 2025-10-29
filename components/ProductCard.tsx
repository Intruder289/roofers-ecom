"use client";
import Link from "next/link";
import Image from "next/image";


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
      <div className="w-auto bg-white rounded-lg shadow-md overflow-hidden font-sans">
        {/* Product Image Section */}
        <div className="relative h-48">
          <Image
            src={product.image || '/placeholder.jpg'}
            alt={product.name || 'Product image'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Details Section */}
        <div className="p-4">
          {/* Price */}
          <h2 className="text-sm font-bold text-green-600 mb-2">
            TZS {product.price}
          </h2>

          {/* Title/Description */}
          <p className="text-sm font-semibold text-gray-800 leading-tight mb-4 line-clamp-2">
            {product.name}
          </p>

          {/* Brand New Tag Container (excluding address and logo) */}
          <div className="flex justify-start pb-2">
            {/* Brand New Tag */}
            <span className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded">
              New arrival
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
