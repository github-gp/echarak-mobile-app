'use client';

import { useRouter } from 'next/navigation';
import { CheckCircle, Package, Truck, MapPin } from 'lucide-react';
import Button from '@/components/common/Button';
import { useEffect, useState } from 'react';

export default function OrderConfirmationPage() {
  const router = useRouter();
  const [showAnimation, setShowAnimation] = useState(false);
  const orderId = 'ECH2024001234';

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Success Animation */}
        <div className={`text-center mb-6 transition-all duration-500 ${showAnimation ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600">Thank you for your order</p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600 mb-1">Order ID</p>
            <p className="text-xl font-bold text-brand-primary">{orderId}</p>
          </div>

          <div className="border-t border-b border-gray-200 py-4 mb-4 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Package className="w-5 h-5 text-brand-primary" />
              <div>
                <p className="font-medium">Order Confirmed</p>
                <p className="text-gray-500 text-xs">We've received your order</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Truck className="w-5 h-5 text-brand-primary" />
              <div>
                <p className="font-medium">FarEye Tracking Enabled</p>
                <p className="text-gray-500 text-xs">Real-time GPS updates available</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-5 h-5 text-brand-primary" />
              <div>
                <p className="font-medium">Estimated Delivery</p>
                <p className="text-gray-500 text-xs">28 Nov 2024</p>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
            <p className="text-sm font-semibold text-brand-primary mb-2">
              📱 Track Your Order Live
            </p>
            <p className="text-xs text-gray-700">
              You'll receive SMS and email updates at every stage. Track your shipment in real-time with GPS location updates.
            </p>
          </div>

          <div className="space-y-3">
            <Button 
              variant="primary" 
              className="w-full"
              onClick={() => router.push(`/track-order/${orderId}`)}
            >
              Track Order with FarEye
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => router.push('/')}
            >
              Continue Shopping
            </Button>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500">
          Order details have been sent to your email
        </p>
      </div>
    </div>
  );
}
