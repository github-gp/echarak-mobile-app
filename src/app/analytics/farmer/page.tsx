'use client';

import { ArrowLeft, TrendingUp, TrendingDown, Package, IndianRupee, Users, ShoppingCart, Star, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/lib/utils';
import Badge from '@/components/common/Badge';

const farmerStats = {
  totalRevenue: 1250000,
  revenueGrowth: 23,
  monthlyRevenue: 450000,
  totalOrders: 342,
  ordersGrowth: 18,
  activeListings: 15,
  avgRating: 4.8,
  totalReviews: 287,
};

const topProducts = [
  { name: 'Ashwagandha Powder', sales: 2400, revenue: 1080000, growth: 15, stock: 450 },
  { name: 'Turmeric Powder', sales: 3200, revenue: 896000, growth: 32, stock: 800 },
  { name: 'Tulsi Leaves', sales: 1800, revenue: 576000, growth: 8, stock: 320 },
  { name: 'Neem Leaves', sales: 950, revenue: 171000, growth: -5, stock: 180 },
];

const recentOrders = [
  { id: 'ORD-2341', buyer: 'AYUSH Products Pvt Ltd', product: 'Ashwagandha', amount: 22500, status: 'delivered', date: '2024-11-23' },
  { id: 'ORD-2340', buyer: 'Kerala Herbal Co.', product: 'Turmeric', amount: 28000, status: 'in_transit', date: '2024-11-22' },
  { id: 'ORD-2339', buyer: 'Delhi Traders', product: 'Tulsi Leaves', amount: 9600, status: 'processing', date: '2024-11-21' },
];

const monthlyData = [
  { month: 'Jun', revenue: 280000, orders: 82 },
  { month: 'Jul', revenue: 320000, orders: 95 },
  { month: 'Aug', revenue: 380000, orders: 108 },
  { month: 'Sep', revenue: 420000, orders: 118 },
  { month: 'Oct', revenue: 390000, orders: 112 },
  { month: 'Nov', revenue: 450000, orders: 142 },
];

export default function FarmerDashboardPage() {
  const router = useRouter();
  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Farmer/Seller Analytics</h1>
            <p className="text-xs text-gray-500">Green Valley Organic Farm</p>
          </div>
        </div>
      </div>

      {/* Revenue Banner */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-5 h-5" />
          <p className="text-sm opacity-90">November 2024</p>
        </div>
        <p className="text-sm opacity-90 mb-1">Monthly Revenue</p>
        <div className="flex items-baseline gap-3 mb-2">
          <h2 className="text-4xl font-bold">{formatCurrency(farmerStats.monthlyRevenue)}</h2>
          <Badge variant="success" className="bg-white text-green-700 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +{farmerStats.revenueGrowth}%
          </Badge>
        </div>
        <p className="text-xs opacity-75">vs last month</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-3 p-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600">Total Orders</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold">{farmerStats.totalOrders}</p>
                <Badge variant="success" className="text-xs">+{farmerStats.ordersGrowth}%</Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <IndianRupee className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600">Total Revenue</p>
              <p className="text-xl font-bold">{formatCurrency(farmerStats.totalRevenue)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600">Active Listings</p>
              <p className="text-2xl font-bold">{farmerStats.activeListings}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600">Avg Rating</p>
              <div className="flex items-baseline gap-1">
                <p className="text-2xl font-bold">{farmerStats.avgRating}</p>
                <p className="text-xs text-gray-500">({farmerStats.totalReviews})</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="mx-4 mb-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-brand-primary" />
            Revenue Trend (6 Months)
          </h3>
          <div className="space-y-3">
            {monthlyData.map((data, idx) => {
              const percentage = (data.revenue / maxRevenue) * 100;
              return (
                <div key={idx}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600 font-medium w-12">{data.month}</span>
                    <span className="font-bold text-brand-primary">{formatCurrency(data.revenue)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-brand-primary to-orange-500 h-2.5 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{data.orders} orders</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="mx-4 mb-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Package className="w-5 h-5 text-brand-primary" />
            Top Performing Products
          </h3>
          <div className="space-y-3">
            {topProducts.map((product, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{product.name}</h4>
                    <p className="text-xs text-gray-500">{product.sales} kg sold</p>
                  </div>
                  <Badge variant={product.growth > 0 ? 'success' : 'warning'}>
                    {product.growth > 0 ? '+' : ''}{product.growth}%
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-xs text-gray-600">Revenue</p>
                    <p className="font-bold text-brand-primary">{formatCurrency(product.revenue)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600">Stock</p>
                    <p className="font-semibold">{product.stock} kg</p>
                  </div>
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
          <div className="space-y-2">
            {recentOrders.map((order) => (
              <div key={order.id} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-500">#{order.id}</span>
                  <Badge
                    variant={
                      order.status === 'delivered' ? 'success' :
                      order.status === 'in_transit' ? 'warning' : 'primary'
                    }
                  >
                    {order.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
                <p className="font-semibold text-sm mb-1">{order.buyer}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">{order.product}</span>
                  <span className="font-bold text-brand-primary">{formatCurrency(order.amount)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FarEye Integration Info */}
      <div className="mx-4 bg-orange-50 border border-orange-200 rounded-lg p-4">
        <h3 className="font-semibold text-brand-primary mb-2">📦 FarEye Logistics Benefits</h3>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 flex-shrink-0" />
            <span>Automated shipping label generation saves 45 min per order</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 flex-shrink-0" />
            <span>Real-time pickup scheduling with 50+ courier partners</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 flex-shrink-0" />
            <span>Reduced customer queries by 60% with live tracking</span>
          </div>
        </div>
      </div>
    </div>
  );
}
