'use client';

import { useRouter } from 'next/navigation';
import { BarChart3, Users, TrendingUp, Shield, MapPin, FileCheck, AlertCircle, Globe } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const quickActions = [
  { icon: BarChart3, label: 'Analytics Dashboard', path: '/analytics/government', color: 'from-purple-500 to-purple-700' },
  { icon: FileCheck, label: 'Quality Verification', path: '/quality-verification', color: 'from-blue-500 to-blue-700' },
  { icon: TrendingUp, label: 'Market Intelligence', path: '/market-intelligence', color: 'from-green-500 to-green-700' },
  { icon: Globe, label: 'Export Data', path: '/export-support', color: 'from-orange-500 to-red-700' },
];

const keyMetrics = [
  { label: 'Total GMV', value: '₹12.4 Cr', change: '+18%', icon: TrendingUp },
  { label: 'Active Farmers', value: '3,245', change: '+12%', icon: Users },
  { label: 'Verified Sellers', value: '890', change: '+8%', icon: Shield },
  { label: 'Export Value', value: '₹2.8 Cr', change: '+22%', icon: Globe },
];

const stateData = [
  { state: 'Karnataka', gmv: '3.2 Cr', farmers: 845, trend: 'up' },
  { state: 'Tamil Nadu', gmv: '2.8 Cr', farmers: 720, trend: 'up' },
  { state: 'Maharashtra', gmv: '2.4 Cr', farmers: 650, trend: 'up' },
  { state: 'Uttar Pradesh', gmv: '2.1 Cr', farmers: 580, trend: 'stable' },
];

const alerts = [
  { type: 'warning', message: 'Price volatility detected in Turmeric market', time: '2 hours ago' },
  { type: 'info', message: '45 new farmers onboarded this week', time: '1 day ago' },
];

export default function GovernmentDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 text-white p-6 pb-8">
        <h1 className="text-2xl font-bold mb-2">NMPB Dashboard 🏛️</h1>
        <p className="text-purple-100 text-sm mb-4">National Medicinal Plants Board - Market Overview</p>
        
        {/* Key Metric Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-200 mb-1">November 2024 GMV</p>
              <p className="text-3xl font-bold">₹12.4 Crores</p>
              <p className="text-sm text-green-300 mt-1">↗️ +18% growth</p>
            </div>
            <BarChart3 className="w-12 h-12 text-purple-300" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 -mt-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4 border border-slate-200">
          <h2 className="font-semibold text-slate-900 mb-3">Quick Access</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.path}
                onClick={() => router.push(action.path)}
                className={`bg-gradient-to-br ${action.color} text-white rounded-lg p-4 hover:shadow-lg transition-all active:scale-95`}
              >
                <action.icon className="w-6 h-6 mb-2" />
                <p className="text-sm font-semibold">{action.label}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="px-4 mb-6">
        <h2 className="font-semibold text-slate-900 mb-3">Key Metrics</h2>
        <div className="grid grid-cols-2 gap-3">
          {keyMetrics.map((metric, idx) => (
            <div key={idx} className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
              <metric.icon className="w-5 h-5 text-purple-700 mb-2" />
              <p className="text-xs text-slate-600 mb-1">{metric.label}</p>
              <p className="text-xl font-bold text-slate-900 mb-1">{metric.value}</p>
              <p className="text-xs font-medium text-green-600">{metric.change}</p>
            </div>
          ))}
        </div>
      </div>

      {/* State-wise Performance */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-slate-900">State-wise Performance</h2>
          <button onClick={() => router.push('/analytics/government')} className="text-sm text-purple-700 font-medium">
            View All →
          </button>
        </div>
        <div className="space-y-2">
          {stateData.map((state, idx) => (
            <div key={idx} className="bg-white rounded-lg p-3 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-700" />
                  <p className="font-semibold text-slate-900">{state.state}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  state.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {state.trend === 'up' ? '↗️ Growing' : '→ Stable'}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">GMV: ₹{state.gmv}</span>
                <span className="text-slate-600">Farmers: {state.farmers.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts & Notifications */}
      <div className="px-4 mb-6">
        <h2 className="font-semibold text-slate-900 mb-3">Alerts & Notifications</h2>
        <div className="space-y-2">
          {alerts.map((alert, idx) => (
            <div key={idx} className={`rounded-lg p-3 border ${
              alert.type === 'warning' 
                ? 'bg-amber-50 border-amber-200' 
                : 'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-start gap-3">
                <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                  alert.type === 'warning' ? 'text-amber-700' : 'text-blue-700'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-slate-800 mb-1">{alert.message}</p>
                  <p className="text-xs text-slate-600">{alert.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Intelligence Banner */}
      <div className="px-4 mb-6">
        <div
          onClick={() => router.push('/market-intelligence')}
          className="bg-gradient-to-r from-emerald-700 to-teal-800 rounded-lg p-4 text-white cursor-pointer hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8" />
            <div className="flex-1">
              <h3 className="font-bold mb-1">Market Intelligence Report 📊</h3>
              <p className="text-sm text-emerald-100">Real-time insights & price trends</p>
            </div>
            <span className="text-2xl">→</span>
          </div>
        </div>
      </div>
    </div>
  );
}
