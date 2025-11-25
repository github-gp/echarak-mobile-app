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
  { id: 'netbanking', name: 'Net Banking', description: 'All major banks supported', icon: '🏦' },
  { id: 'card', name: 'Credit/Debit Card', description: 'Visa, Mastercard, RuPay', icon: '💳' },
  { id: 'cod', name: 'Credit on Delivery (B2B)', description: '30 days payment terms', icon: '📋' },
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
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-lg" disabled={processing}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Checkout</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Delivery Address */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold flex items-center gap-2">
              <MapPin className="w-5 h-5 text-brand-primary" />
              Delivery Address
            </h3>
            <button className="text-sm text-brand-primary font-medium">Change</button>
          </div>
          <div className="text-sm space-y-1">
            <p className="font-medium">{sampleUser.name}</p>
            <p className="text-slate-600">{sampleUser.company}</p>
            <p className="text-slate-600">{sampleUser.address.line1}</p>
            <p className="text-slate-600">{sampleUser.address.line2}</p>
            <p className="text-slate-600">
              {sampleUser.address.city}, {sampleUser.address.state} - {sampleUser.address.pincode}
            </p>
            <p className="text-slate-600 mt-2">Phone: {sampleUser.phone}</p>
            <p className="text-slate-600">GST: {sampleUser.gstNumber}</p>
          </div>
        </div>

        {/* Selected Courier */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
          <h3 className="font-semibold flex items-center gap-2 mb-3">
            <Truck className="w-5 h-5 text-brand-primary" />
            Courier Partner
          </h3>
          <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div>
              <p className="font-semibold text-sm capitalize">{courierName}</p>
              <p className="text-xs text-slate-600">FarEye Live Tracking Enabled</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-brand-primary">{formatCurrency(shippingCost)}</p>
              <p className="text-xs text-slate-500">2-3 days</p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
          <h3 className="font-semibold mb-3">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Items Total</span>
              <span className="font-medium">{formatCurrency(cartTotal)}</span>
            </div>
            <div className="
