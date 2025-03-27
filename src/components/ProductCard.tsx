import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  storeName: string;
  onAddToCart: (productId: string) => void;
}

export default function ProductCard({
  id,
  title,
  description,
  price,
  image,
  storeName,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
        <div className="mt-2">
          <span className="text-sm font-medium text-blue-600">{storeName}</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>
          <button
            onClick={() => onAddToCart(id)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}