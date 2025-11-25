'use client';

import { ArrowLeft, Users, ShoppingBag, Building2, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

const dashboardRoles = [
  {
    id: 'farmer',
    title: 'Farmer/Seller Dashboard',
    description: 'Track your sales, inventory, and earnings',
    icon: '🌾',
    color: 'from-green-500 to-emerald-600',
    stats: ['Revenue Analytics', 'Product Performance', 'Order Management'],
    route: '/analytics/farmer',
  },
  {
    id: 'buyer',
    title: 'Buyer/Trader Dashboard',
    description: 'Monitor procurement, spending, and suppliers',
    icon: '🏪',
    color: 'from-blue-500 to-indigo-600',
    stats: ['Purchase Analytics', 'Supplier Ratings', 'Cost Analysis'],
    route: '/analytics/buyer',
  },
  {
    id: 'government',
    title: 'NMPB/Government Dashboard',
    description: 'Market oversight, compliance, and policy insights',
    icon: '🏛️',
    color: 'from-purple-500 to-pink-600',
    stats: ['Market Overview', 'Quality Compliance', 'Trade Volume'],
    route: '/analytics/government',
  },
];

export default function AnalyticsSelectorPage() {
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
            <h1 className="text-lg font-semibold">Analytics Dashboard</h1>
            <p className="text-xs text-gray-500">Select your role to view insights</p>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-brand-primary to-orange-600 text-white p-6">
        <div className="flex items-center gap-3 mb-3">
          <TrendingUp className="w-8 h-8" />
          <div>
            <p className="font-bold text-lg">Comprehensive Analytics</p>
            <p className="text-sm opacity-90">Data-driven insights for all stakeholders</p>
          </div>
        </div>
        <div className="bg-white bg-opacity-20 rounded-lg p-3 text-sm">
          <p className="font-medium mb-1">📊 Real-time Data Processing</p>
          <p className="text-xs opacity-90">Updated every 15 minutes • AI-powered forecasting included</p>
        </div>
      </div>

      {/* Role Selection Cards */}
      <div className="p-4 space-y-4">
        {dashboardRoles.map((role) => (
          <div
            key={role.id}
            onClick={() => router.push(role.route)}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer active:scale-98 transition-transform"
          >
            {/* Gradient Header */}
            <div className={`bg-gradient-to-r ${role.color} p-6 text-white`}>
              <div className="flex items-center gap-4 mb-3">
                <div className="text-5xl">{role.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{role.title}</h3>
                  <p className="text-sm opacity-90">{role.description}</p>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="p-4">
              <p className="text-xs text-gray-500 mb-2 font-medium">KEY INSIGHTS INCLUDED:</p>
              <div className="space-y-2">
                {role.stats.map((stat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                    <span className="text-gray-700">{stat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Footer */}
            <div className="px-4 pb-4">
              <button className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-sm transition-colors">
                View Dashboard →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Info Card */}
      <div className="mx-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2 text-sm">🔐 Role-Based Access</h3>
        <p className="text-xs text-gray-700">
          Each dashboard is tailored to specific user needs with relevant metrics, charts, and actionable insights. Data is secured with role-based permissions.
        </p>
      </div>
    </div>
  );
}
