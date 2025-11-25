'use client';

import { ArrowLeft, TrendingUp, Building2, Shield, Users, Package, IndianRupee, AlertCircle, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/lib/utils';
import Badge from '@/components/common/Badge';

const govStats = {
  totalGMV: 45000000,
  gmvGrowth: 32,
  monthlyGMV: 12500000,
  registeredSellers: 2840,
  registeredBuyers: 4620,
  totalTransactions: 8450,
  complianceRate: 94,
  certifiedProducts: 3240,
};

const statePerformance = [
  { state: 'Karnataka', gmv: 8500000, sellers: 520, buyers: 840, growth: 28 },
  { state: 'Kerala', gmv: 7200000, sellers: 480, buyers: 720, growth: 35 },
  { state: 'Rajasthan', gmv: 6800000, sellers: 450, buyers: 680, growth: 22 },
  { state: 'Uttarakhand', gmv: 5400000, sellers: 380, buyers: 590, growth: 18 },
  { state: 'Maharashtra', gmv: 4900000, sellers: 320, buyers: 520, growth: 25 },
];

const topProducts = [
  { name: 'Ashwagandha', volume: 12500, value: 5625000, trend: 'up' },
  { name: 'Turmeric', volume: 18200, value: 5096000, trend: 'up' },
  { name: 'Tulsi', volume: 9800, value: 3136000, trend: 'stable' },
  { name: 'Neem', volume: 7400, value: 1332000, trend: 'down' },
];

const complianceAlerts = [
  { seller: 'ABC Traders', issue: 'Pending quality certification renewal', severity: 'medium', date: '2024-11-20' },
  { seller: 'XYZ Herbs', issue: 'Delayed shipment tracking updates', severity: 'low', date: '2024-11-22' },
];

export default function GovernmentDashboardPage() {
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
            <h1 className="text-lg font-semibold">NMPB/Government Dashboard</h1>
            <p className="text-xs text-gray-500">National Medicinal Plants Board</p>
          </div>
        </div>
      </div>

      {/* GMV Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
        <p className="text-sm opacity-90 mb-1">Platform GMV (Nov 2024)</p>
        <div className="flex items-baseline gap-3 mb-2">
          <h2 className="text-4xl font-bold">{formatCurrency(govStats.monthlyGMV)}</h2>
          <Badge variant="success" className="bg-white text-green-700 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +{govStats.gmvGrowth}%
          </Badge>
        </div>
        <p className="text-xs opacity-75">Year-to-date GMV: {formatCurrency(govStats.totalGMV)}</p>
      </div>

      {/* Platform Stats Grid */}
      <div className="grid grid-cols-2 gap-3 p-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600">Sellers</p>
              <p className="text-2xl font-bold">{govStats.registeredSellers.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600">Buyers</p>
              <p className="text-2xl font-bold">{govStats.registeredBuyers.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600">Transactions</p>
              <p className="text-2xl font-bold">{govStats.totalTransactions.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600">Compliance</p>
              <p className="text-2xl font-bold">{govStats.complianceRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* State-wise Performance */}
      <div className="mx-4 mb-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-brand-primary" />
            State-wise Performance
          </h3>
          <div className="space-y-3">
            {statePerformance.map((state, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">{state.state}</h4>
                  <Badge variant="success">+{state.growth}%</Badge>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <p className="text-gray-600">GMV</p>
                    <p className="font-bold text-brand-primary">{formatCurrency(state.gmv)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Sellers</p>
                    <p className="font-semibold">{state.sellers}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Buyers</p>
                    <p className="font-semibold">{state.buyers}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products by Volume */}
      <div className="mx-4 mb-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold mb-3">Top Products by Trade Volume</h3>
          <div className="space-y-3">
            {topProducts.map((product, idx) => (
              <div key={idx} className="flex items-center justify-between pb-3 border-b last:border-0">
                <div className="flex-1">
                  <p className="font-semibold text-sm">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.volume.toLocaleString()} kg traded</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-brand-primary text-sm">{formatCurrency(product.value)}</p>
                  <p className="text-xs">
                    {product.trend === 'up' && '📈 Growing'}
                    {product.trend === 'stable' && '➡️ Stable'}
                    {product.trend === 'down' && '📉 Declining'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quality & Compliance */}
      <div className="mx-4 mb-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            Quality & Compliance
          </h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-green-700">{govStats.certifiedProducts}</p>
              <p className="text-xs text-gray-600 mt-1">Certified Products</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-blue-700">{govStats.complianceRate}%</p>
              <p className="text-xs text-gray-600 mt-1">Compliance Rate</p>
            </div>
          </div>

          {/* Compliance Alerts */}
          {complianceAlerts.length > 0 && (
            <div className="pt-3 border-t">
              <p className="text-xs font-semibold text-gray-700 mb-2">Recent Alerts</p>
              {complianceAlerts.map((alert, idx) => (
                <div key={idx} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-2">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{alert.seller}</p>
                      <p className="text-xs text-gray-600 mt-1">{alert.issue}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.date}</p>
                    </div>
                    <Badge variant={alert.severity === 'high' ? 'warning' : 'secondary'} className="text-xs">
                      {alert.severity}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* FarEye Integration Stats */}
      <div className="mx-4 bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-4">
        <h3 className="font-semibold text-brand-primary mb-3 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          FarEye Logistics Integration Impact
        </h3>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-center justify-between">
            <span>Shipments tracked in real-time</span>
            <span className="font-bold">8,450</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Avg delivery time improvement</span>
            <span className="font-bold text-green-700">-28%</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Courier partners integrated</span>
            <span className="font-bold">52</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Customer satisfaction score</span>
            <span className="font-bold">94/100</span>
          </div>
        </div>
      </div>

      {/* Policy Insights */}
      <div className="mx-4 mt-4 bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h3 className="font-semibold text-purple-900 mb-2 text-sm">📋 Policy Insights</h3>
        <ul className="text-xs text-gray-700 space-y-1.5">
          <li>• Organic certified products command 25-30% price premium</li>
          <li>• Karnataka leads in both seller registrations and GMV</li>
          <li>• Platform facilitating ₹450Cr+ annual trade in medicinal plants</li>
          <li>• 94% compliance rate exceeds national average of 87%</li>
        </ul>
      </div>
    </div>
  );
}
