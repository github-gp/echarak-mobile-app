'use client';

export const dynamic = 'force-dynamic';

import { formatCurrency } from '@/lib/utils';
import { ArrowLeft, Trash2, Plus, Minus, Truck, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import { useCart } from '@/lib/cartContext';

export default function CartPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

  const shipping = cart.length > 0 ? 500 : 0;
  const gst = cartTotal * 0.18;
  const total = cartTotal + shipping + gst;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="sticky top-0 z-50 bg-white shadow-sm">
          <div className="flex items-center gap-4 p-4">
            <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-lg">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold">Shopping Cart</h1>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center h-96">
          <ShoppingBag className="w-24 h-24 text-slate-300 mb-4" />
          <p className="text-slate-500 mb-2 text-lg">Your cart is empty</p>
          <p className="text-sm text-slate-400 mb-4">Add some medicinal plants to get started</p>
          <Button onClick={() => router.push('/')}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Shopping Cart</h1>
          <span className="ml-auto text-sm text-slate-500">({cart.length} items)</span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {cart.map((item) => (
          <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex gap-3 mb-3">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">🌿</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm mb-1 truncate">{item.name}</h3>
                <p className="text-xs text-slate-500 mb-2">{item.seller}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-brand-primary">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t">
              <span className="text-sm text-slate-600 font-medium">Quantity</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 5)}
                  className="w-8 h-8 border-2 border-brand-primary rounded-lg flex items-center justify-center hover:bg-blue-50 transition-colors"
                >
                  <Minus className="w-4 h-4 text-brand-primary" />
                </button>
                <span className="font-semibold min-w-[70px] text-center">
                  {item.quantity} {item.unit}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 5)}
                  className="w-8 h-8 border-2 border-brand-primary rounded-lg flex items-center justify-center hover:bg-blue-50 transition-colors"
                >
                  <Plus className="w-4 h-4 text-brand-primary" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-4 mb-4 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <Truck className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-sm text-brand-primary mb-1">FarEye Real-Time Tracking</p>
          <p className="text-xs text-slate-700">Track your shipment live with GPS updates and delivery notifications</p>
        </div>
      </div>

      <div className="bg-white p-4 mx-4 rounded-lg shadow-sm mb-4">
        <h3 className="font-semibold mb-3">Price Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-600">Subtotal</span>
            <span className="font-medium">{formatCurrency(cartTotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Shipping</span>
            <span className="font-medium">{formatCurrency(shipping)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">GST (18%)</span>
            <span className="font-medium">{formatCurrency(gst)}</span>
          </div>
          <div className="border-t pt-2 flex justify-between text-lg">
            <span className="font-bold">Total</span>
            <span className="font-bold text-brand-primary">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-slate-600">Total Amount</span>
          <span className="text-xl font-bold text-brand-primary">{formatCurrency(total)}</span>
        </div>
        <Button variant="primary" className="w-full" onClick={() => router.push('/select-courier')}>
          Proceed to Courier Selection
        </Button>
      </div>
    </div>
  );
}
