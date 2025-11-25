'use client';

import { ArrowLeft, TrendingUp, Package, IndianRupee, ShoppingCart, Eye, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Badge from '@/components/common/Badge';
import { formatCurrency } from '@/lib/utils';

const sellerStats = {
  totalRevenue: 450000,
  activeListings: 12,
  totalOrders: 156,
  avgRating: 4.8,
  revenueGrowth: '+23%',
  pendingOrders: 8,
};

const recentOrders = [
  { id: 'ORD-1234', product: 'Ashwagandha Powder', quantity: '50 kg', amount: 22500, status: 'processing' },
  { id: 'ORD-1235', product: 'Tulsi Leaves', quantity: '30 kg', amount: 9600, status: 'shipped' },
  { id: 'ORD-1236', product: 'Turmeric Powder', quantity: '100 kg', amount: 28000, status: 'delivered' },
];

const topProducts = [
  { name: 'Ashwagandha Powder', sales: 1250, revenue: 562500, growth: '+15%' },
  { name: 'Tulsi Leaves', sales: 890, revenue: 284800, growth: '+8%' },
  { name: 'Turmeric Powder', sales: 2100, revenue: 588000, growth: '+32%' },
];

export default function SellerDashboardPage() {
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
            <h1 className="text-lg font-semibold">Seller Dashboard</h1>
            <p className="text-xs text-gray-500">Green Valley Organic Farm</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="bg-gradient-to-r from-brand-primary to-orange-600 text-white p-4 mb-4">
        <p className="text-sm opacity-90 mb-2">Total Revenue (This Month)</p>
        <div className="flex items-baseline gap-2 mb-1">
          <h2 className="text-3xl font-bold">{formatCurrency(sellerStats.totalRevenue)}</h2>
          <Badge variant="success" className="bg-white text-green-700">
            {sellerStats.revenueGrowth}
          </Badge>
        </div>
        <p className="text-xs opacity-75">vs last month</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-3 px-4 mb-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-5 h-5 text-brand-primary" />
            <span className="text-xs text-gray-600">Active Listings</span>
          </div>
          <p className="text-2xl font-bold">{sellerStats.activeListings}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingCart className="w-5 h-5 text-green-600" />
            <span className="text-xs text-gray-600">Total Orders</span>
          </div>
          <p className="text-2xl font-bold">{sellerStats.totalOrders}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-xs text-gray-600">Avg Rating</span>
          </div>
          <p className="text-2xl font-bold">{sellerStats.avgRating}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-5 h-5 text-orange-600" />
            <span className="text-xs text-gray-600">Pending</span>
          </div>
          <p className="text-2xl font-bold">{sellerStats.pendingOrders}</p>
        </div>
      </div>

      {/* Top Products */}
      <div className="mx-4 mb-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-brand-primary" />
            Top Performing Products
          </h3>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between pb-3 border-b last:border-0">
                <div className="flex-1">
                  <p className="font-semibold text-sm">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.sales} kg sold</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-brand-primary text-sm">{formatCurrency(product.revenue)}</p>
                  <Badge variant="success" className="text-xs">{product.growth}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mx-4 mb-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Recent Orders</h3>
            <button className="text-sm text-brand-primary font-medium">View All</button>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-500">#{order.id}</span>
                  <Badge 
                    variant={
                      order.status === 'delivered' ? 'success' : 
                      order.status === 'shipped' ? 'warning' : 'primary'
                    }
                  >
                    {order.status.toUpperCase()}
                  </Badge>
                </div>
                <p className="font-semibold text-sm mb-1">{order.product}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">{order.quantity}</span>
                  <span className="font-bold text-brand-primary">{formatCurrency(order.amount)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FarEye Integration Info */}
      <div className="mx-4 bg-orange-50 border border-orange-200 rounded-lg p-4">
        <h3 className="font-semibold text-brand-primary mb-2">FarEye Seller Benefits</h3>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 flex-shrink-0" />
            <span>Automated shipping label generation</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 flex-shrink-0" />
            <span>Real-time pickup scheduling with courier partners</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 flex-shrink-0" />
            <span>Shipment tracking shared with buyers automatically</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 flex-shrink-0" />
            <span>Analytics on delivery performance and customer satisfaction</span>
          </div>
        </div>
      </div>
    </div>
  );
}
