'use client';

import { use, useState } from 'react';
import { sampleProducts, sellerProfiles } from '@/data/sampleProducts';
import { formatCurrency } from '@/lib/utils';
import { ArrowLeft, Star, MapPin, CheckCircle, Package, Clock, Truck, ShoppingCart, Plus, Minus, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';
import { useCart } from '@/lib/cartContext';
import { useWishlist } from '@/lib/wishlistContext';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const product = sampleProducts.find(p => p.id === id);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(10);
  const [addedToCart, setAddedToCart] = useState(false);
  
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-700 mb-4">Product not found</p>
          <Button onClick={() => router.push('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const seller = sellerProfiles[product.sellerId as keyof typeof sellerProfiles];
  const inWishlist = isInWishlist(id);

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(id);
    } else {
      addToWishlist({
        productId: id,
        name: product.name,
        price: product.price,
        seller: product.seller,
        rating: product.rating,
      });
    }
  };

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      unit: product.unit,
      seller: product.seller,
      sellerId: product.sellerId,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => router.push('/cart'), 300);
  };

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
        
        {/* Wishlist Button - Top Right */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={handleWishlistToggle}
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
              inWishlist ? 'bg-red-500' : 'bg-white'
            }`}
          >
            <Heart className={`w-6 h-6 ${inWishlist ? 'fill-white text-white' : 'text-gray-700'}`} />
          </button>
        </div>

        {/* Certifications - Top Left */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
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
      <div className="bg-white p-4 mb-2">
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

      {/* Quantity Selection */}
      <div className="bg-white p-4 mb-20">
        <h3 className="font-semibold mb-3">Select Quantity</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 flex-1">
            <button
              onClick={() => setQuantity(Math.max(product.minOrder, quantity - 5))}
              className="w-10 h-10 border-2 border-brand-primary rounded-lg flex items-center justify-center hover:bg-orange-50 transition-colors"
            >
              <Minus className="w-5 h-5 text-brand-primary" />
            </button>
            <div className="flex-1 text-center">
              <p className="text-2xl font-bold">{quantity}</p>
              <p className="text-sm text-gray-500">{product.unit}</p>
            </div>
            <button
              onClick={() => setQuantity(Math.min(product.availability, quantity + 5))}
              className="w-10 h-10 border-2 border-brand-primary rounded-lg flex items-center justify-center hover:bg-orange-50 transition-colors"
            >
              <Plus className="w-5 h-5 text-brand-primary" />
            </button>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Total</p>
            <p className="text-xl font-bold text-brand-primary">
              {formatCurrency(product.price * quantity)}
            </p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Min order: {product.minOrder} {product.unit} • Available: {product.availability} {product.unit}
        </p>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex gap-3 shadow-lg">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={handleAddToCart}
          disabled={addedToCart}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          {addedToCart ? '✓ Added!' : 'Add to Cart'}
        </Button>
        <Button 
          variant="primary" 
          className="flex-1"
          onClick={handleBuyNow}
        >
          Buy Now
        </Button>
      </div>
    </div>
  );
}
