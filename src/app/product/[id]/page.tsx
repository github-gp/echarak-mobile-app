'use client';

import { use } from 'react';
import { sampleProducts, sellerProfiles } from '@/data/sampleProducts';
import { formatCurrency } from '@/lib/utils';
import { ArrowLeft, Star, MapPin, CheckCircle, Package, Clock, Truck, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params); // Unwrap the Promise using React.use()
  const product = sampleProducts.find(p => p.id === id);
  
  if (!product) {
    return <div>Product not found</div>;
  }

  const seller = sellerProfiles[product.sellerId as keyof typeof sellerProfiles];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Product Details</h1>
        </div>
      </div>

      {/* Product Image */}
      <div className="relative h-64 bg-gradient-to-br from-green-100 to-green-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-8xl">🌿</span>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          {product.certifications.map((cert) => (
            <Badge key={cert} variant="success">{cert}</Badge>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="bg-white p-4 mb-2">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">{product.name}</h2>
        <p className="text-sm text-gray-500 italic mb-3">{product.botanicalName}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
          <Badge variant="success">Grade {product.grade}</Badge>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-3xl font-bold text-brand-primary">
            {formatCurrency(product.price)}
          </span>
          <span className="text-gray-500">/{product.unit}</span>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Package className="w-4 h-4 text-gray-500" />
            <span>Min Order: {product.minOrder} {product.unit}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Available: {product.availability} {product.unit}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-gray-500" />
            <span>Shelf Life: {product.shelfLife}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Truck className="w-4 h-4 text-brand-primary" />
            <span className="font-medium">FarEye Tracking</span>
          </div>
        </div>

        {/* Description */}
        <div className="border-t pt-4">
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>
        </div>
      </div>

      {/* Specifications */}
      <div className="bg-white p-4 mb-2">
        <h3 className="font-semibold mb-3">Specifications</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Active Compounds</span>
            <span className="font-medium">{product.activeCompounds}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Storage Conditions</span>
            <span className="font-medium">{product.storageConditions}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Origin</span>
            <span className="font-medium">{product.location}</span>
          </div>
        </div>
      </div>

      {/* Seller Info */}
      <div className="bg-white p-4">
        <h3 className="font-semibold mb-3">Seller Information</h3>
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
            {seller.name[0]}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold">{seller.name}</h4>
            <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
              <MapPin className="w-4 h-4" />
              <span>{seller.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm mb-2">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {seller.rating}
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-600">{seller.totalOrders} orders</span>
              <span className="text-gray-500">•</span>
              <span className="text-green-600">Responds in {seller.responseTime}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {seller.certifications.map((cert) => (
                <Badge key={cert} variant="secondary" className="text-xs">{cert}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex gap-3">
        <Button variant="outline" className="flex-1">
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </Button>
        <Button variant="primary" className="flex-1">
          Buy Now
        </Button>
      </div>
    </div>
  );
}
