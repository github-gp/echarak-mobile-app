'use client';

import { use, useState } from 'react';
import { sampleTracking } from '@/data/sampleProducts';
import { formatDate } from '@/lib/utils';
import { ArrowLeft, MapPin, Phone, CheckCircle, Clock, Package, Truck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';

export default function TrackOrderPage({ params }: { params: Promise<{ orderId: string }> }) {
  const router = useRouter();
  const { orderId } = use(params);
  const [showMap, setShowMap] = useState(false);
  
  const tracking = sampleTracking;

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Track Order</h1>
            <p className="text-xs text-gray-500">Order #{orderId}</p>
          </div>
        </div>
      </div>

      {/* FarEye Branding Banner */}
      <div className="bg-gradient-to-r from-brand-primary to-orange-600 text-white p-4">
        <div className="flex items-center gap-3 mb-2">
          <Truck className="w-6 h-6" />
          <div>
            <p className="font-bold">Powered by FarEye</p>
            <p className="text-xs opacity-90">Real-Time Logistics Intelligence</p>
          </div>
        </div>
        <div className="bg-white bg-opacity-20 rounded-lg p-3 text-sm">
          <p className="font-medium mb-1">Live Tracking Active</p>
          <p className="text-xs opacity-90">GPS updates every 15 minutes • Last updated: 2 min ago</p>
        </div>
      </div>

      {/* Current Status Card */}
      <div className="mx-4 mt-4 bg-white rounded-lg shadow-md p-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-bold text-lg mb-1">In Transit</h3>
            <p className="text-sm text-gray-600">{tracking.currentLocation}</p>
          </div>
          <Badge variant="warning" className="text-xs">
            On Time
          </Badge>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-700 mb-3">
          <MapPin className="w-4 h-4 text-brand-primary" />
          <span>Current Location: Mumbai Distribution Hub</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-700 mb-4">
          <Clock className="w-4 h-4 text-brand-primary" />
          <span>Expected Delivery: {formatDate(tracking.estimatedDelivery)}</span>
        </div>

        <Button 
          variant="primary" 
          className="w-full"
          onClick={() => setShowMap(!showMap)}
        >
          <MapPin className="w-5 h-5 mr-2" />
          {showMap ? 'Hide Live Map' : 'View Live GPS Location'}
        </Button>
      </div>

      {/* Live Map View */}
      {showMap && (
        <div className="mx-4 mt-4 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-200 relative">
            {/* Map Placeholder with FarEye branding */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-brand-primary mx-auto mb-2 animate-bounce" />
                <p className="text-sm font-semibold text-gray-700">Live GPS Tracking</p>
                <p className="text-xs text-gray-500">Lat: {tracking.gpsLocation.lat}</p>
                <p className="text-xs text-gray-500">Long: {tracking.gpsLocation.lng}</p>
              </div>
            </div>
            {/* FarEye Logo Badge */}
            <div className="absolute top-3 left-3 bg-white rounded-lg shadow px-3 py-1.5">
              <p className="text-xs font-bold text-brand-primary">FarEye Live</p>
            </div>
          </div>
          <div className="p-4 bg-gray-50 border-t">
            <p className="text-xs text-gray-600">
              🛰️ Real-time GPS tracking powered by FarEye's intelligent logistics platform
            </p>
          </div>
        </div>
      )}

      {/* Carrier Information */}
      <div className="mx-4 mt-4 bg-white rounded-lg shadow-md p-4">
        <h3 className="font-semibold mb-3">Carrier Information</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Truck className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold">{tracking.carrier}</p>
              <p className="text-xs text-gray-500">Delivery Partner</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Phone className="w-4 h-4 mr-1" />
            Call
          </Button>
        </div>
      </div>

      {/* Delivery Timeline */}
      <div className="mx-4 mt-4 bg-white rounded-lg shadow-md p-4">
        <h3 className="font-semibold mb-4">Delivery Timeline</h3>
        <div className="space-y-4">
          {tracking.trackingSteps.map((step, index) => (
            <div key={index} className="flex gap-3">
              {/* Timeline Icon */}
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.completed 
                    ? 'bg-green-100' 
                    : 'bg-gray-100'
                }`}>
                  {step.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Clock className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                {index < tracking.trackingSteps.length - 1 && (
                  <div className={`w-0.5 h-12 ${
                    step.completed ? 'bg-green-300' : 'bg-gray-200'
                  }`} />
                )}
              </div>

              {/* Timeline Content */}
              <div className="flex-1 pb-4">
                <div className="flex items-center justify-between mb-1">
                  <p className={`font-semibold text-sm ${
                    step.current ? 'text-brand-primary' : step.completed ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {step.status}
                  </p>
                  {step.current && (
                    <Badge variant="warning" className="text-xs">Current</Badge>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  {formatDate(step.date)} {step.time && `• ${step.time}`}
                </p>
                {step.current && (
                  <p className="text-xs text-brand-primary mt-1">
                    📍 Live tracking active
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FarEye Features Info */}
      <div className="mx-4 mt-4 bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-4">
        <h3 className="font-semibold text-brand-primary mb-3">
          🚀 FarEye Tracking Features
        </h3>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <span>Real-time GPS location updates every 15 minutes</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <span>Automatic SMS & email notifications at each milestone</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <span>Dynamic delivery time predictions using AI</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <span>Direct communication with delivery partner</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <span>Proof of delivery with photo & signature</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mx-4 mt-4 space-y-3">
        <Button variant="outline" className="w-full">
          <Package className="w-5 h-5 mr-2" />
          View Order Details
        </Button>
        <Button variant="outline" className="w-full">
          Need Help?
        </Button>
      </div>
    </div>
  );
}
