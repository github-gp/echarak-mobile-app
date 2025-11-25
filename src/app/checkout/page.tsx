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
            <button className="text-sm text-brand-primary font-medium">Change</button>
          </div>
          <div className="text-sm space-y-1">
            <p className="font-medium">{sampleUser.name}</p>
            <p className="text-slate-600">{sampleUser.company}</p>
            <p className="text-slate-600">{sampleUser.address.line1}</p>
            <p className="text-slate-600">{sampleUser.address.line2}</p>
            <p className="text-
