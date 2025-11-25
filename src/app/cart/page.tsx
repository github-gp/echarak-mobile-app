'use client';

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

export default function CheckoutPage() {
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
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    clearCart();
    router.push('/order-confirmation');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg" disabled={processing}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Checkout</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Delivery Address */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold flex items-center gap-2">
              <MapPin className="w-5 h-5 text-brand-primary" />
              Delivery Address
            </h3>
            <button className="text-sm text-brand-primary font-medium">Change</button>
          </div>
          <div className="text-sm space-y-1">
            <p className="font-medium">{sampleUser.name}</p>
            <p className="text-gray-600">{sampleUser.company}</p>
            <p className="text-gray-600">{sampleUser.address.line1}</p>
            <p className="text-gray-600">{sampleUser.address.line2}</p>
            <p className="text-gray-600">
              {sampleUser.address.city}, {sampleUser.address.state} - {sampleUser.address.pincode}
            </p>
            <p className="text-gray-600 mt-2">Phone: {sampleUser.phone}</p>
            <p className="text-gray-600">GST: {sampleUser.gstNumber}</p>
          </div>
        </div>

        {/* Selected Courier */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold flex items-center gap-2 mb-3">
            <Truck className="w-5 h-5 text-brand-primary" />
            Courier Partner
          </h3>
          <div className="flex items-center justify-between bg-orange-50 border border-orange-200 rounded-lg p-3">
            <div>
              <p className="font-semibold text-sm capitalize">{courierName}</p>
              <p className="text-xs text-gray-600">FarEye Live Tracking Enabled</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-brand-primary">{formatCurrency(shippingCost)}</p>
              <p className="text-xs text-gray-500">2-3 days</p>
            </div>
          </div>
        </div>

        {/* FarEye Tracking Info */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
          <div className="flex items-start gap-3">
            <Truck className="w-6 h-6 text-brand-primary flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-brand-primary mb-1">Real-Time Tracking Included</h3>
              <p className="text-sm text-gray-700 mb-2">
                Your order will be tracked live using FarEye's advanced logistics platform
              </p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• GPS location updates every 15 minutes</li>
                <li>• SMS & Email delivery notifications</li>
                <li>• Estimated delivery time updates</li>
                <li>• Direct contact with delivery partner</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold mb-3">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Items Total</span>
              <span className="font-medium">{formatCurrency(cartTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping ({courierName})</span>
              <span className="font-medium">{formatCurrency(shippingCost)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">GST (18%)</span>
              <span className="font-medium">{formatCurrency(gst)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between text-lg">
              <span className="font-bold">Total Amount</span>
              <span className="font-bold text-brand-primary">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
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
                    ? 'border-brand-primary bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
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
                  <p className="text-xs text-gray-500">{method.description}</p>
                </div>
                {selectedPayment === method.id && (
                  <CheckCircle className="w-5 h-5 text-brand-primary" />
                )}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-600">Total Amount</span>
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
              Processing Payment...
            </span>
          ) : (
            'Place Order & Pay'
          )}
        </Button>
        <p className="text-xs text-center text-gray-500 mt-2">
          By placing order, you agree to our Terms & Conditions
        </p>
      </div>
    </div>
  );
}

