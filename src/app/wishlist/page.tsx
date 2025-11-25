'use client';

import { ArrowLeft, Heart, ShoppingCart, Trash2, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useWishlist } from '@/lib/wishlistContext';
import { useCart } from '@/lib/cartContext';
import { formatCurrency } from '@/lib/utils';
import Button from '@/components/common/Button';
import { useState } from 'react';

export default function WishlistPage() {
  const router = useRouter();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  const handleAddToCart = (item: any) => {
    addToCart({
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: 10, // Default quantity
      unit: 'kg',
      seller: item.seller,
      sellerId: 'seller-001',
    });
    setAddedItems(prev => new Set(prev).add(item.productId));
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(item.productId);
        return newSet;
      });
    }, 2000);
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="sticky top-0 z-50 bg-white shadow-sm">
          <div className="flex items-center gap-4 p-4">
            <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold">My Wishlist</h1>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center h-96">
          <Heart className="w-24 h-24 text-gray-300 mb-4" />
          <p className="text-gray-500 mb-2 text-lg">Your wishlist is empty</p>
          <p className="text-sm text-gray-400 mb-4">Save your favorite products here</p>
          <Button onClick={() => router.push('/')}>Browse Products</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">My Wishlist</h1>
          <span className="ml-auto text-sm text-gray-500">({wishlist.length} items)</span>
        </div>
      </div>

      {/* Wishlist Items */}
      <div className="p-4 space-y-3">
        {wishlist.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <div className="flex gap-3 mb-3">
                {/* Product Image */}
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">🌿</span>
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm mb-1 truncate">{item.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{item.seller}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">{item.rating}</span>
                    </div>
                    <span className="text-lg font-bold text-brand-primary">
                      {formatCurrency(item.price)}
                      <span className="text-xs text-gray-500">/kg</span>
                    </span>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromWishlist(item.productId)}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors h-fit"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => router.push(`/product/${item.productId}`)}
                >
                  View Details
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleAddToCart(item)}
                  disabled={addedItems.has(item.productId)}
                >
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  {addedItems.has(item.productId) ? '✓ Added' : 'Add to Cart'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

