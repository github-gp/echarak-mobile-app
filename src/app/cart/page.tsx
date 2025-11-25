'use client';

import { sampleCart } from '@/data/sampleProducts';
import { formatCurrency } from '@/lib/utils';
import { ArrowLeft, Trash2, Plus, Minus, Truck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import { useState } from 'react';

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState(sampleCart);

  const updateQuantity = (id: string, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 500; // Flat rate
  const gst = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + gst;

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Shopping Cart</h1>
          <span className="ml-auto text-sm text-gray-500">({cartItems.length} items)</span>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Button onClick={() => router.push('/')}>Continue Shopping</Button>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="p-4 space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex gap-3">
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">🌿</span>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
                    <p className="text-xs text-gray-500 mb-2">{item.seller}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-brand-primary">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 p-1 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t">
                  <span className="text-sm text-gray-600">Quantity</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, -5)}
                      className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-semibold min-w-[60px] text-center">
                      {item.quantity} {item.unit}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 5)}
                      className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* FarEye Shipping Info */}
          <div className="mx-4 mb-4 bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start gap-3">
            <Truck className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm text-brand-primary mb-1">FarEye Real-Time Tracking</p>
              <p className="text-xs text-gray-700">Track your shipment live with GPS updates and delivery notifications</p>
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-white p-4 mx-4 rounded-lg shadow-sm mb-4">
            <h3 className="font-semibold mb-3">Price Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">{formatCurrency(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">GST (18%)</span>
                <span className="font-medium">{formatCurrency(gst)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between text-lg">
                <span className="font-bold">Total</span>
                <span className="font-bold text-brand-primary">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">Total Amount</span>
              <span className="text-xl font-bold text-brand-primary">{formatCurrency(total)}</span>
            </div>
            <Button variant="primary" className="w-full" onClick={() => router.push('/checkout')}>
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
