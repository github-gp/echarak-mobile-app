'use client';

import { ArrowLeft, MapPin, Package, TrendingUp, Users, Truck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Badge from '@/components/common/Badge';

const warehouses = [
  {
    id: 'hub-001',
    name: 'Mumbai Central Hub',
    location: 'Andheri East, Mumbai',
    active: true,
    capacity: '10,000 units',
    currentStock: '7,500 units',
    utilization: 75,
    activeShipments: 45,
    coordinates: { lat: 19.1196, lng: 72.8479 },
  },
  {
    id: 'hub-002',
    name: 'Delhi Distribution Center',
    location: 'Rohini, Delhi',
    active: true,
    capacity: '8,000 units',
    currentStock: '5,200 units',
    utilization: 65,
    activeShipments: 32,
    coordinates: { lat: 28.7041, lng: 77.1025 },
  },
  {
    id: 'hub-003',
    name: 'Bangalore Warehouse',
    location: 'Whitefield, Bangalore',
    active: true,
    capacity: '12,000 units',
    currentStock: '9,800 units',
    utilization: 82,
    activeShipments: 58,
    coordinates: { lat: 12.9716, lng: 77.5946 },
  },
];

export default function WarehousePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Warehouse Network</h1>
            <p className="text-xs text-gray-500">Powered by FarEye Hub Management</p>
          </div>
        </div>
      </div>

      {/* FarEye Banner */}
      <div className="bg-gradient-to-r from-brand-primary to-orange-600 text-white p-4 mb-4">
        <div className="flex items-center gap-3 mb-3">
          <Truck className="w-6 h-6" />
          <div>
            <p className="font-bold">FarEye Hub Management</p>
            <p className="text-xs opacity-90">Real-time warehouse monitoring & optimization</p>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white bg-opacity-20 rounded-lg p-2 text-center">
            <p className="text-2xl font-bold">{warehouses.length}</p>
            <p className="text-xs opacity-90">Active Hubs</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-2 text-center">
            <p className="text-2xl font-bold">
              {warehouses.reduce((sum, w) => sum + w.activeShipments, 0)}
            </p>
            <p className="text-xs opacity-90">Shipments</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-2 text-center">
            <p className="text-2xl font-bold">74%</p>
            <p className="text-xs opacity-90">Avg Util.</p>
          </div>
        </div>
      </div>

      {/* Warehouse Cards */}
      <div className="px-4 space-y-4">
        {warehouses.map((warehouse) => (
          <div key={warehouse.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Map Preview */}
            <div className="h-32 bg-gradient-to-br from-blue-100 to-blue-200 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <MapPin className="w-12 h-12 text-brand-primary animate-pulse" />
              </div>
              <div className="absolute top-2 right-2">
                <Badge variant="success">Active</Badge>
              </div>
              <div className="absolute bottom-2 left-2 bg-white rounded px-2 py-1 text-xs font-mono">
                {warehouse.coordinates.lat}, {warehouse.coordinates.lng}
              </div>
            </div>

            {/* Warehouse Info */}
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{warehouse.name}</h3>
              <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                <MapPin className="w-4 h-4" />
                <span>{warehouse.location}</span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Package className="w-4 h-4 text-brand-primary" />
                    <span className="text-xs text-gray-600">Capacity</span>
                  </div>
                  <p className="font-bold">{warehouse.capacity}</p>
                  <p className="text-xs text-gray-500">Current: {warehouse.currentStock}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-gray-600">Utilization</span>
                  </div>
                  <p className="font-bold">{warehouse.utilization}%</p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                    <div 
                      className="bg-green-600 h-1.5 rounded-full"
                      style={{ width: `${warehouse.utilization}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Active Shipments */}
              <div className="flex items-center justify-between bg-orange-50 border border-orange-200 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-brand-primary" />
                  <span className="text-sm font-medium">Active Shipments</span>
                </div>
                <Badge variant="warning">{warehouse.activeShipments}</Badge>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FarEye Features */}
      <div className="mx-4 mt-4 bg-white rounded-lg shadow-md p-4">
        <h3 className="font-semibold mb-3">FarEye Hub Management Features</h3>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5" />
            <span>Real-time inventory tracking across all hubs</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5" />
            <span>Automated routing and load optimization</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5" />
            <span>Integration with 50+ courier partners</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5" />
            <span>AI-powered demand forecasting</span>
          </div>
        </div>
      </div>
    </div>
  );
}
