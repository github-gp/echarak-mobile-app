'use client';

export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { sampleUser } from '@/data/sampleProducts';
import { formatCurrency } from '@/lib/utils';
import { ArrowLeft, MapPin, CreditCard, Truck, CheckCircle } from 'lucide-react';
import Button from '@/components/common/Button';
import { useCart } from '@/lib/cartContext';
import { useState } from 'react';

const paymentMethods = [
  { id: 'upi', name: 'UPI', description: 'Google Pay, PhonePe, Paytm', icon: '📱' },
  { id: 'netbanking', name: 'Net Banking', description: 'All major banks', icon: '🏦' },
  { id: 'card', name: 'Credit/Debit Card', description: 'Visa, Mastercard, RuPay', icon: '💳' },
  { id: 'cod', name: 'Cash on Delivery', description: '30 days terms', icon: '📋' },
];

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cartTotal, clearCart } = useCart();
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [processing, setProcessing] = useState(false);

  const courierName = searchParams.get('courier') || 'Blue Dart Express';
  const shippingCost = parseInt(searchParams.get('cost') || '580');
  const gst = cartTotal * 0.18;
  const total = cartTotal + shippingCost + gst;

  const handlePlaceOrder = async () => {
    setProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    clearCart();
    router.push('/order-confirmation');
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-lg" disabled={processing}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Checkout</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold flex items-center gap-2">
              <MapPin className="w-5 h-5 text-brand-primary" />
              Delivery Address
            </h3>
          </div>
          <div className="text-sm space-y-1">
            <p className="font-medium">{sampleUser.name}</p>
            <p className="text-slate-600">{sampleUser.company}</p>
            <p className="text-slate-600">{sampleUser.address.line1}</p>
            <p className="text-slate-600">{sampleUser.address.city}, {sampleUser.address.state}</p>
            <p className="text-slate-600">Phone: {sampleUser.phone}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
          <h3 className="font-semibold flex items-center gap-2 mb-3">
            <Truck className="w-5 h-5 text-brand-primary" />
            Courier Partner
          </h3>
          <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div>
              <p className="font-semibold text-sm">{courierName}</p>
              <p className="text-xs text-slate-600">FarEye Tracking Enabled</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-brand-primary">{formatCurrency(shippingCost)}</p>
              <p className="text-xs text-slate-500">2-3 days</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
          <h3 className="font-semibold mb-3">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Items Total</span>
              <span className="font-medium">{formatCurrency(cartTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Shipping</span>
              <span className="font-medium">{formatCurrency(shippingCost)}</span>
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

        <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
          <h3 className="font-semibold flex items-center gap-2 mb-3">
            <CreditCard className="w-5 h-5 text-brand-primary" />
            Payment Method
          </h3>
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <label
                key={method.id}
                className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedPayment === method.id
                    ? 'border-brand-primary bg-blue-50'
                    : 'border-slate-200'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={method.id}
                  checked={selectedPayment === method.id}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-2xl">{method.icon}</span>
                <div className="flex-1">
                  <p className="font-medium text-sm">{method.name}</p>
                  <p className="text-xs text-slate-500">{method.description}</p>
                </div>
                {selectedPayment === method.id && (
                  <CheckCircle className="w-5 h-5 text-brand-primary" />
                )}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-slate-600">Total Amount</span>
          <span className="text-xl font-bold text-brand-primary">{formatCurrency(total)}</span>
        </div>
        <Button
          variant="primary"
          className="w-full"
          onClick={handlePlaceOrder}
          disabled={processing}
        >
          {processing ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">⏳</span>
              Processing...
            </span>
          ) : (
            'Place Order & Pay'
          )}
        </Button>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
