'use client';

import { ArrowLeft, TrendingUp, TrendingDown, BarChart3, IndianRupee, Activity } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Badge from '@/components/common/Badge';

const marketData = [
  { 
    product: 'Ashwagandha Root', 
    currentPrice: 450, 
    priceChange: '+12%', 
    demand: 'high',
    forecast: 'bullish',
    volume: '2,400 kg/day'
  },
  { 
    product: 'Tulsi Leaves', 
    currentPrice: 320, 
    priceChange: '-3%', 
    demand: 'medium',
    forecast: 'stable',
    volume: '1,800 kg/day'
  },
  { 
    product: 'Turmeric Powder', 
    currentPrice: 280, 
    priceChange: '+8%', 
    demand: 'high',
    forecast: 'bullish',
    volume: '3,500 kg/day'
  },
  { 
    product: 'Neem Leaves', 
    currentPrice: 180, 
    priceChange: '+5%', 
    demand: 'low',
    forecast: 'stable',
    volume: '900 kg/day'
  },
];

const trendingProducts = [
  { name: 'Giloy Stems', growth: '+45%', category: 'Immunity Boosters' },
  { name: 'Moringa Powder', growth: '+38%', category: 'Superfoods' },
  { name: 'Brahmi Leaves', growth: '+29%', category: 'Memory Enhancers' },
];

export default function MarketIntelligencePage() {
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
            <h1 className="text-lg font-semibold">Market Intelligence</h1>
            <p className="text-xs text-gray-500">AI-Powered Price Analytics</p>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
        <div className="flex items-center gap-3 mb-3">
          <Activity className="w-8 h-8" />
          <div>
            <p className="font-bold text-lg">Live Market Data</p>
            <p className="text-sm opacity-90">Real-time pricing & demand analytics</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold">₹345M</p>
            <p className="text-xs opacity-90">Daily GMV</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold">12.5K</p>
            <p className="text-xs opacity-90">Active Traders</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold">+18%</p>
            <p className="text-xs opacity-90">Market Growth</p>
          </div>
        </div>
      </div>

      {/* Trending Products */}
      <div className="mx-4 mt-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Trending This Week
          </h3>
          <div className="space-y-3">
            {trendingProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between pb-3 border-b last:border-0">
                <div>
                  <p className="font-semibold text-sm">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.category}</p>
                </div>
                <Badge variant="success" className="text-sm font-bold">
                  {product.growth}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Prices */}
      <div className="mx-4 mt-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-brand-primary" />
            Current Market Prices
          </h3>
          <div className="space-y-3">
            {marketData.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3">
                {/* Product Header */}
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">{item.product}</h4>
                  <Badge 
                    variant={item.demand === 'high' ? 'success' : item.demand === 'medium' ? 'warning' : 'secondary'}
                  >
                    {item.demand.toUpperCase()} DEMAND
                  </Badge>
                </div>

                {/* Price Info */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-brand-primary">₹{item.currentPrice}</span>
                    <span className="text-xs text-gray-500">/kg</span>
                  </div>
                  <div className={`flex items-center gap-1 font-semibold ${
                    item.priceChange.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.priceChange.startsWith('+') ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span className="text-sm">{item.priceChange}</span>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="flex items-center justify-between text-xs text-gray-600 pt-2 border-t">
                  <span>Volume: {item.volume}</span>
                  <span className={`font-medium ${
                    item.forecast === 'bullish' ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    Forecast: {item.forecast.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Insights */}
      <div className="mx-4 mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-3">📊 Market Insights</h3>
        <div className="space-y-2 text-sm text-gray-700">
          <p>• <strong>Immunity boosters</strong> showing 45% demand spike due to seasonal changes</p>
          <p>• <strong>Export quality turmeric</strong> prices up 12% following international orders</p>
          <p>• <strong>Organic certifications</strong> commanding 25-30% premium pricing</p>
          <p>• <strong>Direct farm sourcing</strong> offering 15% better margins than intermediaries</p>
        </div>
      </div>

      {/* AI Powered Badge */}
      <div className="mx-4 mt-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-sm">AI-Powered Analytics</p>
            <p className="text-xs text-gray-600">Machine learning price predictions</p>
          </div>
        </div>
        <p className="text-xs text-gray-700">
          Market data updated every 15 minutes using advanced algorithms analyzing supply-demand patterns, weather forecasts, and export-import trends.
        </p>
      </div>
    </div>
  );
}
