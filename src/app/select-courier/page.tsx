'use client';

import { useState } from 'react';
import { ArrowLeft, Truck, Clock, Star, CheckCircle, IndianRupee } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';
import { useCart } from '@/lib/cartContext';
import { formatCurrency } from '@/lib/utils';

// Simulated FarEye Serviceability API response
const courierPartners = [
  {
    id: 'delhivery',
    name: 'Delhivery',
    logo: '📦',
    rating: 4.5,
    reviews: 12400,
    estimatedDays: '3-4',
    cost: 450,
    serviceable: true,
    features: ['Real-time tracking', 'Insurance included', 'Cash on delivery'],
    reliability: 95,
  },
  {
    id: 'bluedart',
    name: 'Blue Dart Express',
    logo: '🚚',
    rating: 4.7,
    reviews: 18900,
    estimatedDays: '2-3',
    cost: 580,
    serviceable: true,
    features: ['Priority delivery', 'Real-time tracking', 'Fragile handling'],
    reliability: 98,
  },
  {
    id: 'dtdc',
    name: 'DTDC Courier',
    logo: '📮',
    rating: 4.3,
    reviews: 8500,
    estimatedDays: '4-5',
    cost: 380,
    serviceable: true,
    features: ['Economy shipping', 'Basic tracking'],
    reliability: 90,
  },
  {
    id: 'ecom',
    name: 'Ecom Express',
    logo: '🚛',
    rating: 4.4,
    reviews: 9200,
    estimatedDays: '3-5',
    cost: 420,
    serviceable: true,
    features: ['Real-time tracking', 'SMS updates'],
    reliability: 92,
  },
  {
    id: 'fedex',
    name: 'FedEx India',
    logo: '✈️',
    rating: 4.8,
    reviews: 15600,
    estimatedDays: '1-2',
    cost: 750,
    serviceable: false,
    features: ['Express delivery', 'International shipping', 'Premium service'],
    reliability: 99,
    reason: 'Not serviceable in delivery location',
  },
];

export default function SelectCourierPage() {
  const router = useRouter();
  const { cartTotal } = useCart();
  const [selectedCourier, setSelectedCourier] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedCourier) {
      const courier = courierPartners.find(c => c.id === selectedCourier);
      router.push(`/checkout?courier=${selectedCourier}&cost=${courier?.cost}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Select Courier Partner</h1>
            <p className="text-xs text-gray-500">Powered by FarEye Serviceability API</p>
          </div>
        </div>
      </div>

      {/* FarEye Banner */}
      <div className="bg-gradient-to-r from-brand-primary to-orange-600 text-slate-900 p-4 mb-4">
        <div className="flex items-center gap-3 mb-2">
          <Truck className="w-6 h-6" />
          <div>
            <p className="font-bold">Smart Courier Selection</p>
            <p className="text-xs opacity-90">Best rates and delivery times for your location</p>
          </div>
        </div>
        <div className="bg-white bg-opacity-20 rounded-lg p-3 text-sm">
          <p className="font-medium mb-1">📍 Delivering to: Bengaluru, Karnataka - 560001</p>
          <p className="text-xs opacity-90">Showing {courierPartners.filter(c => c.serviceable).length} serviceable partners</p>
        </div>
      </div>

      {/* Delivery Address Summary */}
      <div className="mx-4 mb-4 bg-white rounded-lg shadow-sm p-4">
        <h3 className="font-semibold mb-2 text-sm">Delivery Details</h3>
        <div className="text-xs text-gray-700 space-y-1">
          <p>Rajesh Kumar • +91 98765 43210</p>
          <p>Plot 45, Industrial Area, Sector 18</p>
          <p>Bengaluru, Karnataka - 560001</p>
        </div>
      </div>

      {/* Courier Partners List */}
      <div className="px-4 space-y-3">
        {courierPartners.map((courier) => (
          <div
            key={courier.id}
            onClick={() => courier.serviceable && setSelectedCourier(courier.id)}
            className={`bg-white rounded-lg shadow-sm overflow-hidden transition-all ${
              courier.serviceable ? 'cursor-pointer' : 'opacity-60'
            } ${
              selectedCourier === courier.id
                ? 'ring-2 ring-brand-primary'
                : 'hover:shadow-md'
            }`}
          >
            <div className="p-4">
              {/* Courier Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{courier.logo}</div>
                  <div>
                    <h3 className="font-semibold">{courier.name}</h3>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{courier.rating}</span>
                      </div>
                      <span className="text-gray-500">({courier.reviews.toLocaleString()})</span>
                    </div>
                  </div>
                </div>
                {selectedCourier === courier.id && (
                  <CheckCircle className="w-6 h-6 text-brand-primary fill-current" />
                )}
              </div>

              {/* Serviceable Status */}
              {!courier.serviceable ? (
                <div className="mb-3 bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-xs text-red-700 font-medium">❌ {courier.reason}</p>
                </div>
              ) : (
                <>
                  {/* Delivery Info */}
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <Clock className="w-4 h-4 text-brand-primary mx-auto mb-1" />
                      <p className="text-xs text-gray-600">Delivery</p>
                      <p className="text-sm font-semibold">{courier.estimatedDays} days</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <IndianRupee className="w-4 h-4 text-brand-primary mx-auto mb-1" />
                      <p className="text-xs text-gray-600">Shipping</p>
                      <p className="text-sm font-semibold">{formatCurrency(courier.cost)}</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-600 mx-auto mb-1" />
                      <p className="text-xs text-gray-600">Reliability</p>
                      <p className="text-sm font-semibold">{courier.reliability}%</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1">
                    {courier.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* FarEye Integration Badge */}
            {courier.serviceable && (
              <div className="bg-orange-50 border-t border-orange-100 px-4 py-2 flex items-center justify-between">
                <span className="text-xs text-gray-700">🛰️ FarEye Live Tracking</span>
                <Badge variant="primary" className="text-xs">Integrated</Badge>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Recommendation Banner */}
      <div className="mx-4 mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2 text-sm">💡 FarEye Recommendation</h3>
        <p className="text-xs text-gray-700">
          Based on your location and order value, <strong>Blue Dart Express</strong> offers the best balance of speed and reliability for this delivery.
        </p>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <Button
          variant="primary"
          className="w-full"
          onClick={handleContinue}
          disabled={!selectedCourier}
        >
          {selectedCourier
            ? `Continue with ${courierPartners.find(c => c.id === selectedCourier)?.name}`
            : 'Select a Courier Partner'}
        </Button>
        {selectedCourier && (
          <p className="text-xs text-center text-gray-500 mt-2">
            Total: {formatCurrency(cartTotal + (courierPartners.find(c => c.id === selectedCourier)?.cost || 0) + cartTotal * 0.18)}
          </p>
        )}
      </div>
    </div>
  );
}

