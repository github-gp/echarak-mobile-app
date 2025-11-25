'use client';

import { sampleOrders } from '@/data/sampleProducts';
import { formatCurrency, formatDate } from '@/lib/utils';
import { ArrowLeft, Package, Truck, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Badge from '@/components/common/Badge';

export default function OrdersPage() {
  const router = useRouter();

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'success' | 'warning' | 'primary'> = {
      delivered: 'success',
      in_transit: 'warning',
      pending: 'primary',
    };
    return variants[status] || 'secondary';
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      delivered: 'text-green-600',
      in_transit: 'text-orange-600',
      pending: 'text-blue-600',
    };
    return colors[status] || 'text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">My Orders</h1>
        </div>
      </div>

      {/* Orders List */}
      <div className="p-4 space-y-3">
        {sampleOrders.map((order) => (
          <div
            key={order.id}
            onClick={() => router.push(`/track-order/${order.id}`)}
            className="bg-white rounded-lg shadow-md p-4 active:scale-98 transition-transform cursor-pointer"
          >
            {/* Order Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-brand-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Order #{order.id}</p>
                  <p className="text-xs text-gray-500">{formatDate(order.date)}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>

            {/* Order Details */}
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm">
                <p className="text-gray-600">{order.items} items</p>
                <p className="font-bold text-brand-primary">{formatCurrency(order.total)}</p>
              </div>
              <Badge variant={getStatusBadge(order.status)}>
                {order.status.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>

            {/* FarEye Tracking Badge */}
            {order.trackingEnabled && (
              <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-lg px-3 py-2">
                <Truck className="w-4 h-4 text-brand-primary" />
                <span className="text-xs font-medium text-brand-primary">
                  FarEye Live Tracking Available
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State (if no orders) */}
      {sampleOrders.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64">
          <Package className="w-16 h-16 text-gray-300 mb-4" />
          <p className="text-gray-500 mb-2">No orders yet</p>
          <p className="text-sm text-gray-400">Your orders will appear here</p>
        </div>
      )}
    </div>
  );
}
