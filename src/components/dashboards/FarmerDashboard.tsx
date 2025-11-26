'use client';

import { useRouter } from 'next/navigation';
import { TrendingUp, Package, FileText, Users, Wallet, MessageSquare, GraduationCap, Target } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const quickActions = [
  { icon: FileText, label: 'RFQ Marketplace', path: '/rfq/marketplace', color: 'from-emerald-500 to-green-700', badge: '5 New' },
  { icon: Package, label: 'My Products', path: '/seller-dashboard', color: 'from-blue-500 to-blue-700' },
  { icon: Target, label: 'My Bids', path: '/rfq/my-bids', color: 'from-purple-500 to-purple-700', badge: '2 Active' },
  { icon: MessageSquare, label: 'Messages', path: '/messages', color: 'from-pink-500 to-pink-700', badge: '3' },
];

const salesStats = [
  { label: 'This Month Revenue', value: '₹45,280', change: '+12%', trend: 'up' },
  { label: 'Total Orders', value: '23', change: '+5', trend: 'up' },
  { label: 'Avg. Order Value', value: '₹1,969', change: '+8%', trend: 'up' },
];

const recentRFQs = [
  { id: 'RFQ-2024-001', product: 'Ashwagandha Powder', quantity: '5000 kg', targetPrice: 420, expiresIn: '3 days' },
  { id: 'RFQ-2024-007', product: 'Brahmi Powder', quantity: '800 kg', targetPrice: 550, expiresIn: '4 days' },
];

const myProducts = [
  { name: 'Tulsi Leaves', stock: 340, price: 280, sales: 12 },
  { name: 'Turmeric Powder', stock: 580, price: 180, sales: 18 },
];

export default function FarmerDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-emerald-700 via-green-800 to-teal-900 text-white p-6 pb-8">
        <h1 className="text-2xl font-bold mb-2">Namaste Farmer! 🌾</h1>
        <p className="text-green-100 text-sm mb-4">Grow your business with direct market access</p>
        
        {/* Revenue Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-green-200">November 2024 Revenue</span>
            <TrendingUp className="w-5 h-5 text-green-300" />
          </div>
          <p className="text-3xl font-bold mb-1">₹45,280</p>
          <p className="text-sm text-green-200">↗️ +12% from last month</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 -mt-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4 border border-slate-200">
          <h2 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-emerald-700" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.path}
                onClick={() => router.push(action.path)}
                className={`relative bg-gradient-to-br ${action.color} text-white rounded-lg p-4 hover:shadow-lg transition-all active:scale-95`}
              >
                {action.badge && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full border-2 border-white">
                    {action.badge}
                  </span>
                )}
                <action.icon className="w-6 h-6 mb-2" />
                <p className="text-sm font-semibold">{action.label}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sales Stats */}
      <div className="px-4 mb-6">
        <h2 className="font-semibold text-slate-900 mb-3">Performance</h2>
        <div className="grid grid-cols-3 gap-3">
          {salesStats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-lg p-3 shadow-sm border border-slate-200 text-center">
              <p className="text-xs text-slate-600 mb-1">{stat.label}</p>
              <p className="text-lg font-bold text-slate-900 mb-1">{stat.value}</p>
              <p className="text-xs font-medium text-green-600">{stat.change}</p>
            </div>
          ))}
        </div>
      </div>

      {/* New RFQ Opportunities */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-slate-900">New RFQ Opportunities</h2>
          <button onClick={() => router.push('/rfq/marketplace')} className="text-sm text-emerald-700 font-medium">
            View All →
          </button>
        </div>
        <div className="space-y-2">
          {recentRFQs.map((rfq) => (
            <div
              key={rfq.id}
              onClick={() => router.push(`/rfq/bid/${rfq.id}`)}
              className="bg-white rounded-lg p-3 shadow-sm border border-slate-200 cursor-pointer hover:border-emerald-700 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-slate-900 text-sm">{rfq.product}</p>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full">
                  ⏱️ {rfq.expiresIn}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Qty: {rfq.quantity}</span>
                <span className="font-bold text-emerald-700">Target: {formatCurrency(rfq.targetPrice)}/kg</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* My Products */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-slate-900">My Products</h2>
          <button onClick={() => router.push('/seller-dashboard')} className="text-sm text-emerald-700 font-medium">
            Manage →
          </button>
        </div>
        <div className="space-y-2">
          {myProducts.map((product, idx) => (
            <div key={idx} className="bg-white rounded-lg p-3 shadow-sm border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🌿</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{product.name}</p>
                  <p className="text-xs text-slate-600">Stock: {product.stock} kg</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-emerald-700">{formatCurrency(product.price)}/kg</p>
                <p className="text-xs text-slate-600">{product.sales} sales</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Training Programs Banner */}
      <div className="px-4 mb-6">
        <div
          onClick={() => router.push('/farmer-programs')}
          className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-lg p-4 text-white cursor-pointer hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center gap-3">
            <GraduationCap className="w-8 h-8" />
            <div className="flex-1">
              <h3 className="font-bold mb-1">Free Training Programs! 🎓</h3>
              <p className="text-sm text-blue-100">Learn best practices & increase income</p>
            </div>
            <span className="text-2xl">→</span>
          </div>
        </div>
      </div>
    </div>
  );
}
