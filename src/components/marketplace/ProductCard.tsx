import { formatCurrency } from '@/lib/utils';
import { MapPin, Star, CheckCircle } from 'lucide-react';
import Badge from '../common/Badge';
import Link from 'next/link';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    botanicalName: string;
    price: number;
    unit: string;
    seller: string;
    location: string;
    grade: string;
    certifications: string[];
    inStock: boolean;
    rating: number;
    reviews: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden active:scale-95 transition-transform cursor-pointer border border-slate-200 hover:border-brand-primary hover:shadow-lg">
        {/* Product Image */}
        <div className="relative h-40 bg-gradient-to-br from-emerald-50 to-emerald-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl">🌿</span>
          </div>
          {product.inStock && (
            <Badge variant="success" className="absolute top-2 right-2">
              In Stock
            </Badge>
          )}
          {product.certifications.includes('Organic') && (
            <Badge variant="primary" className="absolute top-2 left-2">
              Organic
            </Badge>
          )}
        </div>

        {/* Product Info */}
        <div className="p-3">
          <h3 className="font-semibold text-slate-900 text-sm mb-1 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-slate-500 italic mb-2">{product.botanicalName}</p>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium text-slate-900">{product.rating}</span>
            <span className="text-xs text-slate-500">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-lg font-bold text-brand-primary">
              {formatCurrency(product.price)}
            </span>
            <span className="text-xs text-slate-500">/{product.unit}</span>
          </div>

          {/* Seller Info */}
          <div className="flex items-center gap-1 text-xs text-slate-600 mb-2">
            <MapPin className="w-3 h-3" />
            <span className="line-clamp-1">{product.seller}</span>
          </div>

          {/* Certifications */}
          <div className="flex flex-wrap gap-1">
            {product.certifications.map((cert) => (
              <div key={cert} className="flex items-center gap-1 text-xs text-emerald-700">
                <CheckCircle className="w-3 h-3" />
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
