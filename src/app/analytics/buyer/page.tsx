'use client';

import { ArrowLeft, TrendingDown, ShoppingBag, Users, Star, Package, IndianRupee } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/lib/utils';
import Badge from '@/components/common/Badge';

const buyerStats = {
  totalSpent: 3250000,
  monthlySpent: 890000,
  spentGrowth: -12, // Savings
  totalOrders: 156,
  activeSupppliers: 28,
  avgDeliveryTime: 3.2,
  savingsThisMonth: 110000,
};

const topSuppliers = [
  { name: 'Green Valley Organic Farm', orders: 45, spent: 1125000, rating: 4.8, onTime: 96 },
  { name: 'Himalayan Herbs Co.', orders: 32, spent: 768000, rating: 4.6, onTime: 94 },
  { name: 'Kerala Spice Traders', orders: 28, spent: 672000, rating: 4.9, onTime: 98 },
  { name: 'Rajasthan Herbals', orders: 18, spent: 432000, rating: 4.5, onTime: 91 },
];

const categorySpending = [
  { category: 'Roots & Rhizomes', amount: 1200000, percentage: 37 },
  { category: 'Leaves & Herbs', amount: 980000, percentage: 30 },
  { category: 'Seeds & Powders', amount: 720000, percentage: 22 },
  { category: 'Others', amount: 350000, percentage: 11 },
];

const recentPurchases = [
  { id: 'PO-8821', product: 'Ashwagandha Powder', supplier: 'Green Valley', qty: '250 kg', amount: 112500, date: '2024-11-23', tracked: true },
  { id: 'PO-8820', product: 'Turmeric Powder', supplier: 'Kerala Spice', qty: '400 kg', amount: 112000, date: '2024-11-22', tracked: true },
  { id: 'PO-8819', product: 'Tulsi Leaves', supplier: 'Himalayan Herbs', qty: '150 kg', amount: 48000, date: '2024-11-21', tracked: true },
];

export default function BuyerDashboardPage() {
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
            <h1 className="text-lg font-semibold">Buyer/Trader Analytics</h1>
            <p className="text-xs text-gray-500">AYUSH Products Pvt Ltd</p>
          </div>
        </div>
      </div>

      {/* Spending Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
        <p className="text-sm opacity-90 mb-1">Monthly Procurement</p>
        <div className="flex items-baseline gap-3 mb-2">
          <h2 className="text-4xl font-bold">{formatCurrency(buyerStats.monthlySpent)}</h2>
          <Badge variant="success" className="bg-white text-green-700 flex items-center gap-1">
            <TrendingDown className="w-3 h-3" />
            {Math.abs(buyerStats.spentGrowth)}% saved
          </Badge>
        </div>
        <p className="text-xs opacity-75">Optimized procurement saves {formatCurrency(buyerStats.savingsThisMonth)} this month</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-3 p-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold">{buyerStats.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600">Suppliers</p>
              <p className="text-2xl font-bold">{buyerStats.activeSupppliers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <IndianRupee className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600">Total Spent</p>
              <p className="text-lg font-bold">{formatCurrency(buyerStats.totalSpent)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600">Avg Delivery</p>
              <p className="text-2xl font-bold">{buyerStats.avgDeliveryTime}</p>
              <p className="text-xs text-gray-500">days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Spending */}
      <div className="mx-4 mb-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold mb-4">Spending by Category</h3>
          <div className="space-y-3">
            {categorySpending.map((cat, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-700 font-medium">{cat.category}</span>
                  <span className="font-bold text-brand-primary">{formatCurrency(cat.amount)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full"
                      style={{ width: `${cat.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 w-10 text-right">{cat.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Suppliers */}
      <div className="mx-4 mb-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Users className="w-5 h-5 text-brand-primary" />
            Top Suppliers
          </h3>
          <div className="space-y-3">
            {topSuppliers.map((supplier, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{supplier.name}</h4>
                    <div className="flex items-center gap-3 text-xs text-gray-600 mt-1">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {supplier.rating}
                      </span>
                      <span>•</span>
                      <span>{supplier.orders} orders</span>
                    </div>
                  </div>
                  <Badge variant="success">{supplier.onTime}% on-time</Badge>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-xs text-gray-600">Total Spent</span>
                  <span className="font-bold text-brand-primary">{formatCurrency(supplier.spent)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Purchases */}
      <div className="mx-4 mb-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold mb-3">Recent Purchases</h3>
          <div className="space-y-2">
            {recentPurchases.map((purchase) => (
              <div key={purchase.id} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-500">#{purchase.id}</span>
                  {purchase.tracked && (
                    <Badge variant="primary" className="text-xs">🛰️ FarEye Tracked</Badge>
                  )}
                </div>
                <p className="font-semibold text-sm mb-1">{purchase.product}</p>
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>{purchase.supplier}</span>
                  <span>{purchase.qty}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-xs text-gray-500">{purchase.date}</span>
                  <span className="font-bold text-brand-primary">{formatCurrency(purchase.amount)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FarEye Benefits for Buyers */}
      <div className="mx-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">🚀 FarEye Procurement Advantages</h3>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
            <span>Real-time tracking reduces "where's my order" calls by 70%</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
            <span>Accurate ETA predictions improve production planning</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
            <span>Automated tracking updates save 2-3 hours per day</span>
          </div>
        </div>
      </div>
    </div>
  );
}
